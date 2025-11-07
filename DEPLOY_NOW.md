# 🚀 EXACT DEPLOYMENT STEPS - Copy & Paste

## 📌 Repository Details

**Repository Name**: `atscribe-ai-resume-analyzer`  
**GitHub URL**: `https://github.com/nithin-2707/atscribe-ai-resume-analyzer`  
**Your Profile**: `https://github.com/nithin-2707`

---

## ⚡ Quick Start (Copy These Commands)

### Step 1: Create GitHub Repository

1. Go to: https://github.com/new
2. Fill in:
   - **Repository name**: `atscribe-ai-resume-analyzer`
   - **Description**: `AI-Powered Dual-Mode Resume Analysis & Recruitment Platform - MERN Stack with Google Gemini AI`
   - **Visibility**: ✅ Public
   - **Initialize**: ❌ Don't check any boxes (no README, no .gitignore, no license)
3. Click **"Create repository"**

### Step 2: Push Your Code to GitHub

Open PowerShell in your project directory and run:

```powershell
# Navigate to project (if not already there)
cd C:\Users\NITHIN\OneDrive\Documents\capstone

# Initialize Git
git init

# Add all files
git add .

# Commit with message
git commit -m "Initial commit: ATScribe AI Resume Analyzer ready for deployment"

# Set branch to main
git branch -M main

# Add GitHub remote
git remote add origin https://github.com/nithin-2707/atscribe-ai-resume-analyzer.git

# Push to GitHub (you may need to authenticate)
git push -u origin main
```

**If you get authentication error**, GitHub will prompt you to login via browser.

---

## 🚂 Railway Deployment (Website Method)

### Step 1: Create Railway Account

1. Go to: https://railway.app
2. Click **"Login"**
3. Click **"Login with GitHub"**
4. Authorize Railway app
5. Grant access to all repositories (or just select atscribe-ai-resume-analyzer)

### Step 2: Deploy Backend

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Find and click: **atscribe-ai-resume-analyzer**
4. Railway starts deploying automatically

**Configure Backend:**

5. Click **"Settings"** tab
6. Under **"Root Directory"**, set: `backend`
7. Under **"Start Command"**, set: `node server.js`
8. Click **"Variables"** tab
9. Click **"+ New Variable"** and add these one by one:

```env
PORT=5000
NODE_ENV=production
GEMINI_API_KEY=AIzaSyDbRqUjFV5WlNEywLrWfJwVpSq7jrpSX-I
MONGODB_URI=mongodb+srv://preethamdandibhotla_db_user:Preetham172004@cluster0.8gfbrdx.mongodb.net/atscribe?retryWrites=true&w=majority
```

10. Wait for deployment to complete (2-3 minutes)
11. Click **"Settings"** → **"Networking"** → **"Public Networking"**
12. **COPY YOUR BACKEND URL**: `https://xxxxx.up.railway.app`

### Step 3: Deploy Frontend

1. In same Railway project, click **"+ New"**
2. Select **"GitHub Repo"**
3. Select **atscribe-ai-resume-analyzer** again
4. Railway starts deploying

**Configure Frontend:**

5. Click **"Settings"** tab
6. Under **"Root Directory"**, set: `frontend`
7. Under **"Build Command"**, set: `npm run build`
8. Under **"Start Command"**, set: `npx serve -s build -l $PORT`
9. Click **"Variables"** tab
10. Add this variable (replace with YOUR backend URL):

```env
REACT_APP_API_URL=https://[YOUR-BACKEND-URL].up.railway.app/api
```

Example:
```env
REACT_APP_API_URL=https://atscribe-backend-production-abc123.up.railway.app/api
```

11. Wait for deployment (3-5 minutes)
12. **COPY YOUR FRONTEND URL**: `https://xxxxx.up.railway.app`

### Step 4: Update Backend CORS

1. Go back to **Backend service**
2. Click **"Variables"**
3. Add new variable:

```env
FRONTEND_URL=https://[YOUR-FRONTEND-URL].up.railway.app
```

4. Service will auto-redeploy

---

## ✅ Test Your Deployment

Open your frontend URL in browser:
```
https://your-frontend-url.up.railway.app
```

**Test these features:**
- [ ] Landing page loads
- [ ] Switch to Student mode
- [ ] Upload resume
- [ ] Enter job description
- [ ] Click "Analyze" - wait for AI response
- [ ] Go to Chat - ask a question
- [ ] Switch to Recruiter mode
- [ ] Upload multiple resumes
- [ ] Click "Rank Resumes"
- [ ] View detailed rankings

---

## 🆘 If Something Goes Wrong

### Backend Not Working

Check logs in Railway:
1. Click on Backend service
2. Click **"Deployments"**
3. Click latest deployment
4. Check **"Build Logs"** and **"Deploy Logs"**

Common issues:
- ❌ MongoDB URI wrong → Update variable
- ❌ Gemini API key invalid → Update variable
- ❌ Port not set → Add PORT=5000

### Frontend Not Working

Check browser console (F12):
- ❌ "Failed to fetch" → Wrong REACT_APP_API_URL
- ❌ CORS error → Update FRONTEND_URL in backend
- ❌ Blank page → Check deploy logs in Railway

### API Not Connecting

Verify URLs:
- Backend health check: `https://your-backend-url.up.railway.app/api/health`
- Should return: `{"status":"OK","message":"ATScribe API is running"}`

---

## 📊 Railway Free Tier

You get **$5 free credits per month**:
- Enough for ~500-1000 requests
- Perfect for portfolio/demo
- No cold starts (always warm)
- Can add credit card for more (but not charged unless you exceed)

Monitor usage:
1. Railway Dashboard → **"Usage"**
2. See credit consumption
3. Set alerts if needed

---

## 🎯 Quick Reference

| What | Value |
|------|-------|
| **GitHub Repo** | `atscribe-ai-resume-analyzer` |
| **Full GitHub URL** | `https://github.com/nithin-2707/atscribe-ai-resume-analyzer` |
| **Railway** | `https://railway.app` |
| **Backend Root Dir** | `backend` |
| **Frontend Root Dir** | `frontend` |
| **Backend Start** | `node server.js` |
| **Frontend Start** | `npx serve -s build -l $PORT` |

---

## 🎉 After Deployment

Update your:
- ✅ GitHub README with live demo link
- ✅ Portfolio website
- ✅ Resume/CV
- ✅ LinkedIn profile

Example:
```markdown
🔗 Live Demo: https://your-app.up.railway.app
📂 GitHub: https://github.com/nithin-2707/atscribe-ai-resume-analyzer
```

---

## 📞 Need Help?

1. Check Railway deployment logs
2. Review browser console (F12)
3. Verify all environment variables
4. Test backend health endpoint
5. Check MongoDB Atlas connection

Full guide: [`DEPLOYMENT.md`](./DEPLOYMENT.md)

---

**Good luck with your deployment! 🚀**
