# PneumoScan 🫁

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.11+](https://img.shields.io/badge/python-3.11+-blue.svg)](https://www.python.org/downloads/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange.svg)](https://tensorflow.org)

**An AI-powered pneumonia detection system using deep learning to analyze chest X-ray images.**

> **⚠️ IMPORTANT MEDICAL DISCLAIMER**
> This tool is for **educational and research purposes only**. It is NOT a substitute for professional medical diagnosis. Always consult qualified healthcare professionals for medical advice, diagnosis, or treatment.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Model Performance](#model-performance)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

---

## 🎯 Overview

PneumoScan is an open-source deep learning project that detects pneumonia from chest X-ray images using Convolutional Neural Networks (CNN). The system achieves **89.67% accuracy** on test data and provides a simple interface for medical image analysis.

### Why PneumoScan?

Pneumonia affects millions worldwide, especially in resource-limited settings. Early detection is crucial for effective treatment. This project demonstrates how AI can assist healthcare professionals in:

- **Rapid screening** of chest X-rays
- **Supporting diagnoses** in areas with limited access to radiologists
- **Educational purposes** for medical students and researchers
- **Research platform** for improving medical AI models

---

## ✨ Features

### Current Features

- ✅ **Deep Learning Model**: CNN-based pneumonia detection
- ✅ **High Accuracy**: 89.67% test accuracy
- ✅ **REST API**: Flask-based backend for predictions
- ✅ **Batch Processing**: Support for multiple image analysis
- ✅ **Research Documentation**: Comprehensive papers and notebooks

### Upcoming Features (In Development)

- 🚧 **Modern Web Interface**: React-based web application
- 🚧 **Grad-CAM Visualization**: Highlight regions influencing predictions
- 🚧 **Hugging Face Integration**: Live demo on Hugging Face Spaces
- 🚧 **Confidence Scores**: Prediction probability distribution
- 🚧 **Multi-format Export**: PDF reports and result summaries
- 🚧 **Batch Upload**: Process multiple X-rays simultaneously

---

## 📊 Model Performance

### Metrics

| Metric | Score |
|--------|-------|
| **Test Accuracy** | 89.67% |
| **Test Loss** | 0.4295 |
| **Best Validation Accuracy** | 96.1% (during hyperparameter search) |

### Dataset

- **Training Set**: 4,511 chest X-ray images
- **Validation Set**: 642 images
- **Test Set**: 1,287 images
- **Classes**: Binary classification (NORMAL vs PNEUMONIA)

### Hyperparameters

Optimized using Random Search:
- **Learning Rate**: 0.0001
- **Dropout Rate**: 0.2
- **Optimizer**: Adam
- **Loss Function**: Binary Cross-Entropy
- **Training Epochs**: 50 (with early stopping)

---

## 🏗️ Architecture

### Model Architecture

```
Input (150x150x3 RGB)
    ↓
Conv2D(32) → BatchNorm → MaxPooling → Dropout(0.2)
    ↓
Conv2D(64) → BatchNorm → MaxPooling → Dropout(0.2)
    ↓
Conv2D(64) → BatchNorm → MaxPooling → Dropout(0.2)
    ↓
Conv2D(128) → BatchNorm → MaxPooling → Dropout(0.2)
    ↓
Conv2D(256) → BatchNorm → MaxPooling → Dropout(0.2)
    ↓
Flatten
    ↓
Dense(256, SELU) → Dropout(0.2)
    ↓
Dense(1, Sigmoid)
    ↓
Output (NORMAL or PNEUMONIA)
```

### System Architecture

```
┌─────────────────┐
│   Frontend      │  React Web App (Coming Soon)
│   (Web/Mobile)  │  Legacy Android App (Archived)
└────────┬────────┘
         │
         │ HTTP/REST
         │
┌────────▼────────┐
│   Backend API   │  Flask/FastAPI
│   (Python)      │  Image Processing
└────────┬────────┘
         │
         │ Inference
         │
┌────────▼────────┐
│  ML Model       │  TensorFlow/Keras CNN
│  (.keras)       │  150x150 Input Size
└─────────────────┘
```

---

## 🚀 Installation

### Prerequisites

- Python 3.11 or higher
- pip package manager
- Virtual environment (recommended)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourUsername/PneumoScan.git
   cd PneumoScan
   ```

2. **Create and activate virtual environment**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r backend/requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run the backend API**
   ```bash
   cd backend
   python app.py
   ```

   The API will be available at `http://localhost:5000`

---

## 💻 Usage

### Using the API

**Endpoint**: `POST /predict`

**cURL Example**:
```bash
curl -X POST http://localhost:5000/predict \
  -F "file=@/path/to/chest_xray.jpg"
```

**Python Example**:
```python
import requests

url = "http://localhost:5000/predict"
files = {"file": open("chest_xray.jpg", "rb")}

response = requests.post(url, files=files)
result = response.json()

print(f"Prediction: {result['prediction']}")
print(f"Confidence: {result.get('confidence', 'N/A')}")
```

**Response Format**:
```json
{
  "prediction": "Pneumonia",
  "confidence": 0.87,
  "message": "Prediction completed successfully"
}
```

### Using the Jupyter Notebook

Explore the model training process:
```bash
jupyter notebook notebooks/AI_Project-Copy1.ipynb
```

---

## 📁 Project Structure

```
PneumoScan/
├── model/                      # Trained model files
│   ├── final_model.keras       # Production model
│   └── functional_model.keras  # Alternative model
│
├── backend/                    # Flask API backend
│   ├── app.py                  # Main API application
│   └── requirements.txt        # Python dependencies
│
├── notebooks/                  # Jupyter notebooks
│   └── AI_Project-Copy1.ipynb  # Model training notebook
│
├── research/                   # Research documentation
│   ├── AI_project_paper.docx   # Research paper
│   ├── AI-literature_rev.docx  # Literature review
│   └── Mobile App Devolopment Presentation.pptx
│
├── docs/                       # Documentation
│   ├── MEDICAL_DISCLAIMER.md   # Medical disclaimer
│   └── DEPLOYMENT.md           # Deployment guide
│
├── .github/                    # GitHub templates
│   ├── ISSUE_TEMPLATE/         # Issue templates
│   └── PULL_REQUEST_TEMPLATE.md
│
├── .gitignore                  # Git ignore rules
├── .env.example                # Environment variables template
├── LICENSE                     # MIT License
├── README.md                   # This file
├── CONTRIBUTING.md             # Contribution guidelines
└── CODE_OF_CONDUCT.md          # Code of conduct
```

---

## 🗺️ Roadmap

### Phase 1: Foundation ✅ (Current)
- [x] Clean project structure
- [x] Version control setup
- [x] Documentation
- [ ] Refactor backend API
- [ ] Add comprehensive tests

### Phase 2: Web Platform 🚧 (In Progress)
- [ ] Modern React web interface
- [ ] FastAPI backend migration
- [ ] Hugging Face Spaces deployment
- [ ] Confidence scores and visualization

### Phase 3: Advanced Features 📅 (Planned)
- [ ] Grad-CAM heatmaps
- [ ] User accounts and history
- [ ] Batch processing
- [ ] PDF report generation
- [ ] Multi-language support

### Phase 4: Research & Community 📅 (Planned)
- [ ] Model improvements
- [ ] Dataset expansion
- [ ] Research paper publication
- [ ] Community engagement
- [ ] Educational resources

### Phase 5: Production 📅 (Future)
- [ ] Security hardening
- [ ] HIPAA compliance considerations
- [ ] Performance optimization
- [ ] CI/CD pipeline
- [ ] Production deployment

---

## 🤝 Contributing

We welcome contributions from the community! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Ways to Contribute

- 🐛 Report bugs and issues
- 💡 Suggest new features
- 📝 Improve documentation
- 🔬 Enhance the model
- 🎨 Design UI/UX improvements
- 🧪 Write tests
- 🌍 Translate to other languages

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Third-Party Licenses

- TensorFlow: Apache 2.0 License
- Flask: BSD License
- Android Libraries: Various (see android/PneumoScanApp/build.gradle)

---

## ⚠️ Disclaimer

**THIS SOFTWARE IS PROVIDED FOR EDUCATIONAL AND RESEARCH PURPOSES ONLY.**

- This is **NOT** a medical device
- **NOT** FDA approved or clinically validated
- **NOT** a substitute for professional medical diagnosis
- Predictions may contain errors and should **NEVER** be used as sole basis for medical decisions
- Always consult qualified healthcare professionals
- The developers assume **NO LIABILITY** for any medical decisions made using this software

**By using this software, you acknowledge that you understand these limitations.**

---

## 🙏 Acknowledgments

### Dataset
- **Chest X-Ray Images (Pneumonia)** dataset from Kaggle
- Original source: Guangzhou Women and Children's Medical Center

### Inspiration
- Research in medical AI and computer vision
- Open-source community contributions
- Healthcare workers worldwide fighting pneumonia

### Built With
- [TensorFlow](https://www.tensorflow.org/) - Deep learning framework
- [Keras](https://keras.io/) - High-level neural networks API
- [Flask](https://flask.palletsprojects.com/) - Web framework
- [Scikit-learn](https://scikit-learn.org/) - Machine learning tools
- [Python](https://www.python.org/) - Programming language

---

## 📧 Contact

- **Project Repository**: [github.com/YourUsername/PneumoScan](https://github.com/YourUsername/PneumoScan)
- **Issues**: [GitHub Issues](https://github.com/YourUsername/PneumoScan/issues)
- **Discussions**: [GitHub Discussions](https://github.com/YourUsername/PneumoScan/discussions)

---

## 📚 Citations

If you use this project in your research, please cite:

```bibtex
@software{pneumoscan2024,
  title={PneumoScan: AI-Powered Pneumonia Detection},
  author={Your Name},
  year={2024},
  url={https://github.com/YourUsername/PneumoScan}
}
```

---

## ⭐ Star History

If you find this project useful, please consider giving it a star! It helps others discover the project.

---

**Made with ❤️ for advancing healthcare AI**
