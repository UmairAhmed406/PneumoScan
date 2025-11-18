"""
Image Validator for Chest X-Ray Detection

This module validates whether an uploaded image is likely a chest X-ray
before processing it through the pneumonia detection model.
"""

import numpy as np
from PIL import Image
import logging

logger = logging.getLogger(__name__)


class ChestXRayValidator:
    """Validates if an image appears to be a chest X-ray."""

    @staticmethod
    def is_grayscale_like(image: Image.Image, threshold: float = 0.95) -> bool:
        """
        Check if image is grayscale or grayscale-like.
        Chest X-rays are typically grayscale images.

        Args:
            image: PIL Image object
            threshold: Similarity threshold (0-1) between RGB channels

        Returns:
            True if image appears grayscale
        """
        try:
            # Convert to RGB if needed
            if image.mode != 'RGB':
                image = image.convert('RGB')

            # Get pixel data
            img_array = np.array(image)
            r, g, b = img_array[:, :, 0], img_array[:, :, 1], img_array[:, :, 2]

            # Calculate correlation between channels
            # In grayscale images, R=G=B, so correlation should be very high
            rg_corr = np.corrcoef(r.flatten(), g.flatten())[0, 1]
            rb_corr = np.corrcoef(r.flatten(), b.flatten())[0, 1]
            gb_corr = np.corrcoef(g.flatten(), b.flatten())[0, 1]

            avg_corr = (rg_corr + rb_corr + gb_corr) / 3

            logger.info(f"Grayscale correlation: {avg_corr:.4f}")

            return avg_corr >= threshold

        except Exception as e:
            logger.error(f"Error checking grayscale: {e}")
            return False

    @staticmethod
    def has_medical_histogram(image: Image.Image) -> bool:
        """
        Analyze image histogram to check if it matches medical image characteristics.
        Medical X-rays typically have specific intensity distributions.

        Args:
            image: PIL Image object

        Returns:
            True if histogram suggests medical image
        """
        try:
            # Convert to grayscale
            gray = image.convert('L')
            img_array = np.array(gray)

            # Calculate histogram
            hist, bins = np.histogram(img_array, bins=256, range=(0, 256))

            # X-rays typically have:
            # 1. Wider distribution (not clustered in few bins)
            # 2. Peak in mid-range intensities
            # 3. Some presence across most intensity ranges

            # Check distribution spread
            non_zero_bins = np.count_nonzero(hist)
            spread_ratio = non_zero_bins / 256

            # Check if peak is in reasonable range (40-200 for medical images)
            peak_intensity = np.argmax(hist)

            # Check for reasonable standard deviation
            std_dev = np.std(img_array)

            logger.info(f"Histogram - Spread: {spread_ratio:.2f}, Peak: {peak_intensity}, StdDev: {std_dev:.2f}")

            # Medical X-rays typically have good spread and mid-range peak
            has_good_spread = spread_ratio > 0.3
            has_mid_peak = 30 < peak_intensity < 220
            has_good_std = 20 < std_dev < 100

            return has_good_spread and has_mid_peak and has_good_std

        except Exception as e:
            logger.error(f"Error analyzing histogram: {e}")
            return False

    @staticmethod
    def has_text_content(image: Image.Image) -> bool:
        """
        Detect if image has significant text content.
        X-rays shouldn't have much text (maybe small markers), but IDs/documents have lots.

        Args:
            image: PIL Image object

        Returns:
            True if significant text detected (which suggests NOT an X-ray)
        """
        try:
            # Convert to grayscale
            gray = image.convert('L')
            img_array = np.array(gray)

            # Apply edge detection (simple Sobel-like)
            # Text has lots of sharp edges
            edges_h = np.abs(np.diff(img_array, axis=0))
            edges_v = np.abs(np.diff(img_array, axis=1))

            # Calculate edge density
            edge_density_h = np.mean(edges_h > 30)
            edge_density_v = np.mean(edges_v > 30)

            total_edge_density = (edge_density_h + edge_density_v) / 2

            logger.info(f"Edge density: {total_edge_density:.4f}")

            # Documents/IDs typically have high edge density due to text
            # X-rays have smoother transitions
            return total_edge_density > 0.15

        except Exception as e:
            logger.error(f"Error detecting text: {e}")
            return False

    @staticmethod
    def validate_chest_xray(image_path: str) -> dict:
        """
        Comprehensive validation to determine if image is likely a chest X-ray.

        Args:
            image_path: Path to image file

        Returns:
            dict with validation results and confidence score
        """
        try:
            image = Image.open(image_path)

            # Run all checks
            is_grayscale = ChestXRayValidator.is_grayscale_like(image)
            has_medical_hist = ChestXRayValidator.has_medical_histogram(image)
            has_text = ChestXRayValidator.has_text_content(image)

            # Calculate confidence that this IS a chest X-ray
            # Grayscale: +40 points
            # Medical histogram: +40 points
            # No text: +20 points
            confidence = 0
            if is_grayscale:
                confidence += 40
            if has_medical_hist:
                confidence += 40
            if not has_text:
                confidence += 20

            is_likely_xray = confidence >= 60

            result = {
                'is_likely_xray': is_likely_xray,
                'confidence': confidence,
                'checks': {
                    'is_grayscale': is_grayscale,
                    'has_medical_histogram': has_medical_hist,
                    'has_text_content': has_text,
                },
                'message': ChestXRayValidator._get_validation_message(
                    is_likely_xray, confidence, is_grayscale, has_text
                )
            }

            logger.info(f"Validation result: {result}")
            return result

        except Exception as e:
            logger.error(f"Error validating image: {e}")
            return {
                'is_likely_xray': False,
                'confidence': 0,
                'checks': {},
                'message': 'Failed to validate image format'
            }

    @staticmethod
    def _get_validation_message(is_xray: bool, confidence: int,
                                is_grayscale: bool, has_text: bool) -> str:
        """Generate user-friendly validation message."""
        if not is_xray:
            if has_text:
                return (
                    "This image appears to contain text or document content. "
                    "Please upload a chest X-ray image for analysis."
                )
            elif not is_grayscale:
                return (
                    "This image doesn't appear to be a medical X-ray. "
                    "X-rays are typically grayscale images. "
                    "Please upload a chest X-ray image."
                )
            else:
                return (
                    "This image doesn't match the characteristics of a chest X-ray. "
                    "Please ensure you're uploading a valid chest X-ray image."
                )
        elif confidence < 80:
            return (
                "Image validation passed, but confidence is moderate. "
                "Please ensure this is a clear chest X-ray image."
            )
        else:
            return "Image appears to be a valid chest X-ray."
