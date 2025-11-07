# ATScribe Quick Start Guide

## 🚀 Quick Start (Windows)

### Step 1: Install Dependencies

Open PowerShell in the project root directory and run:

```powershell
# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

### Step 2: Start MongoDB

Make sure MongoDB is running. You can:
- Start it as a Windows Service (if installed as service)
- Or run: `mongod` in a separate terminal

### Step 3: Start the Application

**Option A: Using separate terminals (Recommended)**

Terminal 1 - Backend:
```powershell
cd backend
npm run dev
```

Terminal 2 - Frontend:
```powershell
cd frontend
npm start
```

**Option B: Using a single command (if you have concurrently installed)**

From the project root:
```powershell
npm install -g concurrently
```

Then create a root package.json to run both:
```json
{
  "scripts": {
    "start": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm start\""
  }
}
```

### Step 4: Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/api/health

## ✅ Verification Checklist

- [ ] Node.js installed (v16+)
- [ ] MongoDB installed and running
- [ ] Backend .env file configured with GEMINI_API_KEY
- [ ] Frontend .env file configured
- [ ] Backend dependencies installed
- [ ] Frontend dependencies installed
- [ ] Backend server running on port 5000
- [ ] Frontend server running on port 3000

## 🔧 Troubleshooting

### MongoDB Connection Error
```powershell
# Check if MongoDB is running
Get-Service MongoDB
# Or start it manually
net start MongoDB
```

### Port Already in Use
```powershell
# Find process using port 5000
netstat -ano | findstr :5000
# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Module Not Found
```powershell
# Clear npm cache and reinstall
npm cache clean --force
cd backend
Remove-Item -Recurse -Force node_modules
npm install
cd ../frontend
Remove-Item -Recurse -Force node_modules
npm install
```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/atscribe
GEMINI_API_KEY=your_gemini_api_key_here
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🎯 First Time Setup

1. **Get Gemini API Key**
   - Visit: https://makersuite.google.com/app/apikey
   - Create a new API key
   - Add it to backend/.env

2. **Test the Setup**
   - Open http://localhost:3000
   - You should see the landing page
   - Select a role and navigate to dashboard
   - Try uploading a sample PDF resume

## 📞 Need Help?

Check the main README.md for detailed documentation and troubleshooting.
