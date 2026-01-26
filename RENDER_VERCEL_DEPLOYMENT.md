# 🚀 ATScribe Deployment Guide - Render + Vercel

## Free Forever Deployment Setup

This guide will help you deploy ATScribe on **Render (Backend)** and **Vercel (Frontend)** - both 100% free!

---

## 📋 Prerequisites

Before you begin, ensure you have:
- ✅ GitHub account
- ✅ MongoDB Atlas account (free tier) - [Sign up here](https://www.mongodb.com/cloud/atlas/register)
- ✅ Groq API Key - [Get free key here](https://console.groq.com/)
- ✅ Code pushed to GitHub repository

---

## 🗂️ Files Status Check

### ✅ Your repository is clean!

**Files in GitHub:**
- README.md
- backend/ (all files)
- frontend/ (all files)
- .gitignore

**Files removed from deployment:**
- ❌ railway.json (deleted)
- ❌ deploy-to-railway.ps1 (deleted)

**Local-only files (not in GitHub):**
- DEPLOY_NOW.md
- DEPLOYMENT.md
- PROJECT_OVERVIEW.md
- QUICKSTART.md
- README_DEPLOY.md

---

## 📦 Step 1: Push Updated Code to GitHub

```powershell
# Check current status
git status

# Add all changes (Railway files removed, new Render/Vercel configs added)
git add .

# Commit changes
git commit -m "feat: migrate from Railway to Render + Vercel deployment"

# Push to GitHub
git push origin main
```

---

## 🗄️ Step 2: Setup MongoDB Atlas (Database)

### 2.1 Create Free Cluster
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up / Log in
3. Create a **FREE M0 cluster** (512MB storage)
4. Choose a cloud provider (AWS recommended)
5. Select region closest to you

### 2.2 Setup Database Access
1. Click **Database Access** (left sidebar)
2. Click **Add New Database User**
   - Username: `atscribe-admin`
   - Password: Generate a strong password (SAVE THIS!)
   - Role: **Atlas admin**
3. Click **Add User**

### 2.3 Setup Network Access
1. Click **Network Access** (left sidebar)
2. Click **Add IP Address**
3. Select **Allow Access from Anywhere** (0.0.0.0/0)
   - ⚠️ This is safe for free-tier deployments
4. Click **Confirm**

### 2.4 Get Connection String
1. Click **Database** (left sidebar)
2. Click **Connect** on your cluster
3. Choose **Connect your application**
4. Copy the connection string:
   ```
   mongodb+srv://atscribe-admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **Replace `<password>`** with your actual password
6. Add database name: Change `/?retryWrites` to `/atscribe?retryWrites`
   
   **Final string should look like:**
   ```
   mongodb+srv://atscribe-admin:YourPassword123@cluster0.xxxxx.mongodb.net/atscribe?retryWrites=true&w=majority
   ```

---

## 🔧 Step 3: Deploy Backend on Render

### 3.1 Create Render Account
1. Go to [Render.com](https://render.com/)
2. Sign up with **GitHub** (easiest)
3. Grant Render access to your repositories

### 3.2 Create Web Service
1. Click **New +** → **Web Service**
2. Connect your repository: `atscribe-ai-resume-analyzer`
3. Configure the service:

   **Basic Info:**
   - Name: `atscribe-backend`
   - Region: Choose closest to you
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Node`

   **Build & Deploy:**
   - Build Command: `npm install`
   - Start Command: `npm start`

   **Instance Type:**
   - Select: **Free** (0$/month)
   - ⚠️ Note: Free tier sleeps after 15 min inactivity

### 3.3 Add Environment Variables
Click **Advanced** → **Add Environment Variable**

Add these **4 variables**:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | Your MongoDB Atlas connection string from Step 2.4 |
| `GROQ_API_KEY` | Your Groq API key |

### 3.4 Deploy
1. Click **Create Web Service**
2. Wait 3-5 minutes for deployment
3. Once deployed, you'll get a URL like:
   ```
   https://atscribe-backend.onrender.com
   ```
4. **SAVE THIS URL** - you'll need it for frontend!

### 3.5 Test Backend
Visit: `https://atscribe-backend.onrender.com/api/health`

You should see:
```json
{"status":"OK","message":"ATScribe API is running"}
```

---

## 🎨 Step 4: Deploy Frontend on Vercel

### 4.1 Create Vercel Account
1. Go to [Vercel.com](https://vercel.com/)
2. Sign up with **GitHub** (recommended)
3. Grant Vercel access to your repositories

### 4.2 Import Project
1. Click **Add New** → **Project**
2. Select `atscribe-ai-resume-analyzer` repository
3. Configure:

   **Project Settings:**
   - Framework Preset: `Create React App`
   - Root Directory: `frontend`
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `build` (auto-detected)

### 4.3 Add Environment Variables
Click **Environment Variables** and add:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://atscribe-backend.onrender.com/api` |

⚠️ **IMPORTANT:** Replace with YOUR actual Render backend URL from Step 3.4!

### 4.4 Deploy
1. Click **Deploy**
2. Wait 2-3 minutes
3. You'll get a URL like:
   ```
   https://atscribe-frontend.vercel.app
   ```

---

## 🔄 Step 5: Configure Backend CORS

After getting your Vercel URL, update backend environment variables:

1. Go to Render Dashboard → Your Backend Service
2. Click **Environment** (left sidebar)
3. Add new environment variable:
   
   | Key | Value |
   |-----|-------|
   | `FRONTEND_URL` | Your Vercel URL (e.g., `https://atscribe-frontend.vercel.app`) |

4. Click **Save Changes**
5. Backend will automatically redeploy (takes 2-3 min)

---

## ✅ Step 6: Verify Deployment

### Test Frontend
1. Visit your Vercel URL
2. You should see the ATScribe landing page
3. Try uploading a resume

### Test API Connection
1. Open browser DevTools (F12)
2. Go to Console tab
3. Try analyzing a resume
4. Check Network tab - API calls should go to your Render backend

### Common Issues & Fixes

**🔴 Frontend loads but can't connect to API:**
- Check `REACT_APP_API_URL` in Vercel env vars
- Make sure it includes `/api` at the end
- Redeploy frontend after changing env vars

**🔴 Backend shows CORS error:**
- Add `FRONTEND_URL` to Render env vars
- Make sure it matches your Vercel URL exactly
- Wait for automatic redeployment

**🔴 MongoDB connection error:**
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify connection string has correct password
- Make sure database name is `/atscribe`

**🔴 Backend takes 50 seconds to respond (first request):**
- This is normal! Render free tier "cold starts"
- Subsequent requests will be fast (< 1 sec)

---

## 🔄 Future Updates

### Update Frontend:
```powershell
# Make changes to frontend code
git add .
git commit -m "update: your changes"
git push origin main
# Vercel auto-deploys! ✨
```

### Update Backend:
```powershell
# Make changes to backend code
git add .
git commit -m "update: your changes"
git push origin main
# Render auto-deploys! ✨
```

Both platforms have **automatic deployments** enabled by default!

---

## 💰 Cost Breakdown

| Service | Plan | Cost | Limitations |
|---------|------|------|-------------|
| **MongoDB Atlas** | M0 Free | $0/forever | 512MB storage, shared CPU |
| **Render Backend** | Free | $0/forever | 750 hrs/month, sleeps after 15min |
| **Vercel Frontend** | Hobby | $0/forever | 100GB bandwidth/month |
| **Groq API** | Free | $0/forever | Rate limits apply |

**Total: $0.00/month** 🎉

---

## 🎯 Your Deployment URLs

Once deployed, update these:

**Frontend:** `https://your-app.vercel.app`  
**Backend:** `https://your-backend.onrender.com`  
**Health Check:** `https://your-backend.onrender.com/api/health`

---

## 📞 Support

If you encounter issues:
1. Check Render/Vercel deployment logs
2. Check browser console for errors
3. Verify all environment variables are set correctly
4. Test backend health endpoint directly

---

## 🎉 Success!

Your ATScribe application is now deployed and **FREE FOREVER**! 

**Next Steps:**
- Share your Vercel URL with friends/recruiters
- Add custom domain (optional, free on Vercel)
- Monitor usage on Render/Vercel dashboards

Happy deploying! 🚀
