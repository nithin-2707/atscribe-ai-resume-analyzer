const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Chat = require('../models/Chat');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 200 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  }
});

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Retry helper function with exponential backoff
async function retryWithBackoff(fn, maxRetries = 3, initialDelay = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (error.message?.includes('429') || error.message?.includes('Too Many Requests') || error.message?.includes('Resource exhausted')) {
        if (i === maxRetries - 1) throw error;
        const delay = initialDelay * Math.pow(2, i);
        console.log(`Rate limit hit, retrying in ${delay}ms... (Attempt ${i + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
}

// Extract text from PDF
async function extractTextFromPDF(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text.trim();
  } catch (error) {
    throw new Error('Failed to extract text from PDF');
  }
}

// POST /api/chat/init - Initialize chat with resume
router.post('/init', upload.single('resume'), async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    // Extract text from PDF
    const resumeText = await extractTextFromPDF(req.file.buffer);

    if (!resumeText) {
      return res.status(400).json({ error: 'Could not extract text from resume' });
    }

    // Create or update chat session
    const chat = await Chat.findOneAndUpdate(
      { sessionId: sessionId || `chat_${Date.now()}` },
      { 
        resumeText,
        messages: [],
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      sessionId: chat.sessionId,
      message: 'Chat initialized successfully',
    });
  } catch (error) {
    console.error('Chat Init Error:', error);
    res.status(500).json({ error: error.message || 'Failed to initialize chat' });
  }
});

// POST /api/chat/message - Send message
router.post('/message', async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({ error: 'Session ID and message are required' });
    }

    // Find chat session
    const chat = await Chat.findOne({ sessionId });

    if (!chat) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    // Add user message
    chat.messages.push({
      role: 'user',
      content: message,
    });

    // Generate response with Gemini
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Build conversation history
    const chatHistory = chat.messages
      .slice(-10) // Last 10 messages for context
      .map(msg => `${msg.role === 'user' ? 'Q' : 'A'}: ${msg.content}`)
      .join('\n');

    const prompt = `
You are an AI assistant that gives **detailed, step-by-step, professional answers** 
based only on the given resume.

Resume:
""" 
${chat.resumeText}
"""

Conversation so far:
${chatHistory}

Rules:
1. Always analyze the question before answering.
2. Provide at least 3–5 sentences per answer (structured and professional).
3. Only answer based on the resume.
4. If unrelated to resume, reply: "I can only answer based on the resume."
5. Use formatting (bullet points, numbered steps) if it improves clarity.

Q: ${message}
A:`;

    const result = await retryWithBackoff(async () => {
      return await model.generateContent(prompt);
    });
    
    const response = await result.response;
    const aiResponse = response.text();

    // Add assistant message
    chat.messages.push({
      role: 'assistant',
      content: aiResponse,
    });

    await chat.save();

    res.json({
      success: true,
      response: aiResponse,
      messages: chat.messages,
    });
  } catch (error) {
    console.error('Chat Message Error:', error);
    res.status(500).json({ error: error.message || 'Failed to process message' });
  }
});

// GET /api/chat/:sessionId - Get chat history
router.get('/:sessionId', async (req, res) => {
  try {
    const chat = await Chat.findOne({ sessionId: req.params.sessionId });

    if (!chat) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    res.json({
      success: true,
      messages: chat.messages,
    });
  } catch (error) {
    console.error('Get Chat Error:', error);
    res.status(500).json({ error: 'Failed to retrieve chat history' });
  }
});

// DELETE /api/chat/:sessionId - Clear chat
router.delete('/:sessionId', async (req, res) => {
  try {
    const chat = await Chat.findOne({ sessionId: req.params.sessionId });

    if (!chat) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    chat.messages = [];
    await chat.save();

    res.json({
      success: true,
      message: 'Chat history cleared',
    });
  } catch (error) {
    console.error('Clear Chat Error:', error);
    res.status(500).json({ error: 'Failed to clear chat' });
  }
});

module.exports = router;
