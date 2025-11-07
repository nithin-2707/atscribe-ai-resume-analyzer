# 🎯 ATScribe - Complete Project Overview

> **AI-Powered Dual-Mode Resume Analysis & Recruitment Platform**  
> *Built with MERN Stack + Google Gemini AI + Framer Motion*

---

## 📋 Table of Contents

1. [Project Summary](#-project-summary)
2. [Tech Stack](#-tech-stack)
3. [Architecture](#-architecture)
4. [Features by Mode](#-features-by-mode)
5. [Pages & Components](#-pages--components)
6. [Database Schema](#-database-schema)
7. [API Routes](#-api-routes)
8. [Project Flow](#-project-flow)
9. [Key Technologies Explained](#-key-technologies-explained)

---

## 🎯 Project Summary

**ATScribe** is a comprehensive AI-powered resume analysis platform with two distinct operational modes:

### **Student Mode** 🎓
Job seekers can upload their resumes and job descriptions to receive:
- AI-driven resume analysis with scoring
- Skills gap identification
- Interactive resume Q&A chat
- Personalized preparation plans
- Deep dive insights and recommendations

### **Recruiter Mode** 💼
Recruiters can efficiently evaluate multiple candidates by:
- Uploading multiple resumes simultaneously
- Ranking candidates by fit score
- Viewing detailed candidate comparisons
- Generating technical assignment questions
- Accessing comprehensive candidate insights

**Key Differentiator**: Dual-mode operation with completely different workflows optimized for each user type, powered by Google Gemini AI for intelligent analysis.

---

## 🛠️ Tech Stack

### **Frontend Technologies**

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.3.1 | Core UI framework with modern hooks |
| **Framer Motion** | 11.2.0 | Smooth animations & page transitions |
| **React Router DOM** | 6.23.1 | Client-side routing & navigation |
| **Axios** | 1.7.2 | HTTP client for API communication |
| **React Icons** | 5.2.1 | Professional flat-color icons (react-icons/fc) |
| **React Circular Progressbar** | 2.1.0 | Animated circular gauge components |
| **React Markdown** | 9.0.1 | Render AI-generated markdown content |
| **Recharts** | 2.12.7 | Data visualization charts |
| **React Dropzone** | 14.2.3 | Drag-and-drop file uploads |

### **Backend Technologies**

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18.20.7 | JavaScript runtime environment |
| **Express** | 4.19.2 | Web application framework |
| **MongoDB** | 8.3.0 | NoSQL database |
| **Mongoose** | 8.3.0 | MongoDB object modeling (ODM) |
| **Google Gemini AI** | 0.21.0 | AI-powered resume analysis |
| **Multer** | 1.4.5 | Multipart/form-data file uploads |
| **PDF-Parse** | 1.1.1 | Extract text from PDF resumes |
| **CORS** | 2.8.5 | Cross-origin resource sharing |
| **Dotenv** | 16.4.5 | Environment variable management |

### **Development Tools**

| Tool | Purpose |
|------|---------|
| **Nodemon** | Auto-restart server on file changes |
| **ESLint** | Code quality & consistency |
| **React Scripts** | Build & development scripts |
| **VS Code** | Primary development environment |

---

## 🏗️ Architecture

### **High-Level Architecture**

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Landing     │  │   Student    │  │   Recruiter  │     │
│  │    Page      │  │    Mode      │  │     Mode     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                            │                                │
│                     ┌──────▼──────┐                        │
│                     │  AppContext │                        │
│                     │ (State Mgmt)│                        │
│                     └──────┬──────┘                        │
│                            │                                │
│                     ┌──────▼──────┐                        │
│                     │   API Layer │                        │
│                     │   (Axios)   │                        │
│                     └──────┬──────┘                        │
└────────────────────────────┼────────────────────────────────┘
                             │ HTTP/REST
                             │
┌────────────────────────────▼────────────────────────────────┐
│                   BACKEND (Express API)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Analysis   │  │     Chat     │  │  Prep Plan   │     │
│  │    Routes    │  │    Routes    │  │    Routes    │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│  ┌──────▼──────────────────▼────────────────▼───────┐     │
│  │           Recruiter Routes                       │     │
│  └──────┬───────────────────────────────────────────┘     │
│         │                                                   │
│  ┌──────▼──────┐                  ┌──────────────┐        │
│  │   Multer    │                  │ Google Gemini│        │
│  │ File Upload │                  │      AI      │        │
│  └──────┬──────┘                  └──────┬───────┘        │
│         │                                 │                │
│  ┌──────▼──────┐                         │                │
│  │  PDF Parse  │                         │                │
│  └──────┬──────┘                         │                │
│         └─────────────┬──────────────────┘                │
│                       │                                    │
│                ┌──────▼──────┐                            │
│                │  MongoDB    │                            │
│                │  (Mongoose) │                            │
│                └─────────────┘                            │
└─────────────────────────────────────────────────────────────┘
```

### **Data Flow**

1. **User Interaction** → Frontend React components
2. **State Management** → React Context (AppContext)
3. **API Calls** → Axios service layer
4. **Backend Processing** → Express routes handle requests
5. **File Processing** → Multer + PDF-Parse extract resume text
6. **AI Analysis** → Google Gemini AI processes data
7. **Database Storage** → MongoDB stores sessions & results
8. **Response** → JSON data sent back to frontend
9. **UI Update** → React re-renders with new data

---

## 🎨 Features by Mode

### **Student Mode Features**

#### 1. **Dashboard** (Main Hub)
- **Resume Upload**: Drag-and-drop or click to upload PDF
- **Job Description Input**: Paste text or upload PDF
- **AI Analysis**: Comprehensive resume evaluation
- **Score Display**: 
  - Overall Match Score (0-100%)
  - Semantic Score (contextual understanding)
  - Skill Score (technical + soft skills)
- **Navigation Cards**: Quick access to all features
- **Mode Switcher**: Seamlessly switch to Recruiter mode

#### 2. **Chat with Resume** 💬
- **Resume Upload**: Initialize chat session
- **AI Conversation**: Ask questions about your resume
- **Smart Responses**: Get detailed, step-by-step answers
- **Welcome Message**: ChatGPT-style professional greeting
- **Resume Badge**: Display uploaded resume filename & size
- **Enhanced UI**: Gradient backgrounds, shimmer effects
- **Chat History**: Persistent conversation storage
- **Clear Chat**: Reset conversation anytime

#### 3. **Deep Dive Report** 🔍
- **Skills Gap Analysis**: Missing vs Present skills
- **Technical Skills**: Programming languages, tools, frameworks
- **Soft Skills**: Communication, leadership, teamwork
- **Visual Charts**: Interactive skill comparison charts
- **Recommendations**: 6-8 actionable improvement tips
- **Qualitative Feedback**: Structured strengths/weaknesses
- **ATS Optimization**: Keyword suggestions for better parsing

#### 4. **Preparation Plan** 📅
- **Custom Timeline**: 7, 14, 30, 60, or 90 days
- **AI-Generated Plan**: Personalized day-by-day schedule
- **Phase Breakdown**: Fundamentals → Intermediate → Advanced
- **Resource Suggestions**: Courses, practice platforms
- **Weekly Milestones**: Checkpoints and goals
- **Mock Interview Schedule**: Practice session planning
- **Markdown Export**: Download plan for offline use

### **Recruiter Mode Features**

#### 1. **Recruiter Dashboard** 💼
- **Multiple Resume Upload**: Drag-and-drop batch processing
- **Job Description Input**: Paste or upload PDF
- **Bulk Ranking**: AI ranks all candidates simultaneously
- **Quick Summary**: Top 3 candidates preview
- **Fit Score Display**: Color-coded match percentages
- **Candidate Count**: Total resumes uploaded
- **Session Management**: Track multiple ranking sessions
- **MongoDB Persistence**: All data saved to database

#### 2. **Recruiter Ranking** 🏆
- **Detailed Rankings**: Full candidate list with scores
- **Candidate Cards**: 
  - Rank position (#1, #2, #3...)
  - Candidate name extraction
  - Fit score percentage
  - Strengths (top 3-5 skills)
  - Missing skills (gaps)
  - AI justification
- **Color Coding**: 
  - Green (80%+): Excellent match
  - Yellow (60-79%): Good match
  - Red (<60%): Poor match
- **Filtering**: Sort by score, name, or rank
- **Export Options**: Download rankings as CSV/PDF

#### 3. **Assignment Generator** 📝
- **Technical Questions**: AI-generated coding challenges
- **Skill-Based**: Tailored to job requirements
- **Difficulty Levels**: Easy, Medium, Hard
- **Multiple Formats**: MCQ, Coding, System Design
- **Bulk Generation**: Create question sets
- **Customization**: Edit generated questions

---

## 📄 Pages & Components

### **Pages** (8 Total)

| Page | Route | Mode | Description |
|------|-------|------|-------------|
| **LandingPage** | `/` | Both | Hero section with mode selection |
| **Dashboard** | `/dashboard` | Student | Main analysis hub for students |
| **ChatWithResume** | `/chat` | Student | AI-powered resume Q&A |
| **DeepDive** | `/deep-dive` | Student | Comprehensive skills analysis |
| **PreparationPlan** | `/preparation` | Student | Timeline-based study plans |
| **RecruiterDashboard** | `/recruiter-dashboard` | Recruiter | Bulk resume ranking interface |
| **RecruiterRanking** | `/recruiter-ranking` | Recruiter | Detailed candidate rankings |
| **AssignmentGenerator** | `/assignment-generator` | Recruiter | Technical question creation |

### **Components** (2 Core + Page Components)

#### **Core Components**

1. **Sidebar** (`Sidebar.js`)
   - **Purpose**: Global navigation menu
   - **Features**: 
     - Mode-specific menu items
     - Active route highlighting
     - Smooth hover animations
     - Dark mode toggle
     - ATScribe branding
   - **Icons Used**: FcBarChart, FcVoicePresentation, FcSearch, FcCalendar, FcVip, FcTodoList, FcNightPortrait
   - **Dynamic**: Changes menu based on `userRole` (student/recruiter)

2. **CircularGauge** (`CircularGauge.js`)
   - **Purpose**: Animated score visualization
   - **Features**: 
     - Circular progress bar
     - Percentage display
     - Color-coded (green/yellow/red)
     - Smooth animations
   - **Used In**: Dashboard score displays

### **Page Component Details**

#### **LandingPage.js**
- **Purpose**: Entry point, user type selection
- **Sections**:
  - Hero with animated gradient
  - Mode selection cards (Student/Recruiter)
  - Feature highlights
  - "Get Started" CTAs
- **Animations**: Framer Motion page transitions

#### **Dashboard.js** (Student)
- **Key Elements**:
  - Mode badge with dropdown (Student ⟷ Recruiter)
  - Resume dropzone (drag & drop)
  - Job description textarea/upload
  - Analyze button with loading state
  - Results section with 3 circular gauges
  - Navigation cards (4 cards: Chat, Deep Dive, Prep Plan, Share)
- **State Management**: 
  - Resume file, job description, loading states
  - Analysis data from AppContext
  - Session ID tracking
- **Error Handling**: Job description validation (50+ chars, 20+ words)

#### **ChatWithResume.js**
- **Key Elements**:
  - Resume upload section (if not uploaded)
  - Chat message list with roles (user/assistant)
  - Message input box
  - Send button
  - Clear chat button
  - Resume info badge (filename + size)
- **Welcome Message**: 
  ```
  Hello! 👋 I've successfully analyzed your resume...
  
  💼 What I Can Help You With:
  - Career advice...
  - Interview preparation...
  - Skills assessment...
  ```
- **UI Enhancements**: 
  - Gradient backgrounds for assistant messages
  - Shimmer effect on first message
  - Welcome animation
  - Markdown rendering for formatted responses

#### **DeepDive.js**
- **Key Elements**:
  - Overall analysis summary
  - Skills comparison charts (Recharts)
  - Missing skills list (red badges)
  - Present skills list (green badges)
  - Recommendations cards (6-8 items)
  - Qualitative feedback sections
- **Data Visualization**:
  - Bar charts for skill comparison
  - Line charts for score breakdown
  - Area charts for trend analysis
- **Icons**: FcOk, FcCancel, FcIdea, FcLineChart, FcBarChart

#### **PreparationPlan.js**
- **Key Elements**:
  - Timeline selector (days input)
  - Quick select buttons (7, 14, 30, 60, 90)
  - Generate button
  - Plan display (markdown formatted)
  - Download plan button
  - Plan history (previous plans)
- **AI-Generated Content**:
  - Phase breakdown
  - Daily schedule
  - Resource recommendations
  - Milestone tracking
  - Mock interview schedule

#### **RecruiterDashboard.js**
- **Key Elements**:
  - Mode badge (Recruiter)
  - Job description textarea/upload
  - Multiple resume dropzone
  - Uploaded files list (with remove buttons)
  - Rank resumes button
  - Results summary (top 3 candidates)
  - "View Detailed Rankings" link
- **File Handling**: 
  - Multiple PDF uploads
  - Individual file removal
  - File size display
  - PDF validation

#### **RecruiterRanking.js**
- **Key Elements**:
  - Candidate count display
  - Sort/filter options
  - Candidate cards (full list)
  - Rank badges (color-coded)
  - Fit score percentages
  - Strengths list (expandable)
  - Missing skills list (expandable)
  - AI justification text
  - Back to dashboard button
- **Color Coding**:
  ```javascript
  fitScore >= 80: #10b981 (green)
  fitScore >= 60: #f59e0b (yellow)
  fitScore < 60:  #ef4444 (red)
  ```

#### **AssignmentGenerator.js**
- **Key Elements**:
  - Question type selector (MCQ/Coding/System Design)
  - Difficulty selector (Easy/Medium/Hard)
  - Number of questions input
  - Generate button
  - Questions display
  - Copy/Export buttons
- **AI Features**:
  - Skill-based question generation
  - Context-aware from job description
  - Multiple format support

---

## 🗄️ Database Schema

### **MongoDB Collections** (5 Total)

#### **1. Analysis Collection** (Student Mode)
```javascript
{
  sessionId: String (unique, indexed),
  resumeText: String (full extracted text),
  jobDescription: String,
  overallScore: Number (0-100),
  semanticScore: Number (0-100),
  skillScore: Number (0-100),
  feedback: String (qualitative feedback),
  softSkillsRequired: [String],
  softSkillsPresent: [String],
  technicalSkillsRequired: [String],
  technicalSkillsPresent: [String],
  recommendations: [String],
  createdAt: Date,
  updatedAt: Date
}
```

**Purpose**: Store student resume analysis results  
**Indexes**: `sessionId` (unique)  
**Retention**: Persistent (for session recovery)

#### **2. Chat Collection** (Student Mode)
```javascript
{
  sessionId: String (unique, indexed),
  resumeText: String,
  messages: [
    {
      role: String ('user' | 'assistant'),
      content: String,
      timestamp: Date
    }
  ],
  createdAt: Date,
  updatedAt: Date
}
```

**Purpose**: Store chat conversation history  
**Indexes**: `sessionId` (unique)  
**Features**: Message array with roles

#### **3. PrepPlan Collection** (Student Mode)
```javascript
{
  sessionId: String (indexed),
  resumeText: String,
  jobDescription: String,
  days: Number (preparation timeline),
  planText: String (AI-generated markdown plan),
  createdAt: Date,
  updatedAt: Date
}
```

**Purpose**: Store generated preparation plans  
**Indexes**: `sessionId`, `(sessionId + days)` compound  
**Features**: Multiple plans per session (different durations)

#### **4. Candidate Collection** (Recruiter Mode) ⭐ NEW
```javascript
{
  // Company & Role Info
  companyId: String (indexed),
  companyName: String,
  roleId: String (indexed),
  roleTitle: String,
  
  // Session Info
  recruiterId: String (indexed),
  sessionId: String (indexed),
  
  // Job Details
  jobDescription: String (required),
  jobTitle: String,
  
  // Resume Info
  fileName: String (required),
  resumeText: String (required),
  
  // Extracted Details
  candidateName: String (default: 'Unknown Candidate'),
  email: String,
  phone: String,
  
  // AI Analysis
  rank: Number (1, 2, 3...),
  fitScore: Number (0-100),
  strengths: [String],
  missingSkills: [String],
  technicalSkillsPresent: [String],
  softSkillsPresent: [String],
  justification: String,
  
  // Workflow
  status: String ('pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired'),
  recruiterNotes: String,
  interviewScheduled: Date,
  
  createdAt: Date,
  updatedAt: Date
}
```

**Purpose**: Store individual candidate analysis in recruiter mode  
**Indexes**: 
- `(recruiterId, sessionId)` compound
- `fitScore` (descending)
- `rank` (ascending)
- `status`

**Methods**:
- `updateStatus(newStatus)`: Change candidate status
- `getSessionCandidates(sessionId)`: Get all candidates for session
- `getTopCandidates(sessionId, limit)`: Get top N candidates

#### **5. RecruiterSession Collection** ⭐ NEW
```javascript
{
  sessionId: String (unique, indexed),
  recruiterId: String (indexed),
  
  // Job Details
  jobDescription: String (required),
  jobTitle: String,
  companyName: String,
  location: String,
  
  // Requirements
  requiredTechnicalSkills: [String],
  requiredSoftSkills: [String],
  
  // Statistics
  totalCandidates: Number,
  shortlistedCount: Number (default: 0),
  rejectedCount: Number (default: 0),
  
  // Session Status
  status: String ('active' | 'completed' | 'archived'),
  lastActivity: Date (auto-updated),
  
  createdAt: Date,
  updatedAt: Date
}
```

**Purpose**: Track recruiter sessions and job postings  
**Indexes**: `sessionId` (unique), `recruiterId`, `status`  
**Methods**:
- `updateActivity()`: Update lastActivity timestamp
- `complete()`: Mark session as completed
- `getActiveSessions(recruiterId)`: Get all active sessions

---

## 🔌 API Routes

### **Analysis Routes** (`/api/analysis`)

#### POST `/api/analysis/analyze`
- **Purpose**: Analyze resume against job description
- **Body**: FormData with `resume` (PDF), `jobDescription` (text or PDF), `sessionId`
- **Process**:
  1. Extract text from resume PDF
  2. Extract text from job description (if PDF)
  3. Validate job description (50+ chars, 20+ words, job keywords)
  4. Send to Gemini AI for analysis
  5. Parse AI response (JSON with scores, skills, feedback)
  6. Save to MongoDB `Analysis` collection
  7. Return analysis data
- **Response**:
  ```json
  {
    "success": true,
    "sessionId": "session_123...",
    "data": {
      "overallScore": 85,
      "semanticScore": 90,
      "skillScore": 80,
      "feedback": "...",
      "softSkillsRequired": [...],
      "softSkillsPresent": [...],
      "technicalSkillsRequired": [...],
      "technicalSkillsPresent": [...],
      "recommendations": [...]
    }
  }
  ```

#### GET `/api/analysis/:sessionId`
- **Purpose**: Retrieve saved analysis
- **Response**: Same as POST response
- **Use Case**: Session recovery, page refresh

### **Chat Routes** (`/api/chat`)

#### POST `/api/chat/init`
- **Purpose**: Initialize chat session with resume
- **Body**: FormData with `resume` (PDF), `sessionId`
- **Process**:
  1. Extract text from resume PDF
  2. Create/update `Chat` document
  3. Initialize empty messages array
- **Response**:
  ```json
  {
    "success": true,
    "sessionId": "chat_123...",
    "message": "Chat initialized successfully"
  }
  ```

#### POST `/api/chat/message`
- **Purpose**: Send message and get AI response
- **Body**: `{ sessionId, message }`
- **Process**:
  1. Find chat session
  2. Add user message to array
  3. Build prompt with chat history (last 10 messages)
  4. Send to Gemini AI
  5. Add AI response to messages
  6. Save and return
- **Response**:
  ```json
  {
    "success": true,
    "response": "AI generated response...",
    "messages": [...]
  }
  ```

#### GET `/api/chat/:sessionId`
- **Purpose**: Get chat history
- **Response**: All messages for session

#### DELETE `/api/chat/:sessionId`
- **Purpose**: Clear chat history
- **Action**: Empty messages array

### **Preparation Plan Routes** (`/api/prep-plan`)

#### POST `/api/prep-plan/generate`
- **Purpose**: Generate personalized study plan
- **Body**: `{ sessionId, days }`
- **Process**:
  1. Get analysis data for session
  2. Extract missing skills
  3. Build prompt with days, skills, current score
  4. Send to Gemini AI
  5. Save plan to `PrepPlan` collection
- **Response**:
  ```json
  {
    "success": true,
    "planText": "# 30-Day Preparation Plan\n\n## Overview\n..."
  }
  ```

#### GET `/api/prep-plan/:sessionId`
- **Purpose**: Get all plans for session
- **Response**: Array of plans (different durations)

### **Recruiter Routes** (`/api/recruiter`)

#### POST `/api/recruiter/rank-resumes` ⭐ MAIN FEATURE
- **Purpose**: Rank multiple candidates
- **Body**: FormData with:
  - `resumes[]` (multiple PDFs)
  - `jobDescription` (text or PDF)
  - `sessionId`
- **Process**:
  1. Extract text from all resume PDFs
  2. Extract text from job description
  3. Build comprehensive Gemini AI prompt
  4. AI analyzes and ranks all candidates
  5. **Save to MongoDB**:
     - Create/update `RecruiterSession` document
     - Create `Candidate` document for each candidate
     - Update session statistics
  6. Return ranked candidates
- **AI Prompt Includes**:
  - Job description analysis
  - Required skills extraction
  - Candidate comparison
  - Ranking criteria (technical fit, experience, soft skills)
  - Fit score calculation (0-100%)
- **Response**:
  ```json
  {
    "success": true,
    "sessionId": "recruiter_123...",
    "data": {
      "rankedCandidates": [
        {
          "rank": 1,
          "fileName": "john_doe_resume.pdf",
          "name": "John Doe",
          "fitScore": 92,
          "strengths": ["Python", "Machine Learning", "5+ years exp"],
          "missingSkills": ["Kubernetes", "Docker"],
          "justification": "Excellent technical match..."
        },
        ...
      ]
    }
  }
  ```

#### POST `/api/recruiter/generate-assignments`
- **Purpose**: Generate technical assignment questions
- **Body**: 
  ```json
  {
    "jobDescription": "...",
    "questionType": "coding",
    "difficulty": "medium",
    "count": 5
  }
  ```
- **Process**:
  1. Analyze job requirements
  2. Generate skill-specific questions
  3. Format by type (MCQ/Coding/System Design)
- **Response**:
  ```json
  {
    "success": true,
    "questions": [...]
  }
  ```

---

## 🔄 Project Flow

### **Student Mode Flow**

```
1. Landing Page
   ↓ Select "Student Mode"
   
2. Dashboard
   ↓ Upload Resume + Job Description
   ↓ Click "Analyze"
   
3. AI Analysis
   ↓ Gemini AI processes
   ↓ Saves to MongoDB
   
4. Results Display
   ├─→ View Dashboard Scores
   │   (Overall, Semantic, Skill)
   │
   ├─→ Navigate to Chat
   │   ├─ Ask questions
   │   └─ Get AI responses
   │
   ├─→ Navigate to Deep Dive
   │   ├─ View skills gap
   │   ├─ See recommendations
   │   └─ Review feedback
   │
   └─→ Navigate to Preparation Plan
       ├─ Select timeline
       ├─ Generate plan
       └─ Download/Save
```

### **Recruiter Mode Flow**

```
1. Landing Page
   ↓ Select "Recruiter Mode"
   
2. Recruiter Dashboard
   ↓ Upload Multiple Resumes
   ↓ Paste/Upload Job Description
   ↓ Click "Rank Resumes"
   
3. AI Ranking Process
   ↓ Extract text from all PDFs
   ↓ Gemini AI analyzes & compares
   ↓ Generates fit scores & rankings
   ↓ SAVES TO MONGODB:
   │  ├─ RecruiterSession document
   │  └─ Candidate documents (one per resume)
   
4. Results Display
   ├─→ Dashboard Summary
   │   └─ Top 3 candidates preview
   │
   └─→ Detailed Rankings
       ├─ Full candidate list
       ├─ Color-coded scores
       ├─ Strengths/Weaknesses
       └─ AI justifications
   
5. Additional Actions
   ├─→ Generate Assignments
   │   └─ Technical questions
   │
   └─→ Export Rankings
       └─ CSV/PDF download
```

### **Data Persistence Flow**

```
Frontend State (React)
   ↕
AppContext (State Management)
   ↕
LocalStorage (Client-side cache)
   ↕
API Service (Axios)
   ↕
Express Routes (Backend)
   ↕
MongoDB (Persistent storage)
```

**Key Points**:
- **Session Recovery**: Data saved to MongoDB allows page refresh without data loss
- **Cross-Device**: Same sessionId can access data from any device
- **History**: All sessions stored for future reference
- **Recruiter Data**: Now persistent across sessions (previously only localStorage)

---

## 🔑 Key Technologies Explained

### **1. Google Gemini AI (`gemini-2.0-flash-exp`)**

**What It Does**:
- Analyzes resume text against job descriptions
- Extracts skills, experience, qualifications
- Generates fit scores (0-100%)
- Provides qualitative feedback
- Creates personalized recommendations
- Generates preparation plans
- Answers resume-related questions

**Why Chosen**:
- Advanced natural language understanding
- Context-aware analysis
- Fast response times
- JSON output support
- Free tier with good limits

**Integration**:
```javascript
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
```

**Prompt Engineering**:
- Structured prompts with clear instructions
- JSON output format specification
- Context injection (resume + job description)
- Role-based responses (career coach, recruiter)

### **2. Framer Motion**

**What It Does**:
- Page transitions (fade, slide, zoom)
- Element animations (stagger, reveal)
- Hover/tap interactions
- Loading states
- Gesture recognition

**Why Chosen**:
- React-first animation library
- Declarative API (easy to use)
- Performance optimized
- Rich feature set

**Usage Examples**:
```javascript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

**Key Animations**:
- **Stagger**: Sequential child animations
- **WhileHover**: Button scale effects
- **AnimatePresence**: Conditional rendering with transitions
- **LayoutTransition**: Smooth layout changes

### **3. React Context (AppContext)**

**What It Does**:
- Global state management
- Share data across components
- Avoid prop drilling
- Persist to localStorage

**State Managed**:
- `sessionId`: Current session identifier
- `userRole`: 'student' or 'recruiter'
- `analysisData`: Resume analysis results
- `resumeText`: Extracted resume text
- `jobDescription`: Job description text
- `rankedCandidates`: Recruiter ranking results

**Why Chosen**:
- Built into React (no extra dependency)
- Simple API
- Good for medium-sized apps
- Integrates with localStorage

### **4. MongoDB + Mongoose**

**What It Does**:
- NoSQL document database
- Flexible schema
- Fast queries
- Scalable storage

**Why Chosen**:
- JSON-like documents (easy for JS)
- Schema flexibility (changing requirements)
- Good for unstructured data (AI responses)
- Rich query capabilities

**Mongoose Benefits**:
- Schema validation
- Middleware (pre/post hooks)
- Virtual properties
- Query building
- Type casting

### **5. Multer + PDF-Parse**

**Multer**:
- Handles `multipart/form-data`
- File size limits (200MB)
- Memory storage (buffer)
- Multiple file support

**PDF-Parse**:
- Extracts text from PDF buffers
- Preserves formatting (where possible)
- Fast processing
- Error handling

**Combined Flow**:
```javascript
// Multer receives file
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 200 * 1024 * 1024 }
});

// PDF-Parse extracts text
const data = await pdfParse(req.file.buffer);
const text = data.text;
```

### **6. React Icons (Flat Color - fc)**

**What It Does**:
- 1000+ professional icons
- Flat color style (consistent look)
- SVG-based (scalable)
- Tree-shakeable

**Why Chosen Over Emojis**:
- ❌ Emojis look AI-generated, unprofessional
- ✅ react-icons/fc provides:
  - Consistent flat color style
  - Professional appearance
  - Better browser support
  - Predictable rendering

**Icons Used**:
- `FcGraduationCap`: Student mode
- `FcBusinessman`: Recruiter mode
- `FcUpload`: File upload
- `FcDocument`: Resume files
- `FcVip`: Ranking
- `FcBarChart`: Analysis
- `FcVoicePresentation`: Deep dive
- `FcCalendar`: Preparation plan
- `FcSearch`: Deep dive
- And 20+ more across the app

### **7. Axios**

**What It Does**:
- HTTP client for API requests
- Promise-based
- Request/response interceptors
- Automatic JSON parsing

**Configuration**:
```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});
```

**Why Chosen**:
- Better than fetch (simpler API)
- Automatic error handling
- Request cancellation
- Progress tracking

---

## 🎯 Key Features Summary

### **What Makes This Project Unique**

1. **Dual-Mode Operation**
   - Single codebase, two complete workflows
   - Mode switching with persistent state
   - Optimized UX for each user type

2. **AI-Powered Intelligence**
   - Not just keyword matching
   - Semantic understanding of content
   - Context-aware recommendations
   - Natural language Q&A

3. **Professional UI/UX**
   - Smooth Framer Motion animations
   - Modern dark theme
   - Flat color professional icons
   - Responsive design

4. **Data Persistence**
   - MongoDB for long-term storage
   - localStorage for quick access
   - Session recovery
   - Cross-device support

5. **Comprehensive Analysis**
   - Multiple scoring metrics
   - Skills gap identification
   - Actionable recommendations
   - Qualitative feedback

6. **Recruiter Efficiency**
   - Batch processing (multiple resumes)
   - Automated ranking
   - Color-coded insights
   - Assignment generation

---

## 📊 Project Statistics

- **Total Files**: 50+ files
- **Lines of Code**: ~15,000+ lines
- **React Components**: 10 pages + 2 core components
- **API Routes**: 4 route files (12 endpoints)
- **Database Collections**: 5 collections
- **NPM Packages**: 30+ dependencies
- **Development Time**: Capstone project
- **AI Model**: Google Gemini 2.0 Flash Exp

---

## 🚀 Getting Started

### Quick Start Commands

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm start
```

### Environment Variables Required

**Backend `.env`**:
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

**Frontend `.env`**:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 📝 Notes & Best Practices

### **Code Organization**
- Separate concerns: UI, logic, API, state
- Reusable components
- Consistent naming conventions
- Modular CSS files

### **Error Handling**
- Try-catch blocks in all async functions
- User-friendly error messages
- Validation before AI calls
- Graceful degradation

### **Performance**
- Lazy loading for large components
- Debouncing for input fields
- Optimized re-renders with useCallback/useMemo
- Indexed MongoDB queries

### **Security**
- CORS configured
- File size limits
- PDF-only validation
- Environment variables for secrets
- No sensitive data in localStorage

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

✅ **Full-Stack Development**: MERN stack implementation  
✅ **AI Integration**: Google Gemini API usage  
✅ **State Management**: React Context + localStorage  
✅ **Database Design**: MongoDB schema modeling  
✅ **UI/UX Design**: Framer Motion animations  
✅ **File Processing**: PDF parsing and handling  
✅ **API Design**: RESTful endpoints  
✅ **Error Handling**: Comprehensive validation  
✅ **Code Organization**: Modular architecture  
✅ **Version Control**: Git best practices  

---

**Built with ❤️ by Nithin**  
*Capstone Project - 2025*
