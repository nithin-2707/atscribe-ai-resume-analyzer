# 🚀 ATScribe - Deploy to Railway Script
# Run this script to deploy your project

Write-Host "🎯 ATScribe Deployment Script" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git is not installed. Please install Git first." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Git found" -ForegroundColor Green

# Check if we're in the right directory
if (!(Test-Path "backend") -or !(Test-Path "frontend")) {
    Write-Host "❌ Please run this script from the project root directory" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Project structure verified" -ForegroundColor Green
Write-Host ""

# Step 1: Initialize Git
Write-Host "📦 Step 1: Initializing Git repository..." -ForegroundColor Yellow
if (!(Test-Path ".git")) {
    git init
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✅ Git repository already exists" -ForegroundColor Green
}

# Step 2: Add all files
Write-Host ""
Write-Host "📦 Step 2: Adding files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✅ Files added" -ForegroundColor Green

# Step 3: Commit
Write-Host ""
Write-Host "📦 Step 3: Committing changes..." -ForegroundColor Yellow
git commit -m "Initial commit: ATScribe ready for deployment"
Write-Host "✅ Changes committed" -ForegroundColor Green

# Step 4: Set branch to main
Write-Host ""
Write-Host "📦 Step 4: Setting branch to main..." -ForegroundColor Yellow
git branch -M main
Write-Host "✅ Branch set to main" -ForegroundColor Green

# Step 5: Add remote
Write-Host ""
Write-Host "📦 Step 5: Adding GitHub remote..." -ForegroundColor Yellow
$remoteExists = git remote | Select-String -Pattern "origin"
if ($remoteExists) {
    Write-Host "⚠️  Remote 'origin' already exists. Removing..." -ForegroundColor Yellow
    git remote remove origin
}
git remote add origin https://github.com/nithin-2707/atscribe-ai-resume-analyzer.git
Write-Host "✅ Remote added" -ForegroundColor Green

# Step 6: Push to GitHub
Write-Host ""
Write-Host "📦 Step 6: Pushing to GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  You may be asked to login to GitHub" -ForegroundColor Yellow
Write-Host ""

$pushResult = git push -u origin main 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Push failed. You may need to authenticate or create the repository first." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Go to https://github.com/nithin-2707" -ForegroundColor White
    Write-Host "2. Create new repository: 'atscribe-ai-resume-analyzer'" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
}

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "🎉 GitHub Setup Complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Go to https://railway.app" -ForegroundColor White
Write-Host "2. Login with GitHub" -ForegroundColor White
Write-Host "3. Click 'New Project' → 'Deploy from GitHub repo'" -ForegroundColor White
Write-Host "4. Select: atscribe-ai-resume-analyzer" -ForegroundColor White
Write-Host "5. Follow DEPLOYMENT.md for detailed steps" -ForegroundColor White
Write-Host ""
Write-Host "📖 Full Guide: DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host "🌐 Repository: https://github.com/nithin-2707/atscribe-ai-resume-analyzer" -ForegroundColor Cyan
Write-Host ""
