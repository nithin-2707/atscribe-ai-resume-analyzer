const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Analysis = require('../models/Analysis');

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB limit
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

// Validate if the text is a resume
function validateResume(text) {
  if (!text || text.trim().length < 100) {
    return { valid: false, reason: 'Resume file appears to be empty or too short. Please upload a proper resume PDF.' };
  }

  // Resume indicators (keywords that typically appear in resumes)
  const resumeKeywords = [
    'experience', 'education', 'skills', 'work', 'projects', 'university',
    'college', 'degree', 'bachelor', 'master', 'certification', 'certified',
    'employed', 'developed', 'managed', 'led', 'designed', 'implemented',
    'achieved', 'responsibilities', 'accomplishments', 'profile', 'summary',
    'objective', 'career', 'professional', 'intern', 'internship', 'volunteer',
    'award', 'achievement', 'technical', 'competencies', 'expertise'
  ];

  // Job posting indicators (should NOT be in resume)
  const jobPostingKeywords = [
    'we are looking', 'we are hiring', 'join our team', 'apply now',
    'job description', 'job requirements', 'required qualifications',
    'preferred qualifications', 'what we offer', 'benefits package',
    'equal opportunity employer', 'salary range', 'compensation package',
    'about the company', 'company culture', 'our mission', 'our vision',
    'company benefits', 'hiring for', 'positions available'
  ];

  const lowerText = text.toLowerCase();
  
  // Check for job posting indicators (red flag)
  const jobPostingMatches = jobPostingKeywords.filter(keyword => 
    lowerText.includes(keyword)
  ).length;
  
  if (jobPostingMatches >= 2) {
    return { 
      valid: false, 
      reason: 'This appears to be a job posting, not a resume. Please upload your actual resume PDF.' 
    };
  }

  // Check for resume indicators
  const resumeMatches = resumeKeywords.filter(keyword => 
    lowerText.includes(keyword)
  ).length;

  // Need at least 4 resume keywords to be considered valid
  if (resumeMatches < 4) {
    return { 
      valid: false, 
      reason: 'This does not appear to be a valid resume. Please upload a proper resume with your experience, education, and skills.' 
    };
  }

  // Check for personal information patterns
  const hasEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/.test(text);
  const hasPhone = /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(text);
  
  // A resume should have at least an email or phone
  if (!hasEmail && !hasPhone) {
    return { 
      valid: false, 
      reason: 'Resume appears incomplete. A valid resume should contain contact information (email or phone number).' 
    };
  }

  return { valid: true };
}

// Validate if the text is a job description
function validateJobDescription(text) {
  if (!text || text.trim().length < 50) {
    return { valid: false, reason: 'Job description appears to be empty or too short. Please provide a proper job description (minimum 50 characters).' };
  }

  const trimmedText = text.trim();
  const lowerText = text.toLowerCase();
  
  // Check for repeated patterns (like "ai ai ai" or "test test test")
  const words = trimmedText.toLowerCase().split(/\s+/);
  if (words.length > 5) {
    const uniqueWords = new Set(words);
    const repetitionRatio = uniqueWords.size / words.length;
    if (repetitionRatio < 0.3) {
      return { 
        valid: false, 
        reason: 'Job description appears to contain repetitive text. Please provide a genuine job description with requirements and responsibilities.' 
      };
    }
  }

  // Check if it's just the error message being pasted back
  if (lowerText.includes("doesn't appear to be") || lowerText.includes("please include job requirements")) {
    return { 
      valid: false, 
      reason: 'Please enter a real job description, not an error message or placeholder text.' 
    };
  }

  // Job description indicators
  const jdKeywords = [
    'responsibilities', 'requirements', 'qualifications', 'skills',
    'experience', 'role', 'position', 'job', 'candidate', 'must have',
    'should have', 'required', 'preferred', 'looking for', 'seeking',
    'duties', 'tasks', 'company', 'team', 'work', 'bachelor', 'degree',
    'years of experience', 'knowledge of', 'expertise in', 'proficient',
    'familiar with', 'ability to', 'strong', 'excellent', 'responsible for',
    'will be', 'about the role', 'what you', 'collaborate', 'develop'
  ];
  
  // Check for job description indicators
  const jdMatches = jdKeywords.filter(keyword => 
    lowerText.includes(keyword)
  ).length;

  // Need at least 4 JD keywords for better accuracy
  if (jdMatches < 4) {
    return { 
      valid: false, 
      reason: 'This does not appear to be a valid job description. A job description should include requirements, responsibilities, qualifications, or skills needed for the role.' 
    };
  }

  // Check word count - job descriptions should have substance
  const wordCount = trimmedText.split(/\s+/).length;
  if (wordCount < 30) {
    return { 
      valid: false, 
      reason: 'Job description is too brief. Please provide a detailed job description (minimum 30 words) with role requirements and responsibilities.' 
    };
  }

  return { valid: true };
}

// Analyze resume with Gemini
async function analyzeResumeWithGemini(resumeText, jobDescription) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const prompt = `
You are an expert AI resume evaluator with deep knowledge of industry-specific skills and job requirements.

Resume Text:
${resumeText.substring(0, 2500)}

Job Description:
${jobDescription.substring(0, 2500)}

**IMPORTANT INSTRUCTIONS:**

1. **First, validate if this is a resume:**
   - If the text is NOT a resume (e.g., job posting, blank doc, random text), respond ONLY with:
   {
     "resume_valid": false,
     "reason": "Brief explanation why it's not a resume"
   }

2. **If it IS a valid resume, perform INTELLIGENT analysis:**

   A. **Technical Skills - BE SMART:**
      - Extract technical skills EXPLICITLY mentioned in the job description
      - **INFER industry-standard skills** based on the job title and role
      - Examples:
        * "Data Analyst" → SQL, Excel, Power BI, Python, Tableau, Data Visualization
        * "Software Engineer" → Git, APIs, Database, Testing, Cloud platforms
        * "Marketing Manager" → Google Analytics, SEO, Social Media platforms, CRM tools
        * "Business Analyst" → Excel, SQL, PowerPoint, Requirements gathering, Process mapping
      - Look for these inferred skills in the resume even if JD doesn't explicitly list them
      - Technical skills include: programming languages, software tools, frameworks, platforms, methodologies

   B. **Scoring - BE ACCURATE:**
      - overall_score: How well the overall experience and profile matches the role (0-100)
      - semantic_score: Contextual match between resume content and JD requirements (0-100)
      - skill_score: Combined technical + soft skills match percentage (0-100)
      - Base scores on BOTH explicit JD requirements AND inferred role requirements

   C. **Recommendations - BE HUMAN AND PRACTICAL:**
      - Write 6-8 personalized, actionable recommendations
      - Use natural, conversational language (like a career coach talking)
      - Focus on:
        * Specific keywords missing from the resume
        * Quantifiable achievements to add
        * ATS optimization tips
        * Gap areas with concrete solutions
        * Skills to highlight or acquire
        * Resume structure improvements
      - Avoid generic advice like "improve your resume" - be SPECIFIC
      - Example: Instead of "Add more skills" → "Consider adding 'SQL' and 'Power BI' since Data Analysts typically need these tools, and they're common in your field"

   D. **Qualitative Feedback - STRUCTURED BULLET POINTS:**
      - Format with clear sections and bullet points
      - Make each point specific, actionable, and conversational
      - 3-4 points per section
      
      **STRENGTHS** - What's working well:
      - Specific skills or experiences that match the role perfectly
      - Impressive certifications or education highlights
      - Quantifiable achievements or career progression
      - Strong technical or soft skills demonstrated
      
      **WEAKNESSES/GAPS** - Areas needing attention:
      - Missing critical skills for the role
      - Lack of quantifiable metrics or achievements
      - Generic descriptions without impact demonstration
      - Skills mentioned but not demonstrated with examples
      
      **OPPORTUNITIES** - How to enhance the resume:
      - Specific ways to showcase experience with tools/technologies
      - How to tailor content to emphasize relevant skills
      - Suggestions for restructuring or highlighting key areas
      - Ways to make achievements more impactful
      
      **RECOMMENDATIONS** - Priority action items:
      - Top 3-4 immediate changes to make
      - Specific keywords or phrases to add
      - Concrete examples of how to improve descriptions
      - ATS optimization strategies

**OUTPUT FORMAT (JSON only, no markdown):**

{
  "resume_valid": true,
  "overall_score": number (0-100),
  "semantic_score": number (0-100),
  "skill_score": number (0-100),

  "feedback": "STRENGTHS\\n- The resume highlights relevant skills like analytical thinking and problem-solving, crucial for this role.\\n- AWS Certified Cloud Practitioner and Microsoft Azure Data Fundamentals certifications demonstrate strong technical aptitude.\\n- Educational background in relevant field shows foundational knowledge.\\n\\nWEAKNESSES/GAPS\\n- The resume lacks quantifiable achievements and specific examples of how skills contributed to business outcomes.\\n- Project descriptions are too generic and don't showcase complexity or measurable impact.\\n- Missing specific mentions of key tools that are standard for this role.\\n\\nOPPORTUNITIES\\n- Add more details on experience with data analytics tools, specifically how Power BI or similar tools were used.\\n- Tailor the resume to emphasize skills relevant to the specific domain mentioned in the job description.\\n- Strengthen project descriptions by adding metrics that demonstrate value delivered.\\n\\nRECOMMENDATIONS\\n- Add specific metrics to quantify project impact (e.g., 'improved efficiency by X%', 'processed Y records').\\n- Research the company's focus areas and tailor the resume to highlight aligned skills and experiences.\\n- Include keywords from the job description naturally throughout experience and skills sections.",

  "soft_skills_required": ["Communication", "Teamwork", "Problem-solving", etc.],
  "soft_skills_present": ["Leadership", "Collaboration", etc.],
  "technical_skills_required": ["SQL", "Python", "Excel", etc. - include BOTH explicit and inferred skills],
  "technical_skills_present": ["Java", "React", "MongoDB", etc.],

  "recommendations": [
      "Personalized recommendation 1 with specific examples",
      "Personalized recommendation 2 with concrete actions",
      "Personalized recommendation 3 addressing gaps",
      "Personalized recommendation 4 about achievements",
      "Personalized recommendation 5 about keywords",
      "Personalized recommendation 6 about ATS optimization"
  ]
}
`;

  try {
    const result = await retryWithBackoff(async () => {
      return await model.generateContent(prompt);
    });
    
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Invalid response format from Gemini');
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to analyze resume');
  }
}

// POST /api/analysis/analyze
router.post('/analyze', upload.fields([
  { name: 'resume', maxCount: 1 },
  { name: 'jobDescriptionFile', maxCount: 1 }
]), async (req, res) => {
  try {
    const { jobDescription, sessionId } = req.body;

    if (!req.files || !req.files.resume || !req.files.resume[0]) {
      return res.status(400).json({ error: 'Resume file is required' });
    }

    let finalJobDescription = jobDescription;
    
    // If job description file is uploaded, extract text from it
    if (req.files.jobDescriptionFile && req.files.jobDescriptionFile[0]) {
      try {
        finalJobDescription = await extractTextFromPDF(req.files.jobDescriptionFile[0].buffer);
        if (!finalJobDescription || finalJobDescription.trim().length === 0) {
          return res.status(400).json({ error: 'Could not extract text from job description PDF' });
        }
      } catch (error) {
        return res.status(400).json({ error: 'Failed to process job description PDF' });
      }
    }

    if (!finalJobDescription || finalJobDescription.trim().length === 0) {
      return res.status(400).json({ error: 'Job description is required' });
    }

    // Extract text from resume PDF
    const resumeText = await extractTextFromPDF(req.files.resume[0].buffer);

    if (!resumeText) {
      return res.status(400).json({ error: 'Could not extract text from resume' });
    }

    // Validate that it's actually a resume
    const resumeValidation = validateResume(resumeText);
    if (!resumeValidation.valid) {
      return res.status(400).json({ 
        error: 'Invalid Resume',
        message: resumeValidation.reason 
      });
    }

    // Validate that job description is valid
    const jdValidation = validateJobDescription(finalJobDescription);
    if (!jdValidation.valid) {
      return res.status(400).json({ 
        error: 'Invalid Job Description',
        message: jdValidation.reason 
      });
    }

    // Analyze with Gemini
    const analysis = await analyzeResumeWithGemini(resumeText, finalJobDescription);

    // Check if resume is valid
    if (analysis.resume_valid === false) {
      return res.status(400).json({ 
        error: 'Invalid resume', 
        reason: analysis.reason 
      });
    }

    // Use findOneAndUpdate with upsert to avoid duplicate key errors
    const analysisDoc = await Analysis.findOneAndUpdate(
      { sessionId: sessionId || `session_${Date.now()}` },
      {
        resumeText,
        jobDescription: finalJobDescription,
        overallScore: analysis.overall_score || 0,
        semanticScore: analysis.semantic_score || 0,
        skillScore: analysis.skill_score || 0,
        feedback: analysis.feedback || '',
        softSkillsRequired: analysis.soft_skills_required || [],
        softSkillsPresent: analysis.soft_skills_present || [],
        technicalSkillsRequired: analysis.technical_skills_required || [],
        technicalSkillsPresent: analysis.technical_skills_present || [],
        recommendations: analysis.recommendations || [],
      },
      { 
        upsert: true, // Create if doesn't exist, update if exists
        new: true,    // Return the updated document
        setDefaultsOnInsert: true
      }
    );

    res.json({
      success: true,
      sessionId: analysisDoc.sessionId,
      data: {
        overallScore: analysisDoc.overallScore,
        semanticScore: analysisDoc.semanticScore,
        skillScore: analysisDoc.skillScore,
        feedback: analysisDoc.feedback,
        softSkillsRequired: analysisDoc.softSkillsRequired,
        softSkillsPresent: analysisDoc.softSkillsPresent,
        technicalSkillsRequired: analysisDoc.technicalSkillsRequired,
        technicalSkillsPresent: analysisDoc.technicalSkillsPresent,
        recommendations: analysisDoc.recommendations,
      },
    });
  } catch (error) {
    console.error('Analysis Error:', error);
    res.status(500).json({ error: error.message || 'Analysis failed' });
  }
});

// GET /api/analysis/:sessionId
router.get('/:sessionId', async (req, res) => {
  try {
    const analysis = await Analysis.findOne({ sessionId: req.params.sessionId });
    
    if (!analysis) {
      return res.status(404).json({ error: 'Analysis not found' });
    }

    res.json({
      success: true,
      data: {
        overallScore: analysis.overallScore,
        semanticScore: analysis.semanticScore,
        skillScore: analysis.skillScore,
        feedback: analysis.feedback,
        softSkillsRequired: analysis.softSkillsRequired,
        softSkillsPresent: analysis.softSkillsPresent,
        technicalSkillsRequired: analysis.technicalSkillsRequired,
        technicalSkillsPresent: analysis.technicalSkillsPresent,
        recommendations: analysis.recommendations,
      },
    });
  } catch (error) {
    console.error('Get Analysis Error:', error);
    res.status(500).json({ error: 'Failed to retrieve analysis' });
  }
});

module.exports = router;
