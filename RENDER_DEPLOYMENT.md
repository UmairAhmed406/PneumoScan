# Deploying PneumoScan Backend to Render

This guide walks you through deploying the FastAPI backend to Render.com.

## Prerequisites

- GitHub repository with all code pushed (✓ Already done)
- Render.com account (Free tier available)
- Model file `final_model.keras` ready to upload

## Step 1: Create Render Account

1. Go to https://render.com/
2. Sign up using your GitHub account (UmairAhmed406)
3. Verify your email if prompted

## Step 2: Deploy from GitHub

### Option A: Using render.yaml (Recommended)

1. From your Render dashboard, click **New +** → **Blueprint**
2. Connect your GitHub repository: `UmairAhmed406/PneumoScan`
3. Render will automatically detect `render.yaml`
4. Click **Apply** to create the service
5. The service will start building automatically

### Option B: Manual Web Service Setup

1. From your Render dashboard, click **New +** → **Web Service**
2. Connect your GitHub repository: `UmairAhmed406/PneumoScan`
3. Configure the service:
   - **Name**: `pneumoscan-api`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r backend/requirements.txt`
   - **Start Command**: `cd backend && uvicorn app:app --host 0.0.0.0 --port $PORT`
4. Add Environment Variables (see below)
5. Select **Free** plan
6. Click **Create Web Service**

## Step 3: Configure Environment Variables

After creating the service, add these environment variables:

| Key | Value | Notes |
|-----|-------|-------|
| `PYTHON_VERSION` | `3.12.0` | Required by Render |
| `MODEL_PATH` | `model/final_model.keras` | Where to save/load model |
| `MODEL_URL` | (see Step 4) | URL to download model from (optional but recommended) |
| `PORT` | `8000` | API server port |
| `HOST` | `0.0.0.0` | Listen on all interfaces |
| `ALLOWED_ORIGINS` | `https://pneumo-scan.vercel.app` | Your Vercel frontend URL |

**Important:** Don't add `MODEL_URL` yet - you'll add it in Step 4 after uploading your model to a hosting service.

## Step 4: Upload Model File

Since the model file is too large for Git, you have two options:

### Method 1: Automatic Download from URL (Recommended - Easiest!)

The backend now supports automatic model downloading! Just provide a URL to your model:

**Step 4.1: Upload model to a hosting service**

Choose one:

**Option A: Google Drive (Free, Easy)**
1. Upload `final_model.keras` to Google Drive
2. Right-click → Share → Anyone with the link can view
3. Copy the file ID from the share link:
   - Share link format: `https://drive.google.com/file/d/FILE_ID_HERE/view`
   - Example FILE_ID: `1a2b3c4d5e6f7g8h9i0j`
4. Add to Render environment variables:
   - **Key**: `MODEL_URL`
   - **Value**: `https://drive.google.com/uc?export=download&id=YOUR_FILE_ID`

**Option B: Hugging Face (Free, Professional)**
1. Create account at https://huggingface.co/
2. Create a new model repository
3. Upload `final_model.keras` to the repository
4. Add to Render environment variables:
   - **Key**: `MODEL_URL`
   - **Value**: `https://huggingface.co/username/repo-name/resolve/main/final_model.keras`

**Option C: Any Direct URL**
If you have the model hosted anywhere with a direct download link:
- **Key**: `MODEL_URL`
- **Value**: Your direct URL

**Benefits:**
- ✓ Automatic download on first startup
- ✓ No manual file transfer needed
- ✓ Easy to update (just change URL)
- ✓ Works with Render's free tier

### Method 2: Manual Upload via Render Shell

If you prefer to upload directly to Render:

1. Wait for initial deployment to complete (it will fail due to missing model - this is expected)
2. Go to your service's **Shell** tab
3. Create the model directory:
   ```bash
   mkdir -p model
   cd model
   ```
4. Upload using `curl` (if you have a temporary URL):
   ```bash
   curl -L "YOUR_DOWNLOAD_URL" -o final_model.keras
   ```
5. Restart the service from the Render dashboard

**Note:** Uploaded files may be lost when the service restarts. For persistence, use Method 1 or add a persistent disk.

## Step 5: Verify Deployment

1. Once deployment completes, Render will provide a URL like:
   `https://pneumoscan-api.onrender.com`

2. Test the health endpoint:
   ```bash
   curl https://pneumoscan-api.onrender.com/health
   ```

3. Expected response:
   ```json
   {
     "status": "healthy",
     "model_loaded": true,
     "version": "2.0.0"
   }
   ```

## Step 6: Connect Frontend to Backend

1. In your Vercel project settings, add/update environment variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://pneumoscan-api.onrender.com` (use your actual Render URL)

2. Redeploy the frontend on Vercel to pick up the new environment variable

## Troubleshooting

### Build Fails
- Check the build logs in Render dashboard
- Verify `backend/requirements.txt` has correct dependencies
- Ensure Python version is compatible (3.12.0)

### Model Not Found Error
- Verify model file is uploaded to correct path: `model/final_model.keras`
- Check `MODEL_PATH` environment variable is set correctly
- View logs: Model loading errors will show in startup logs

### CORS Errors
- Ensure `ALLOWED_ORIGINS` includes your Vercel frontend URL
- Check both `https://` and without trailing slash

### Service is Slow to Start
- Render free tier services sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- Consider upgrading to paid tier for always-on service

## Next Steps

After successful deployment:

1. ✓ Test the `/health` endpoint
2. ✓ Upload a test X-ray image from the frontend
3. ✓ Verify predictions are working correctly
4. ✓ Monitor logs for any errors
5. Consider setting up continuous deployment (auto-deploys on git push)

## Cost Considerations

**Free Tier Includes:**
- 750 hours/month of running time
- Automatic HTTPS
- 1 GB persistent disk
- Service sleeps after 15 min of inactivity

**Note**: The free tier should be sufficient for development and light usage. For production with high traffic, consider upgrading to a paid plan.

## Support

If you encounter issues:
- Check Render's status page: https://status.render.com/
- Review Render docs: https://render.com/docs
- Check backend logs in Render dashboard

---

Generated for PneumoScan deployment
