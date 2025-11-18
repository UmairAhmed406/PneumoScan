# PneumoScan 🫁

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.12+](https://img.shields.io/badge/python-3.12+-blue.svg)](https://www.python.org/downloads/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.18-orange.svg)](https://tensorflow.org)
[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://pneumo-scan.vercel.app)

**AI-powered pneumonia detection from chest X-ray images using deep learning.**

> **⚠️ IMPORTANT MEDICAL DISCLAIMER**
> This tool is for **educational and research purposes only**. It is NOT a medical device and should NEVER be used for clinical diagnosis. Always consult qualified healthcare professionals for medical advice.

🌐 **Live Demo**: [pneumo-scan.vercel.app](https://pneumo-scan.vercel.app)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Model Performance](#model-performance)
- [Technology Stack](#technology-stack)
- [Live Deployment](#live-deployment)
- [Local Installation](#local-installation)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

PneumoScan is a production-ready web application that uses Convolutional Neural Networks (CNN) to detect pneumonia from chest X-ray images. The system achieves **89.67% accuracy** and includes intelligent image validation to ensure only valid medical images are analyzed.

### Key Highlights

- ✅ **89.67% Test Accuracy** - Reliable pneumonia detection
- ✅ **Intelligent Validation** - Rejects non-X-ray images (IDs, documents, photos)
- ✅ **Production Deployed** - Live on Vercel (frontend) and Render (backend)
- ✅ **Modern Tech Stack** - React, TypeScript, FastAPI, TensorFlow
- ✅ **Open Source** - MIT Licensed, fully documented

---

## ✨ Features

### Core Capabilities

- **🔍 Pneumonia Detection**: Binary classification (Normal vs. Pneumonia)
- **🛡️ Image Validation**: Multi-layer validation ensures only chest X-rays are analyzed
  - Grayscale detection
  - Medical histogram analysis
  - Text content detection
- **📊 Confidence Scores**: Displays prediction confidence with visual indicators
- **🎨 Modern UI**: Responsive React interface with drag-and-drop upload
- **⚡ Real-time Analysis**: Fast inference with REST API
- **🔒 Privacy-First**: Images are not stored, processed in real-time only

### User Interface Features

- Drag-and-drop file upload
- Image dimension and size validation
- Real-time analysis with loading states
- Detailed prediction results with confidence visualization
- Comprehensive error handling and user feedback
- Mobile-responsive design

---

## 📊 Model Performance

### Metrics

| Metric | Score |
|--------|-------|
| **Test Accuracy** | 89.67% |
| **Precision** | ~88% |
| **Recall** | ~92% |
| **Model Type** | CNN (Convolutional Neural Network) |
| **Framework** | TensorFlow 2.18 / Keras |

### Dataset

- **Training Images**: 5,216 chest X-rays
- **Validation Images**: 16 chest X-rays
- **Test Images**: 624 chest X-rays
- **Classes**: Binary (Normal vs. Pneumonia)
- **Input Size**: 150×150 pixels (RGB)

### Model Architecture

```
Input (150×150×3)
    ↓
Conv2D Layers (32, 64, 128 filters)
    ↓
MaxPooling & Dropout
    ↓
Dense Layers (256 units)
    ↓
Output (Sigmoid activation)
```

**Training Configuration:**
- Optimizer: Adam
- Loss Function: Binary Cross-Entropy
- Regularization: Dropout (0.2)
- Data Augmentation: Rotation, shift, zoom, flip

---

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Query** - Data fetching
- **React Router** - Navigation
- **React Dropzone** - File uploads
- **React Hot Toast** - Notifications

### Backend
- **FastAPI** - Modern Python web framework
- **TensorFlow 2.18** - Deep learning
- **Keras** - Neural network API
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **Pillow** - Image processing
- **NumPy** - Numerical operations

### Deployment
- **Frontend**: Vercel (Auto-deploy on push)
- **Backend**: Render.com (Free tier)
- **Model Storage**: Hugging Face Hub
- **Version Control**: GitHub

---

## 🌐 Live Deployment

### Production URLs

- **Web Application**: https://pneumo-scan.vercel.app
- **API Endpoint**: https://pneumoscan-api.onrender.com
- **API Documentation**: https://pneumoscan-api.onrender.com/docs
- **Model Repository**: https://huggingface.co/SudoSorcerer/pneumoscan-model

### Deployment Architecture

```
┌─────────────────────┐
│   User's Browser    │
└──────────┬──────────┘
           │
           │ HTTPS
           │
┌──────────▼──────────┐
│  Vercel (Frontend)  │  React SPA
│  pneumo-scan.app    │  Static Hosting
└──────────┬──────────┘
           │
           │ REST API
           │
┌──────────▼──────────┐
│  Render (Backend)   │  FastAPI Server
│  pneumoscan-api     │  Model Inference
└──────────┬──────────┘
           │
           │ Model Download
           │
┌──────────▼──────────┐
│  Hugging Face Hub   │  Model Storage
│  final_model.keras  │  (28.5 MB)
└─────────────────────┘
```

---

## 🚀 Local Installation

### Prerequisites

- **Python 3.12+**
- **Node.js 18+**
- **Git**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/UmairAhmed406/PneumoScan.git
   cd PneumoScan
   ```

2. **Create virtual environment**
   ```bash
   # Windows
   python -m venv backend/venv
   backend\venv\Scripts\activate

   # macOS/Linux
   python3 -m venv backend/venv
   source backend/venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r backend/requirements.txt
   ```

4. **Set environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env`:
   ```env
   MODEL_PATH=model/final_model.keras
   MODEL_URL=https://huggingface.co/SudoSorcerer/pneumoscan-model/resolve/main/final_model.keras
   ALLOWED_ORIGINS=http://localhost:5173
   PORT=8000
   ```

5. **Run backend server**
   ```bash
   cd backend
   python app.py
   ```

   API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env`:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   App will be available at `http://localhost:5173`

---

## 📚 API Documentation

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "model_loaded": true,
  "model_path": "model/final_model.keras"
}
```

### Predict Pneumonia

```http
POST /api/predict
Content-Type: multipart/form-data
```

**Request:**
- `file`: Image file (PNG, JPG, JPEG)

**Success Response (200):**
```json
{
  "prediction": "Pneumonia",
  "confidence": 0.9234,
  "raw_score": 0.9234,
  "disclaimer": "This prediction is for educational/research purposes only...",
  "validation_confidence": 100,
  "validation_warning": null
}
```

**Error Response (400 - Invalid Image):**
```json
{
  "detail": {
    "error": "Invalid Image Type",
    "message": "This image appears to contain text or document content.",
    "suggestion": "Please upload a chest X-ray image...",
    "validation_details": {
      "is_grayscale": false,
      "has_medical_histogram": false,
      "has_text_content": true
    }
  }
}
```

### Model Information

```http
GET /api/model/info
```

**Response:**
```json
{
  "model_type": "CNN (Convolutional Neural Network)",
  "framework": "TensorFlow/Keras",
  "input_size": [150, 150],
  "classes": ["Normal", "Pneumonia"],
  "accuracy": "89.67%",
  "threshold": 0.5
}
```

### Interactive Documentation

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## 📁 Project Structure

```
PneumoScan/
├── frontend/                   # React TypeScript frontend
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── AnalyzePage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   └── ResearchPage.tsx
│   │   ├── lib/               # Utilities and API
│   │   │   ├── api.ts
│   │   │   └── utils.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.ts
│   └── vercel.json            # Vercel deployment config
│
├── backend/                    # FastAPI backend
│   ├── app.py                 # Main API application
│   ├── model_downloader.py    # Automatic model download
│   ├── image_validator.py     # X-ray validation logic
│   └── requirements.txt       # Python dependencies
│
├── model/                      # ML model files
│   └── final_model.keras      # Trained CNN model (89.67% acc)
│
├── notebooks/                  # Jupyter notebooks
│   └── AI_Project-Copy1.ipynb # Model training notebook
│
├── research/                   # Research documentation
│   ├── AI_project_paper.docx
│   └── AI-literature_rev.docx
│
├── docs/                       # Documentation
│   ├── MEDICAL_DISCLAIMER.md
│   ├── DEPLOYMENT.md
│   ├── RENDER_DEPLOYMENT.md
│   ├── QUICK_START.md
│   └── TESTING_GUIDE.md
│
├── .github/                    # GitHub configuration
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
│
├── render.yaml                 # Render deployment config
├── .env.example               # Environment variables template
├── .gitignore
├── .gitattributes
├── LICENSE                    # MIT License
├── README.md                  # This file
├── CONTRIBUTING.md
└── CODE_OF_CONDUCT.md
```

---

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas for Contribution

- 🐛 Bug fixes and testing
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- 🔬 Model accuracy improvements
- 🌍 Internationalization
- ♿ Accessibility improvements

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 PneumoScan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## ⚠️ Medical Disclaimer

**THIS SOFTWARE IS PROVIDED FOR EDUCATIONAL AND RESEARCH PURPOSES ONLY.**

- This is **NOT** a medical device
- **NOT** FDA approved or clinically validated
- **NOT** a substitute for professional medical diagnosis
- Predictions may contain errors
- **NEVER** use as sole basis for medical decisions
- Always consult qualified healthcare professionals
- Developers assume **NO LIABILITY** for medical decisions made using this software

**By using this software, you acknowledge and accept these limitations.**

---

## 🙏 Acknowledgments

### Dataset
- **Chest X-Ray Images (Pneumonia)** dataset
- Source: Guangzhou Women and Children's Medical Center
- Available on Kaggle

### Technologies
- [TensorFlow](https://www.tensorflow.org/) - Deep learning framework
- [FastAPI](https://fastapi.tiangolo.com/) - Modern web framework
- [React](https://react.dev/) - UI library
- [Vercel](https://vercel.com/) - Frontend hosting
- [Render](https://render.com/) - Backend hosting
- [Hugging Face](https://huggingface.co/) - Model hosting

---

## 📧 Contact

- **Live Demo**: [pneumo-scan.vercel.app](https://pneumo-scan.vercel.app)
- **GitHub**: [github.com/UmairAhmed406/PneumoScan](https://github.com/UmairAhmed406/PneumoScan)
- **Issues**: [GitHub Issues](https://github.com/UmairAhmed406/PneumoScan/issues)
- **Email**: ahmedomair406@gmail.com

---

## 📊 Project Stats

- **Model Accuracy**: 89.67%
- **Training Images**: 5,216
- **Test Images**: 624
- **Deployment Status**: ✅ Live in Production
- **License**: MIT
- **Language**: Python, TypeScript
- **Framework**: TensorFlow, FastAPI, React

---

**Made with ❤️ for advancing healthcare AI education**

*PneumoScan - Demonstrating the potential of AI in medical imaging while emphasizing the importance of professional healthcare.*
