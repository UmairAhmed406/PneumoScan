# Deployment Guide

This guide covers various deployment options for PneumoScan.

---

## Table of Contents

- [Local Development](#local-development)
- [Hugging Face Spaces](#hugging-face-spaces)
- [Cloud Platforms](#cloud-platforms)
- [Docker Deployment](#docker-deployment)
- [Production Checklist](#production-checklist)

---

## Local Development

### Prerequisites

- Python 3.11 or higher
- pip
- Git

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUsername/PneumoScan.git
   cd PneumoScan
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv

   # Windows
   venv\Scripts\activate

   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r backend/requirements.txt
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env file with your settings
   ```

5. **Run the server**
   ```bash
   cd backend
   python app.py
   ```

6. **Test the API**
   ```bash
   curl http://localhost:5000/health
   ```

---

## Hugging Face Spaces

Hugging Face Spaces provides free hosting for ML models with Gradio or Streamlit interfaces.

### Option 1: Gradio Interface (Recommended for Quick Demo)

1. **Create `app.py` in project root**

```python
import gradio as gr
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np

# Load model
model = load_model("model/final_model.keras")

def predict_pneumonia(image):
    """Predict pneumonia from X-ray image."""
    # Preprocess
    img = image.resize((150, 150))
    img_array = img_to_array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Predict
    prediction = model.predict(img_array)[0][0]
    confidence = prediction if prediction > 0.5 else 1 - prediction
    label = "Pneumonia" if prediction > 0.5 else "Normal"

    return {
        label: float(confidence),
        "Pneumonia" if label == "Normal" else "Normal": float(1 - confidence)
    }

# Create interface
iface = gr.Interface(
    fn=predict_pneumonia,
    inputs=gr.Image(type="pil", label="Upload Chest X-Ray"),
    outputs=gr.Label(num_top_classes=2, label="Prediction"),
    title="PneumoScan: AI Pneumonia Detection",
    description="Upload a chest X-ray image to detect pneumonia. **For educational purposes only - NOT for clinical use.**",
    article="""
    ### Disclaimer
    This is an educational AI model with ~90% accuracy. It is NOT a medical device and should NEVER be used for actual medical diagnosis.
    Always consult qualified healthcare professionals for medical advice.

    ### About
    - Model: CNN with 89.67% test accuracy
    - Dataset: Chest X-ray images (Normal vs Pneumonia)
    - Framework: TensorFlow/Keras

    [GitHub Repository](https://github.com/YourUsername/PneumoScan)
    """,
    examples=[
        # Add paths to example images if available
    ],
    theme="soft"
)

if __name__ == "__main__":
    iface.launch()
```

2. **Create `requirements.txt` in root**
```
tensorflow==2.15.0
gradio==4.8.0
numpy==1.26.2
Pillow==10.1.0
```

3. **Push to Hugging Face**
   ```bash
   # Install Hugging Face CLI
   pip install huggingface_hub

   # Login
   huggingface-cli login

   # Create Space
   # Go to https://huggingface.co/new-space
   # Choose: Gradio, Public

   # Push code
   git remote add hf https://huggingface.co/spaces/YourUsername/PneumoScan
   git push hf main
   ```

### Option 2: Streamlit Interface

Similar process, but use Streamlit instead of Gradio.

---

## Cloud Platforms

### Render.com (Recommended for Backend)

**Free Tier Available**

1. **Create `render.yaml`**
```yaml
services:
  - type: web
    name: pneumoscan-api
    env: python
    buildCommand: pip install -r backend/requirements.txt
    startCommand: cd backend && gunicorn app:app
    envVars:
      - key: PYTHON_VERSION
        value: 3.11.0
      - key: MODEL_PATH
        value: ../model/final_model.keras
```

2. **Add to requirements.txt**
```
gunicorn==21.2.0
```

3. **Deploy**
   - Go to https://render.com
   - Connect GitHub repository
   - Render will auto-deploy

### Railway.app

1. **Create `railway.json`**
```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "cd backend && gunicorn app:app",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

2. **Deploy**
   - Go to https://railway.app
   - Connect GitHub repository
   - Set environment variables
   - Deploy

### Vercel (Frontend Only)

Best for React frontend when built.

```bash
npm install -g vercel
vercel
```

### AWS/GCP/Azure

For production deployments with more control:

1. **AWS Elastic Beanstalk**
2. **Google Cloud Run**
3. **Azure App Service**

See detailed guides in respective platform documentation.

---

## Docker Deployment

### Create Dockerfile

**backend/Dockerfile**
```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Copy model (if not using volume mount)
COPY ../model /app/model

# Expose port
EXPOSE 5000

# Environment variables
ENV MODEL_PATH=/app/model/final_model.keras
ENV PORT=5000
ENV HOST=0.0.0.0

# Run application
CMD ["python", "app.py"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
    volumes:
      - ./model:/app/model:ro
    environment:
      - MODEL_PATH=/app/model/final_model.keras
      - DEBUG=False
    restart: unless-stopped

  # Optional: Nginx reverse proxy
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - backend
    restart: unless-stopped
```

### Build and Run

```bash
# Build
docker-compose build

# Run
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## Production Checklist

Before deploying to production:

### Security

- [ ] Set `DEBUG=False` in environment
- [ ] Use HTTPS/SSL certificates
- [ ] Set strong secret keys
- [ ] Enable CORS only for specific domains
- [ ] Implement rate limiting
- [ ] Add authentication if needed
- [ ] Sanitize user inputs
- [ ] Use environment variables for secrets
- [ ] Enable security headers

### Performance

- [ ] Use production WSGI server (Gunicorn, uWSGI)
- [ ] Enable caching (Redis)
- [ ] Use CDN for static assets
- [ ] Optimize model loading
- [ ] Set up load balancing
- [ ] Configure auto-scaling

### Monitoring

- [ ] Set up error tracking (Sentry)
- [ ] Configure logging
- [ ] Add health check endpoints
- [ ] Monitor server metrics
- [ ] Set up alerts
- [ ] Track API usage

### Backup & Recovery

- [ ] Backup model files
- [ ] Backup configuration
- [ ] Document recovery procedures
- [ ] Test disaster recovery

### Legal & Compliance

- [ ] Display medical disclaimer prominently
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Cookie policy (if applicable)
- [ ] GDPR compliance (if serving EU users)
- [ ] Accessibility compliance

### Documentation

- [ ] API documentation
- [ ] Deployment documentation
- [ ] Troubleshooting guide
- [ ] Architecture diagram
- [ ] Runbook for operations

---

## Environment Variables Reference

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MODEL_PATH` | Path to Keras model | `../model/final_model.keras` | Yes |
| `HOST` | Server host | `0.0.0.0` | No |
| `PORT` | Server port | `5000` | No |
| `DEBUG` | Debug mode | `False` | No |
| `PREDICTION_THRESHOLD` | Threshold for classification | `0.5` | No |
| `MAX_CONTENT_LENGTH` | Max upload size (bytes) | `16777216` (16MB) | No |
| `ALLOWED_ORIGINS` | CORS allowed origins | `*` | No |
| `LOG_LEVEL` | Logging level | `INFO` | No |

---

## Troubleshooting

### Model not loading

**Error**: `FileNotFoundError: Model file not found`

**Solution**: Ensure `MODEL_PATH` points to correct location

```bash
# Check model exists
ls model/final_model.keras

# Set correct path in .env
MODEL_PATH=model/final_model.keras
```

### Port already in use

**Error**: `Address already in use`

**Solution**: Change port or kill existing process

```bash
# Change port
export PORT=8000

# Or kill process (Linux/Mac)
lsof -ti:5000 | xargs kill -9

# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Out of memory

**Error**: `OOM (Out of Memory)`

**Solution**: Reduce batch size, use smaller model, or increase RAM

### CORS errors

**Error**: `Access-Control-Allow-Origin`

**Solution**: Set `ALLOWED_ORIGINS` in .env

```bash
ALLOWED_ORIGINS=https://your-domain.com,https://app.your-domain.com
```

---

## Support

For deployment issues:
- Check [GitHub Issues](https://github.com/YourUsername/PneumoScan/issues)
- Read [Troubleshooting Guide](TROUBLESHOOTING.md)
- Join [Discussions](https://github.com/YourUsername/PneumoScan/discussions)

---

**Updated**: November 2024
