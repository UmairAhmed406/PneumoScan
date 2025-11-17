# Local Testing Guide

Complete guide to test PneumoScan locally before deployment.

---

## Prerequisites

✅ Python 3.12+ (You have: 3.12.10)
⏳ Node.js 18+ (Installing...)
⏳ npm (comes with Node.js)

---

## Step-by-Step Setup

### Part 1: Backend Setup (FastAPI)

```bash
# 1. Navigate to backend directory
cd "D:\My Projects\PneumoScan\backend"

# 2. Create virtual environment (recommended)
python -m venv venv

# 3. Activate virtual environment
# Windows:
venv\Scripts\activate

# You should see (venv) in your prompt

# 4. Install dependencies
pip install -r requirements.txt

# This will install:
# - FastAPI
# - Uvicorn
# - TensorFlow
# - and all other dependencies
# (Takes 2-5 minutes depending on your internet)

# 5. Create .env file
copy .env.example .env

# 6. Start the backend server
python app.py

# ✅ Backend should start on: http://localhost:8000
# ✅ API Docs available at: http://localhost:8000/docs
```

**Expected Output:**
```
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Test Backend:**
- Open browser: http://localhost:8000
- Visit API docs: http://localhost:8000/docs
- Try health check: http://localhost:8000/health

---

### Part 2: Frontend Setup (React)

**Open a NEW terminal** (keep backend running)

```bash
# 1. Navigate to frontend directory
cd "D:\My Projects\PneumoScan\frontend"

# 2. Install dependencies
npm install

# This will install all React dependencies
# (Takes 1-3 minutes)

# 3. Create .env file
copy .env.example .env

# 4. Start the development server
npm run dev

# ✅ Frontend should start on: http://localhost:3000
```

**Expected Output:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**Test Frontend:**
- Open browser: http://localhost:3000
- You should see the PneumoScan landing page!

---

## Testing the Full Application

### 1. Test the Landing Page
- Navigate to http://localhost:3000
- You should see:
  - Hero section
  - Features (89.67% Accuracy, Deep Learning, Open Source)
  - Stats section

### 2. Test Image Analysis
- Click "Try Demo" or navigate to http://localhost:3000/analyze
- Drag and drop a chest X-ray image (or click to browse)
- Watch the analysis happen in real-time
- See the prediction result with confidence score

**Note:** You'll need a chest X-ray image to test. If you don't have one:
- Search "chest xray normal" or "chest xray pneumonia" on Google Images
- Download any X-ray image
- Use it to test the upload

### 3. Test API Documentation
- Visit http://localhost:8000/docs
- Click on `/api/predict` endpoint
- Click "Try it out"
- Upload an X-ray image directly in the API docs
- See the JSON response

---

## Troubleshooting

### Backend Issues

**Problem: "Model file not found"**
```
Solution: Make sure the model file exists at:
D:\My Projects\PneumoScan\model\final_model.keras

If it's in a different location, update MODEL_PATH in .env
```

**Problem: "Port 8000 already in use"**
```bash
Solution: Change port in .env file:
PORT=8001

Or kill the process using port 8000
```

**Problem: "ModuleNotFoundError"**
```bash
Solution: Make sure virtual environment is activated
venv\Scripts\activate

Then reinstall dependencies:
pip install -r requirements.txt
```

### Frontend Issues

**Problem: "npm: command not found"**
```
Solution: Restart your terminal after installing Node.js
Or close and reopen VSCode/terminal
```

**Problem: "Port 3000 already in use"**
```
Solution: Vite will automatically try port 3001, 3002, etc.
Or manually specify: npm run dev -- --port 3001
```

**Problem: "Cannot connect to backend"**
```
Solution: Make sure backend is running on port 8000
Check .env file: VITE_API_URL=http://localhost:8000
```

**Problem: "Module not found" errors**
```bash
Solution: Delete node_modules and reinstall
rm -rf node_modules
npm install
```

---

## What You Should See

### Backend (http://localhost:8000)
```json
{
  "name": "PneumoScan API",
  "version": "2.0.0",
  "description": "AI-powered pneumonia detection from chest X-rays",
  "disclaimer": "For educational and research purposes only. NOT for clinical use.",
  "endpoints": {
    "health": "/health",
    "predict": "/api/predict (POST)",
    "model_info": "/api/model/info",
    "docs": "/docs",
    "redoc": "/redoc"
  }
}
```

### Frontend (http://localhost:3000)
- Beautiful landing page with blue theme
- Navigation: Home, Analyze, Research, About
- Hero section: "AI-Powered Pneumonia Detection"
- Three feature cards
- Stats section with metrics
- Footer with medical disclaimer

---

## Quick Commands Reference

### Backend
```bash
cd backend
venv\Scripts\activate          # Activate venv
python app.py                  # Start server
deactivate                     # Deactivate venv
```

### Frontend
```bash
cd frontend
npm install                    # Install dependencies
npm run dev                    # Start dev server
npm run build                  # Build for production
```

---

## Next Steps After Testing

Once everything works locally:

1. ✅ Commit changes to Git
2. ✅ Push to GitHub
3. ✅ Deploy frontend to Vercel
4. ✅ Deploy backend to Render/Railway
5. ✅ Connect production URLs
6. ✅ Test live deployment

---

## Need Help?

If you encounter any issues:
1. Check the terminal output for error messages
2. Look at browser console (F12) for frontend errors
3. Check backend logs for API errors
4. Make sure both servers are running
5. Verify .env files are created

**Common first-time issues:**
- Forgot to activate virtual environment
- Backend not running when testing frontend
- Wrong API URL in frontend .env
- Missing model file

---

**Happy Testing! 🚀**
