# PneumoScan Deployment - Quick Start Guide

## ✅ Completed

1. ✓ Frontend deployed to Vercel
2. ✓ Backend API refactored with FastAPI
3. ✓ Automatic model downloading feature added
4. ✓ Deployment configurations ready (render.yaml)
5. ✓ All code pushed to GitHub

## 🚀 Next Steps (What You Need to Do)

### Step 1: Upload Your Model (5 minutes)

Choose **ONE** option:

#### Option A: Google Drive (Easiest)
1. Go to https://drive.google.com/
2. Click **New** → **File upload**
3. Upload your `final_model.keras` file
4. Right-click the uploaded file → **Share**
5. Set to "Anyone with the link can view"
6. Copy the sharing link (it looks like: `https://drive.google.com/file/d/FILE_ID_HERE/view`)
7. **Save just the FILE_ID part** - you'll need it for Step 3

#### Option B: Hugging Face (Professional)
1. Go to https://huggingface.co/ and sign up/login
2. Click your profile → **New Model**
3. Name it `pneumoscan-model` (or any name you like)
4. Upload `final_model.keras` to the repository
5. Copy the repository name (format: `your-username/pneumoscan-model`)
6. **Save this** - you'll need it for Step 3

### Step 2: Create Render Account (2 minutes)

1. Go to https://render.com/
2. Click **Get Started for Free**
3. Sign up with your GitHub account (UmairAhmed406)
4. Verify your email if prompted

### Step 3: Deploy Backend to Render (10 minutes)

1. From Render dashboard, click **New +** → **Blueprint**
2. Click **Connect account** to connect GitHub
3. Select your repository: `UmairAhmed406/PneumoScan`
4. Render will detect `render.yaml` automatically
5. Before clicking Apply, go to the service settings and add environment variables:

   **Add these environment variables:**
   - `PYTHON_VERSION`: `3.12.0`
   - `MODEL_PATH`: `model/final_model.keras`
   - `PORT`: `8000`
   - `HOST`: `0.0.0.0`
   - `ALLOWED_ORIGINS`: `https://pneumo-scan.vercel.app`
   - `MODEL_URL`: **(Choose based on your Step 1 choice)**
     - **If Google Drive:** `https://drive.google.com/uc?export=download&id=YOUR_FILE_ID`
       (Replace YOUR_FILE_ID with the ID you copied in Step 1)
     - **If Hugging Face:** `https://huggingface.co/your-username/pneumoscan-model/resolve/main/final_model.keras`
       (Replace your-username/pneumoscan-model with your repo name)

6. Click **Apply** to create and deploy the service
7. Wait 5-10 minutes for deployment to complete

### Step 4: Get Your Backend URL (1 minute)

1. Once deployment succeeds, copy your Render URL
   - It will look like: `https://pneumoscan-api.onrender.com`
   - Find it at the top of your service dashboard

2. Test it by visiting in your browser:
   ```
   https://your-render-url.onrender.com/health
   ```

   You should see:
   ```json
   {
     "status": "healthy",
     "model_loaded": true,
     "model_path": "model/final_model.keras"
   }
   ```

### Step 5: Connect Frontend to Backend (5 minutes)

1. Go to https://vercel.com/dashboard
2. Click on your `pneumo-scan` project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your Render URL (e.g., `https://pneumoscan-api.onrender.com`)
   - **Environment**: All (Production, Preview, Development)
5. Click **Save**
6. Go to **Deployments** tab
7. Click the **•••** menu on the latest deployment → **Redeploy**
8. Wait 2-3 minutes for redeployment

### Step 6: Test Your Full Stack App! (2 minutes)

1. Visit your frontend: https://pneumo-scan.vercel.app
2. Click **Analyze** in the navigation
3. Upload a chest X-ray image (PNG, JPG, or JPEG)
4. See the prediction result!

## 📊 Expected Timeline

- Step 1 (Model Upload): **5 minutes**
- Step 2 (Render Account): **2 minutes**
- Step 3 (Deploy Backend): **10 minutes** (mostly waiting for build)
- Step 4 (Get URL): **1 minute**
- Step 5 (Connect Frontend): **5 minutes** (mostly waiting for redeploy)
- Step 6 (Test): **2 minutes**

**Total: ~25 minutes** (including waiting times)

## 🆘 Troubleshooting

### If Render deployment fails:
- Check the logs in Render dashboard
- Verify all environment variables are set correctly
- Ensure MODEL_URL is accessible (try opening it in your browser)

### If frontend can't connect to backend:
- Verify VITE_API_URL is set in Vercel
- Check ALLOWED_ORIGINS in Render matches your Vercel URL
- Try redeploying both frontend and backend

### If model fails to load:
- Check Render logs for download errors
- Verify your Google Drive link is public
- Try downloading the MODEL_URL in your browser to test

## 📝 Important Notes

1. **Render Free Tier Limitations:**
   - Service sleeps after 15 minutes of inactivity
   - First request after sleep takes 30-60 seconds to wake up
   - 750 hours/month of running time (sufficient for development)

2. **Model File:**
   - Render will download it automatically on first startup
   - Takes about 1-2 minutes depending on model size
   - Watch the deployment logs to see progress

3. **Future Updates:**
   - Just push to GitHub main branch
   - Render auto-deploys on every push (if enabled)
   - Vercel auto-deploys on every push

## 🎉 You're All Set!

Once everything is deployed:
- Frontend URL: https://pneumo-scan.vercel.app
- Backend API: https://your-render-url.onrender.com
- API Docs: https://your-render-url.onrender.com/docs

Share your deployed app with the world! 🌍

---

**Need help?** Check the full deployment guide in `RENDER_DEPLOYMENT.md` or ask for assistance.
