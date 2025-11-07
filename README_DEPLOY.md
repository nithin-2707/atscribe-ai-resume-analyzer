# ⚡ Quick Deployment Guide

## 🎯 Repository Name

**GitHub Repo**: `atscribe-ai-resume-analyzer`

**Full URL**: `https://github.com/nithin-2707/atscribe-ai-resume-analyzer`

---

## 🚀 Quick Deploy Steps

### 1️⃣ Create GitHub Repository

```bash
# On GitHub:
1. Go to https://github.com/nithin-2707
2. Click "New repository"
3. Name: atscribe-ai-resume-analyzer
4. Description: AI-Powered Dual-Mode Resume Analysis & Recruitment Platform
5. Public repository
6. Don't initialize with README (we have one)
7. Click "Create repository"
```

### 2️⃣ Push to GitHub

```powershell
# In PowerShell (from your project directory):
cd C:\Users\NITHIN\OneDrive\Documents\capstone

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: ATScribe ready for deployment"

# Add remote
git remote add origin https://github.com/nithin-2707/atscribe-ai-resume-analyzer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3️⃣ Deploy on Railway

```bash
# Option A: Railway Website (Easiest)
1. Go to https://railway.app
2. Click "Login" → "Login with GitHub"
3. Click "New Project" → "Deploy from GitHub repo"
4. Select: atscribe-ai-resume-analyzer
5. Railway detects Node.js automatically
6. Follow detailed steps in DEPLOYMENT.md

# Option B: Railway CLI
npm install -g @railway/cli
railway login
railway init
railway up
```

---

## 📋 Environment Variables Needed

### Backend Service

```env
PORT=5000
NODE_ENV=production
GEMINI_API_KEY=AIzaSyDbRqUjFV5WlNEywLrWfJwVpSq7jrpSX-I
MONGODB_URI=mongodb+srv://preethamdandibhotla_db_user:Preetham172004@cluster0.8gfbrdx.mongodb.net/atscribe?retryWrites=true&w=majority
```

### Frontend Service

```env
REACT_APP_API_URL=https://[YOUR-BACKEND-URL].railway.app/api
```

---

## ✅ Deployment Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Railway account created
- [ ] Backend service deployed
- [ ] Frontend service deployed
- [ ] Environment variables set
- [ ] Backend health check passing
- [ ] Frontend loads in browser
- [ ] Analysis feature works
- [ ] Chat feature works
- [ ] Recruiter mode works

---

## 🎯 Expected Deployment Time

- GitHub push: **2 minutes**
- Railway backend deploy: **3-5 minutes**
- Railway frontend deploy: **5-7 minutes**

**Total**: ~10-15 minutes

---

## 🌐 Your Live URLs

After deployment, you'll have:

**Frontend**: `https://atscribe-ai-resume-analyzer-frontend.up.railway.app`  
**Backend**: `https://atscribe-ai-resume-analyzer-backend.up.railway.app`

---

## 📞 Need Help?

See full guide: [`DEPLOYMENT.md`](./DEPLOYMENT.md)

---

**Repository**: https://github.com/nithin-2707/atscribe-ai-resume-analyzer  
**Author**: Nithin (@nithin-2707)
