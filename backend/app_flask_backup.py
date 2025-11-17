"""
PneumoScan Backend API

Flask application for pneumonia detection from chest X-ray images.
This is for educational and research purposes only - NOT for clinical use.
"""

import os
import logging
from pathlib import Path
from typing import Tuple, Dict, Any
import tempfile

from flask import Flask, request, jsonify
from flask_cors import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
import numpy as np
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Flask app
app = Flask(__name__)

# Configuration
class Config:
    """Application configuration from environment variables."""

    MODEL_PATH = os.getenv(
        'MODEL_PATH',
        os.path.join(os.path.dirname(__file__), '..', 'model', 'final_model.keras')
    )
    UPLOAD_FOLDER = os.getenv('UPLOAD_FOLDER', tempfile.gettempdir())
    MAX_CONTENT_LENGTH = int(os.getenv('MAX_CONTENT_LENGTH', 16 * 1024 * 1024))  # 16MB
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
    TARGET_SIZE = (150, 150)
    PREDICTION_THRESHOLD = float(os.getenv('PREDICTION_THRESHOLD', 0.5))
    PORT = int(os.getenv('PORT', 5000))
    HOST = os.getenv('HOST', '0.0.0.0')
    DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'

app.config.from_object(Config)

# Enable CORS
CORS(app, resources={
    r"/api/*": {
        "origins": os.getenv('ALLOWED_ORIGINS', '*').split(',')
    }
})

# Global model variable
model = None


def load_ml_model():
    """
    Load the trained Keras model.

    Returns:
        Loaded Keras model

    Raises:
        FileNotFoundError: If model file doesn't exist
        Exception: If model loading fails
    """
    global model

    if model is not None:
        logger.info("Model already loaded")
        return model

    model_path = Config.MODEL_PATH

    if not os.path.exists(model_path):
        raise FileNotFoundError(
            f"Model file not found at {model_path}. "
            f"Please ensure the model is in the correct location or set MODEL_PATH environment variable."
        )

    try:
        logger.info(f"Loading model from {model_path}")
        model = load_model(model_path)
        logger.info("Model loaded successfully")
        return model
    except Exception as e:
        logger.error(f"Error loading model: {e}")
        raise


def allowed_file(filename: str) -> bool:
    """
    Check if the file extension is allowed.

    Args:
        filename: Name of the file

    Returns:
        True if extension is allowed, False otherwise
    """
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS


def preprocess_image(image_path: str, target_size: Tuple[int, int] = (150, 150)) -> np.ndarray:
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
        # If Pneumonia: confidence as-is, if Normal: 1 - confidence
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


# ===== API ROUTES =====

@app.route('/', methods=['GET'])
def index():
    """Root endpoint with API information."""
    return jsonify({
        'name': 'PneumoScan API',
        'version': '1.0.0',
        'description': 'AI-powered pneumonia detection from chest X-rays',
        'disclaimer': 'For educational and research purposes only. NOT for clinical use.',
        'endpoints': {
            'health': '/health',
            'predict': '/api/predict (POST)',
            'model_info': '/api/model/info'
        }
    }), 200


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    try:
        # Check if model is loaded
        if model is None:
            load_ml_model()

        return jsonify({
            'status': 'healthy',
            'model_loaded': model is not None,
            'model_path': Config.MODEL_PATH
        }), 200

    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return jsonify({
            'status': 'unhealthy',
            'error': str(e)
        }), 503


@app.route('/api/model/info', methods=['GET'])
def model_info():
    """Get information about the loaded model."""
    try:
        if model is None:
            load_ml_model()

        return jsonify({
            'model_type': 'CNN (Convolutional Neural Network)',
            'framework': 'TensorFlow/Keras',
            'input_size': Config.TARGET_SIZE,
            'classes': ['Normal', 'Pneumonia'],
            'accuracy': '89.67%',
            'threshold': Config.PREDICTION_THRESHOLD
        }), 200

    except Exception as e:
        logger.error(f"Error getting model info: {e}")
        return jsonify({'error': str(e)}), 500


@app.route('/api/predict', methods=['POST'])
def predict_endpoint():
    """
    Predict pneumonia from uploaded chest X-ray image.

    Expects:
        - multipart/form-data with 'file' field containing the image

    Returns:
        - JSON with prediction result and confidence score
    """
    try:
        # Validate request
        if 'file' not in request.files:
            logger.warning("No file part in request")
            return jsonify({
                'error': 'No file provided',
                'message': 'Please upload an image file'
            }), 400

        file = request.files['file']

        # Check if file is selected
        if file.filename == '':
            logger.warning("Empty filename")
            return jsonify({
                'error': 'No file selected',
                'message': 'Please select a file to upload'
            }), 400

        # Validate file extension
        if not allowed_file(file.filename):
            logger.warning(f"Invalid file type: {file.filename}")
            return jsonify({
                'error': 'Invalid file type',
                'message': f'Allowed types: {", ".join(Config.ALLOWED_EXTENSIONS)}'
            }), 400

        # Ensure model is loaded
        if model is None:
            logger.info("Loading model for first prediction")
            load_ml_model()

        # Create temporary file
        with tempfile.NamedTemporaryFile(delete=False, suffix=Path(file.filename).suffix) as temp_file:
            temp_path = temp_file.name
            file.save(temp_path)
            logger.info(f"File saved to temporary path: {temp_path}")

        try:
            # Make prediction
            result = predict_pneumonia(temp_path)

            # Add medical disclaimer
            result['disclaimer'] = (
                'This prediction is for educational/research purposes only. '
                'Always consult a qualified healthcare professional for medical diagnosis.'
            )

            return jsonify(result), 200

        finally:
            # Clean up temporary file
            if os.path.exists(temp_path):
                os.remove(temp_path)
                logger.info(f"Temporary file deleted: {temp_path}")

    except ValueError as e:
        logger.error(f"Validation error: {e}")
        return jsonify({
            'error': 'Processing error',
            'message': str(e)
        }), 400

    except Exception as e:
        logger.error(f"Unexpected error in prediction endpoint: {e}", exc_info=True)
        return jsonify({
            'error': 'Internal server error',
            'message': 'An unexpected error occurred. Please try again.'
        }), 500


@app.errorhandler(413)
def request_entity_too_large(error):
    """Handle file size exceeding limit."""
    return jsonify({
        'error': 'File too large',
        'message': f'Maximum file size is {Config.MAX_CONTENT_LENGTH / (1024*1024)}MB'
    }), 413


@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors."""
    return jsonify({
        'error': 'Not found',
        'message': 'The requested endpoint does not exist'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors."""
    logger.error(f"Internal server error: {error}")
    return jsonify({
        'error': 'Internal server error',
        'message': 'An unexpected error occurred'
    }), 500


# ===== MAIN =====

if __name__ == '__main__':
    # Load model at startup
    try:
        load_ml_model()
        logger.info("Model preloaded successfully")
    except Exception as e:
        logger.error(f"Failed to preload model: {e}")
        logger.warning("Server starting without model - it will be loaded on first request")

    # Create upload folder if it doesn't exist
    os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)

    # Start server
    logger.info(f"Starting PneumoScan API on {Config.HOST}:{Config.PORT}")
    logger.info(f"Debug mode: {Config.DEBUG}")

    app.run(
        host=Config.HOST,
        port=Config.PORT,
        debug=Config.DEBUG
    )
