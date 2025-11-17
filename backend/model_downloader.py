"""
Model Downloader Utility

Downloads the trained model from an external source if not present locally.
This is useful for deployment on platforms like Render where large files
can't be included in the repository.
"""

import os
import logging
import requests
from pathlib import Path
from typing import Optional

logger = logging.getLogger(__name__)


def download_file(url: str, destination: str, chunk_size: int = 8192) -> bool:
    """
    Download a file from a URL with progress logging.

    Args:
        url: URL to download from
        destination: Local file path to save to
        chunk_size: Size of chunks to download (bytes)

    Returns:
        True if download successful, False otherwise
    """
    try:
        logger.info(f"Downloading model from {url}")

        # Create destination directory if it doesn't exist
        Path(destination).parent.mkdir(parents=True, exist_ok=True)

        # Stream download to handle large files
        response = requests.get(url, stream=True, timeout=30)
        response.raise_for_status()

        total_size = int(response.headers.get('content-length', 0))
        logger.info(f"File size: {total_size / (1024 * 1024):.2f} MB")

        downloaded = 0
        with open(destination, 'wb') as f:
            for chunk in response.iter_content(chunk_size=chunk_size):
                if chunk:
                    f.write(chunk)
                    downloaded += len(chunk)

                    # Log progress every 10MB
                    if downloaded % (10 * 1024 * 1024) < chunk_size:
                        progress = (downloaded / total_size * 100) if total_size > 0 else 0
                        logger.info(f"Download progress: {progress:.1f}%")

        logger.info(f"Model downloaded successfully to {destination}")
        return True

    except requests.exceptions.RequestException as e:
        logger.error(f"Error downloading model: {e}")
        return False
    except Exception as e:
        logger.error(f"Unexpected error during download: {e}")
        return False


def ensure_model_exists(model_path: str, model_url: Optional[str] = None) -> bool:
    """
    Ensure model file exists, downloading if necessary.

    Args:
        model_path: Local path where model should exist
        model_url: Optional URL to download model from if not present

    Returns:
        True if model exists or was successfully downloaded, False otherwise
    """
    # Check if model already exists
    if os.path.exists(model_path):
        file_size = os.path.getsize(model_path)
        logger.info(f"Model found at {model_path} ({file_size / (1024 * 1024):.2f} MB)")
        return True

    # If no URL provided, can't download
    if not model_url:
        logger.warning(f"Model not found at {model_path} and no MODEL_URL provided")
        return False

    logger.info(f"Model not found at {model_path}, attempting download")

    # Download the model
    success = download_file(model_url, model_path)

    if success:
        # Verify file was created and has content
        if os.path.exists(model_path) and os.path.getsize(model_path) > 0:
            logger.info("Model download verified successfully")
            return True
        else:
            logger.error("Model file is empty or wasn't created")
            return False
    else:
        logger.error("Model download failed")
        return False


def get_model_url_from_gdrive(file_id: str) -> str:
    """
    Convert Google Drive file ID to direct download URL.

    Args:
        file_id: Google Drive file ID

    Returns:
        Direct download URL
    """
    return f"https://drive.google.com/uc?export=download&id={file_id}"


def get_model_url_from_hf(repo_id: str, filename: str) -> str:
    """
    Get direct download URL from Hugging Face Hub.

    Args:
        repo_id: Hugging Face repository ID (e.g., "username/repo-name")
        filename: Filename in the repository

    Returns:
        Direct download URL
    """
    return f"https://huggingface.co/{repo_id}/resolve/main/{filename}"
