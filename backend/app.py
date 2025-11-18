"""
PneumoScan Backend API - FastAPI Version

FastAPI application for pneumonia detection from chest X-ray images.
This is for educational and research purposes only - NOT for clinical use.
"""

import os
import logging
from pathlib import Path
from typing import Dict, Any
import tempfile

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
from dotenv import load_dotenv
from pydantic import BaseModel
from model_downloader import ensure_model_exists
from image_validator import ChestXRayValidator

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="PneumoScan API",
    description="AI-powered pneumonia detection from chest X-rays",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configuration
class Config:
    """Application configuration from environment variables."""

    MODEL_PATH = os.getenv(
        'MODEL_PATH',
        os.path.join(os.path.dirname(__file__), '..', 'model', 'final_model.keras')
    )
    MODEL_URL = os.getenv('MODEL_URL', None)  # URL to download model from if not present
    MAX_CONTENT_LENGTH = int(os.getenv('MAX_CONTENT_LENGTH', 16 * 1024 * 1024))  # 16MB
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
    TARGET_SIZE = (150, 150)
    PREDICTION_THRESHOLD = float(os.getenv('PREDICTION_THRESHOLD', 0.5))
    PORT = int(os.getenv('PORT', 8000))
    HOST = os.getenv('HOST', '0.0.0.0')
    ALLOWED_ORIGINS = os.getenv('ALLOWED_ORIGINS', '*').split(',')


# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=Config.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model variable
model = None


# Pydantic models
class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    raw_score: float
    disclaimer: str
    validation_confidence: int = 100
    validation_warning: str = None


class ModelInfo(BaseModel):
    model_type: str
    framework: str
    input_size: tuple
    classes: list
    accuracy: str
    threshold: float


class HealthResponse(BaseModel):
    status: str
    model_loaded: bool
    model_path: str


def load_ml_model():
    """
    Load the trained Keras model.
    If model doesn't exist locally but MODEL_URL is provided, downloads it first.

    Returns:
        Loaded Keras model

    Raises:
        FileNotFoundError: If model file doesn't exist and can't be downloaded
        Exception: If model loading fails
    """
    global model

    if model is not None:
        logger.info("Model already loaded")
        return model

    model_path = Config.MODEL_PATH

    # Ensure model exists (download if necessary)
    model_available = ensure_model_exists(model_path, Config.MODEL_URL)

    if not model_available:
        raise FileNotFoundError(
            f"Model file not found at {model_path}. "
            f"Please ensure the model is in the correct location, "
            f"set MODEL_PATH environment variable, or provide MODEL_URL for automatic download."
        )

    try:
        logger.info(f"Loading model from {model_path}")
        model = load_model(model_path)
        logger.info("Model loaded successfully")
        return model
    except Exception as e:
        logger.error(f"Error loading model: {e}")
        raise


def preprocess_image(image_path: str, target_size: tuple = (150, 150)) -> np.ndarray:
    """
    Load and preprocess an image for model inference.

    Args:
        image_path: Path to the image file
        target_size: Target dimensions (width, height)

    Returns:
        Preprocessed image array ready for prediction

    Raises:
        ValueError: If image cannot be loaded or processed
    """
    try:
        # Load image
        img = load_img(image_path, target_size=target_size)

        # Convert to array
        img_array = img_to_array(img)

        # Normalize pixel values to [0, 1]
        img_array = img_array / 255.0

        # Add batch dimension
        img_array = np.expand_dims(img_array, axis=0)

        logger.info(f"Image preprocessed successfully: shape={img_array.shape}")
        return img_array

    except Exception as e:
        logger.error(f"Error preprocessing image: {e}")
        raise ValueError(f"Failed to preprocess image: {str(e)}")


def predict_pneumonia(image_path: str) -> Dict[str, Any]:
    """
    Predict pneumonia from chest X-ray image.

    Args:
        image_path: Path to the X-ray image file

    Returns:
        Dictionary containing prediction result and confidence score

    Raises:
        ValueError: If prediction fails
    """
    try:
        # Preprocess image
        preprocessed_image = preprocess_image(image_path, target_size=Config.TARGET_SIZE)

        # Make prediction
        prediction = model.predict(preprocessed_image, verbose=0)
        confidence = float(prediction[0][0])

        # Determine class label
        class_label = 'Pneumonia' if confidence > Config.PREDICTION_THRESHOLD else 'Normal'

        # Adjust confidence for display (closer to 1 means more confident)
        display_confidence = confidence if class_label == 'Pneumonia' else 1 - confidence

        result = {
            'prediction': class_label,
            'confidence': round(display_confidence, 4),
            'raw_score': round(confidence, 4)
        }

        logger.info(f"Prediction: {result}")
        return result

    except Exception as e:
        logger.error(f"Error during prediction: {e}")
        raise ValueError(f"Prediction failed: {str(e)}")


# API Routes

@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information."""
    return {
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


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Health check endpoint."""
    try:
        # Check if model is loaded
        if model is None:
            load_ml_model()

        return HealthResponse(
            status="healthy",
            model_loaded=model is not None,
            model_path=Config.MODEL_PATH
        )

    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail={"status": "unhealthy", "error": str(e)})


@app.get("/api/model/info", response_model=ModelInfo, tags=["Model"])
async def model_info():
    """Get information about the loaded model."""
    try:
        if model is None:
            load_ml_model()

        return ModelInfo(
            model_type="CNN (Convolutional Neural Network)",
            framework="TensorFlow/Keras",
            input_size=Config.TARGET_SIZE,
            classes=["Normal", "Pneumonia"],
            accuracy="89.67%",
            threshold=Config.PREDICTION_THRESHOLD
        )

    except Exception as e:
        logger.error(f"Error getting model info: {e}")
        raise HTTPException(status_code=500, detail={"error": str(e)})


@app.post("/api/predict", response_model=PredictionResponse, tags=["Prediction"])
async def predict_endpoint(file: UploadFile = File(...)):
    """
    Predict pneumonia from uploaded chest X-ray image.

    Args:
        file: Uploaded image file (PNG, JPG, JPEG)

    Returns:
        Prediction result with confidence score
    """
    try:
        # Validate file
        if not file:
            raise HTTPException(status_code=400, detail={"error": "No file provided"})

        # Check file extension
        file_ext = Path(file.filename).suffix.lower().replace('.', '')
        if file_ext not in Config.ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail={
                    "error": "Invalid file type",
                    "message": f"Allowed types: {', '.join(Config.ALLOWED_EXTENSIONS)}"
                }
            )

        # Ensure model is loaded
        if model is None:
            logger.info("Loading model for first prediction")
            load_ml_model()

        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=f".{file_ext}") as temp_file:
            temp_path = temp_file.name
            content = await file.read()
            temp_file.write(content)
            logger.info(f"File saved to temporary path: {temp_path}")

        try:
            # Validate if image is a chest X-ray
            validation_result = ChestXRayValidator.validate_chest_xray(temp_path)

            if not validation_result['is_likely_xray']:
                # Image doesn't appear to be a chest X-ray
                logger.warning(f"Invalid image type detected: {validation_result['message']}")
                raise HTTPException(
                    status_code=400,
                    detail={
                        "error": "Invalid Image Type",
                        "message": validation_result['message'],
                        "suggestion": "Please upload a chest X-ray image. The uploaded image appears to be a document, photo, or other non-medical image.",
                        "validation_details": validation_result['checks']
                    }
                )

            # Make prediction
            result = predict_pneumonia(temp_path)

            # Add medical disclaimer
            result['disclaimer'] = (
                "This prediction is for educational/research purposes only. "
                "Always consult a qualified healthcare professional for medical diagnosis."
            )

            # Add validation confidence
            result['validation_confidence'] = validation_result['confidence']

            # Add warning if validation confidence is low
            if validation_result['confidence'] < 80:
                result['validation_warning'] = validation_result['message']

            return PredictionResponse(**result)

        finally:
            # Clean up temporary file
            if os.path.exists(temp_path):
                os.remove(temp_path)
                logger.info(f"Temporary file deleted: {temp_path}")

    except HTTPException:
        raise
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(status_code=400, detail={"error": "Processing error", "message": str(e)})
    except Exception as e:
        logger.error(f"Unexpected error in prediction endpoint: {e}", exc_info=True)
        raise HTTPException(
            status_code=500,
            detail={"error": "Internal server error", "message": "An unexpected error occurred"}
        )


# Startup event
@app.on_event("startup")
async def startup_event():
    """Load model at startup."""
    try:
        load_ml_model()
        logger.info("Model preloaded successfully")
    except Exception as e:
        logger.error(f"Failed to preload model: {e}")
        logger.warning("Server starting without model - it will be loaded on first request")


# Main execution
if __name__ == "__main__":
    import uvicorn

    logger.info(f"Starting PneumoScan API on {Config.HOST}:{Config.PORT}")

    uvicorn.run(
        "app:app",
        host=Config.HOST,
        port=Config.PORT,
        reload=True,
        log_level="info"
    )
