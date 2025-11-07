# 🚀 Railway Deployment Guide - ATScribe

Complete step-by-step guide to deploy ATScribe on Railway.

---

## 📋 Prerequisites

- [x] GitHub account: https://github.com/nithin-2707
- [x] Railway account (sign up with GitHub): https://railway.app
- [x] Google Gemini API Key
- [x] Project pushed to GitHub

---

## 🎯 Deployment Steps

### Step 1: Push to GitHub

```bash
# Navigate to project
cd C:\Users\NITHIN\OneDrive\Documents\capstone

# Initialize Git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ATScribe deployment ready"

# Add GitHub remote (replace with your repo URL)
git remote add origin https://github.com/nithin-2707/atscribe-ai-resume-analyzer.git

# Push to GitHub
git push -u origin main
```

If you get an error about branch name, use:
```bash
git branch -M main
git push -u origin main
```

---

### Step 2: Create Railway Account

1. Go to https://railway.app
2. Click **"Start a New Project"** or **"Login with GitHub"**
3. Authorize Railway to access your GitHub account
4. Grant access to your repositories

---

### Step 3: Deploy Backend on Railway

#### 3.1 Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Search for **"atscribe-ai-resume-analyzer"**
4. Click on your repository

#### 3.2 Configure Backend Service

1. Railway will detect Node.js automatically
2. Click **"Add variables"** or go to **Variables** tab
3. Add the following environment variables:

```env
PORT=5000
NODE_ENV=production
GEMINI_API_KEY=your_actual_gemini_api_key_here
MONGODB_URI=mongodb+srv://preethamdandibhotla_db_user:Preetham172004@cluster0.8gfbrdx.mongodb.net/atscribe?retryWrites=true&w=majority
```

#### 3.3 Set Root Directory

1. Go to **Settings** tab
2. Find **"Root Directory"**
3. Set to: `backend`
4. Click **"Save"**

#### 3.4 Set Start Command

1. In **Settings** tab
2. Find **"Start Command"**
3. Set to: `node server.js`
4. Click **"Save"**

#### 3.5 Deploy Backend

1. Click **"Deploy"** button
2. Wait for build to complete (2-3 minutes)
3. Once deployed, you'll see a URL like: `https://backend-production-xxxx.up.railway.app`
4. **COPY THIS URL** - you'll need it for frontend!

#### 3.6 Test Backend

Open the backend URL in browser:
```
https://your-backend-url.railway.app/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "ATScribe API is running"
}
```

---

### Step 4: Deploy Frontend on Railway

#### 4.1 Create New Service

1. In the same Railway project, click **"New"**
2. Select **"GitHub Repo"**
3. Select the same repository: **"atscribe-ai-resume-analyzer"**

#### 4.2 Configure Frontend Service

1. Go to **Settings** tab
2. Set **"Root Directory"** to: `frontend`
3. Set **"Build Command"** to: `npm run build`
4. Set **"Start Command"** to: `npx serve -s build -l $PORT`

#### 4.3 Add Frontend Environment Variables

1. Go to **Variables** tab
2. Add:

```env
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

⚠️ **IMPORTANT**: Replace `your-backend-url` with the actual backend URL from Step 3.5!

#### 4.4 Deploy Frontend

1. Click **"Deploy"**
2. Wait for build to complete (3-5 minutes)
3. You'll get a frontend URL like: `https://frontend-production-xxxx.up.railway.app`

---

### Step 5: Update Backend CORS

Your backend needs to allow requests from the frontend domain.

1. Go to backend service in Railway
2. Add environment variable:

```env
FRONTEND_URL=https://your-frontend-url.railway.app
```

3. Update `backend/server.js` (already configured for this):

```javascript
// CORS will automatically allow your frontend domain
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
```

4. Redeploy backend (Railway auto-redeploys on variable change)

---

### Step 6: Test Your Deployment

1. **Frontend URL**: `https://your-frontend-url.railway.app`
2. **Backend URL**: `https://your-backend-url.railway.app`

#### Test Checklist:

- [ ] Landing page loads
- [ ] Can switch to Student mode
- [ ] Can upload resume
- [ ] Can enter job description
- [ ] Analysis works (gets AI results)
- [ ] Chat with resume works
- [ ] Can switch to Recruiter mode
- [ ] Can upload multiple resumes
- [ ] Ranking works

---

## 🔧 Troubleshooting

### Issue 1: "Cannot connect to backend"

**Solution**: Check frontend environment variable
```env
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```
Make sure `/api` is at the end!

### Issue 2: "AI Analysis fails"

**Solution**: Check Gemini API key in backend variables
```env
GEMINI_API_KEY=your_actual_key
```

### Issue 3: "MongoDB connection error"

**Solution**: 
1. Check MongoDB URI is correct
2. Verify MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
3. Check database username/password

### Issue 4: "Build fails on Railway"

**Solution**: Check Railway logs
1. Go to service in Railway
2. Click **"Deployments"**
3. Click on failed deployment
4. Check **"Build Logs"** and **"Deploy Logs"**

### Issue 5: "Frontend shows blank page"

**Solution**: 
1. Check browser console for errors
2. Verify `REACT_APP_API_URL` has correct backend URL
3. Redeploy frontend after fixing variable

---

## 📊 Monitoring Your App

### Railway Dashboard

1. **Metrics**: View CPU, Memory, Network usage
2. **Logs**: Real-time logs for debugging
3. **Deployments**: See deployment history
4. **Variables**: Manage environment variables

### Check Logs

```bash
# Backend logs
Click on Backend service → Logs tab

# Frontend logs  
Click on Frontend service → Logs tab
```

---

## 💰 Railway Usage & Costs

### Free Tier

- **$5 credits per month** (free)
- Enough for:
  - ~500-1000 requests/month
  - Perfect for portfolio/testing
  - No cold starts

### Monitor Usage

1. Go to Railway dashboard
2. Click **"Usage"**
3. View credit consumption
4. Set up usage alerts

---

## 🔄 Update Your Deployed App

When you make changes:

```bash
# Make your changes
# ...

# Commit changes
git add .
git commit -m "Your update message"

# Push to GitHub
git push origin main
```

**Railway automatically redeploys!** 🎉

---

## 🎨 Custom Domain (Optional)

### Add Custom Domain

1. Go to Frontend service in Railway
2. Click **"Settings"**
3. Find **"Domains"** section
4. Click **"Custom Domain"**
5. Add your domain (e.g., `atscribe.yourdomain.com`)
6. Update DNS records as shown

---

## 📱 Environment Variables Reference

### Backend Variables

```env
# Required
PORT=5000
NODE_ENV=production
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string

# Optional
FRONTEND_URL=https://your-frontend-url.railway.app
```

### Frontend Variables

```env
# Required
REACT_APP_API_URL=https://your-backend-url.railway.app/api
```

---

## ✅ Post-Deployment Checklist

- [ ] Backend deployed and shows health check
- [ ] Frontend deployed and loads
- [ ] Backend URL added to frontend env
- [ ] Frontend URL added to backend CORS
- [ ] MongoDB connection working
- [ ] Gemini AI responding
- [ ] All features tested
- [ ] No console errors
- [ ] Mobile responsive working
- [ ] Share URLs with others to test

---

## 🚀 Your Deployed URLs

After deployment, update these:

**Frontend**: `https://your-frontend-production-xxxx.up.railway.app`  
**Backend**: `https://your-backend-production-xxxx.up.railway.app`

Add these to your:
- GitHub README
- Portfolio website
- Resume/CV
- LinkedIn profile

---

## 🎓 Success!

Your ATScribe app is now live! 🎉

Share your project:
- GitHub: https://github.com/nithin-2707/atscribe-ai-resume-analyzer
- Live Demo: [Your Railway URL]

---

## 📞 Support

If you face issues:

1. Check Railway logs
2. Verify environment variables
3. Test API endpoints with Postman
4. Check browser console errors
5. Review MongoDB Atlas connection

---

**Happy Deploying! 🚀**
