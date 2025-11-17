# Contributing to PneumoScan 🤝

First off, thank you for considering contributing to PneumoScan! It's people like you that make PneumoScan such a great tool for advancing healthcare AI.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)
- [Community](#community)

---

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title** and description
- **Steps to reproduce** the problem
- **Expected behavior** vs **actual behavior**
- **Screenshots** if applicable
- **Environment details**: OS, Python version, browser, etc.
- **Error messages** and stack traces

**Example Bug Report Template:**
```markdown
## Bug Description
Brief description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen

## Actual Behavior
What actually happens

## Environment
- OS: Windows 11
- Python: 3.11.5
- Browser: Chrome 120
- PneumoScan version: main branch (commit abc123)

## Additional Context
Any other relevant information
```

### 💡 Suggesting Features

Feature suggestions are welcome! Please:

1. **Check existing issues** to avoid duplicates
2. **Clearly describe the feature** and its benefits
3. **Explain the use case** - why is this feature needed?
4. **Consider alternatives** - are there other ways to achieve this?
5. **Be open to discussion** - maintainers may suggest modifications

**Example Feature Request Template:**
```markdown
## Feature Description
Brief description of the feature

## Problem it Solves
What problem does this address?

## Proposed Solution
How should it work?

## Alternatives Considered
Other approaches you've thought about

## Additional Context
Screenshots, mockups, examples
```

### 🔬 Contributing Code

We welcome code contributions! Here are the main areas:

1. **Model Improvements**
   - Improve model accuracy
   - Experiment with different architectures
   - Add new capabilities (multi-class detection, etc.)
   - Optimize inference speed

2. **Backend Development**
   - API enhancements
   - Performance optimizations
   - Security improvements
   - New endpoints

3. **Frontend Development**
   - UI/UX improvements
   - New features
   - Responsive design
   - Accessibility

4. **Testing**
   - Unit tests
   - Integration tests
   - E2E tests
   - Test coverage improvements

5. **Documentation**
   - Improve README
   - API documentation
   - Code comments
   - Tutorials and guides

6. **DevOps**
   - CI/CD improvements
   - Docker configuration
   - Deployment scripts
   - Monitoring

---

## Development Setup

### Prerequisites

- Python 3.11+
- Git
- Node.js 18+ (for frontend, when available)
- Virtual environment tool (venv, conda, etc.)

### Step-by-Step Setup

1. **Fork the repository**

   Click the "Fork" button on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/PneumoScan.git
   cd PneumoScan
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL_OWNER/PneumoScan.git
   ```

4. **Create a virtual environment**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

5. **Install dependencies**
   ```bash
   # Backend dependencies
   pip install -r backend/requirements.txt

   # Development dependencies
   pip install -r backend/requirements-dev.txt  # When available
   ```

6. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your local configuration
   ```

7. **Run the application**
   ```bash
   cd backend
   python app.py
   ```

8. **Verify installation**
   ```bash
   # Test the API
   curl http://localhost:5000/health  # When health endpoint is added
   ```

### Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=backend --cov-report=html

# Run specific test file
pytest tests/test_api.py

# Run with verbose output
pytest -v
```

---

## Pull Request Process

### Before Submitting

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow coding standards (see below)
   - Add/update tests
   - Update documentation

3. **Test your changes**
   ```bash
   pytest
   # Ensure all tests pass
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature X"
   ```

   **Commit Message Format:**
   ```
   <type>: <subject>

   <body>

   <footer>
   ```

   **Types:**
   - `feat`: New feature
   - `fix`: Bug fix
   - `docs`: Documentation changes
   - `style`: Code style changes (formatting, etc.)
   - `refactor`: Code refactoring
   - `test`: Adding/updating tests
   - `chore`: Maintenance tasks

   **Example:**
   ```
   feat: add Grad-CAM visualization

   - Implement Grad-CAM heatmap generation
   - Add visualization endpoint to API
   - Update frontend to display heatmaps

   Closes #42
   ```

5. **Sync with upstream**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

### Submitting the Pull Request

1. **Go to GitHub** and create a Pull Request from your fork

2. **Fill out the PR template** with:
   - Description of changes
   - Related issues (use "Closes #123")
   - Testing done
   - Screenshots (if UI changes)
   - Checklist completion

3. **PR Checklist:**
   - [ ] Code follows project style guidelines
   - [ ] Self-review completed
   - [ ] Comments added to complex code
   - [ ] Documentation updated
   - [ ] No new warnings generated
   - [ ] Tests added/updated
   - [ ] All tests passing
   - [ ] No merge conflicts

4. **Wait for review**
   - Maintainers will review your PR
   - Address any feedback
   - Make requested changes
   - Push updates to the same branch

5. **After approval**
   - PR will be merged by maintainers
   - Your branch can be deleted

---

## Coding Standards

### Python (Backend)

**Style Guide:** PEP 8

```python
# Good
def predict_pneumonia(image_path: str) -> dict:
    """
    Predict pneumonia from chest X-ray image.

    Args:
        image_path: Path to the X-ray image file

    Returns:
        dict: Prediction result with confidence score

    Raises:
        ValueError: If image is invalid
    """
    if not os.path.exists(image_path):
        raise ValueError(f"Image not found: {image_path}")

    image = preprocess_image(image_path)
    prediction = model.predict(image)

    return {
        "prediction": "Pneumonia" if prediction > 0.5 else "Normal",
        "confidence": float(prediction)
    }
```

**Best Practices:**
- Use type hints
- Write docstrings (Google or NumPy style)
- Keep functions small and focused
- Use meaningful variable names
- Handle exceptions appropriately
- No hardcoded values (use config/env vars)

**Tools:**
```bash
# Format code
black backend/

# Check style
flake8 backend/

# Type checking
mypy backend/

# Sort imports
isort backend/
```

### JavaScript/TypeScript (Frontend - Future)

**Style Guide:** Airbnb JavaScript Style Guide

```typescript
// Good
interface PredictionResult {
  prediction: 'Normal' | 'Pneumonia';
  confidence: number;
}

const predictImage = async (file: File): Promise<PredictionResult> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/predict', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Prediction failed');
  }

  return response.json();
};
```

---

## Testing Guidelines

### Unit Tests

```python
# tests/test_prediction.py
import pytest
from backend.app import predict_pneumonia

def test_predict_normal_xray():
    """Test prediction on normal X-ray."""
    result = predict_pneumonia("tests/fixtures/normal.jpg")
    assert result["prediction"] == "Normal"
    assert 0 <= result["confidence"] <= 1

def test_predict_invalid_image():
    """Test handling of invalid image."""
    with pytest.raises(ValueError):
        predict_pneumonia("nonexistent.jpg")
```

### Integration Tests

```python
# tests/test_api.py
def test_predict_endpoint(client, test_image):
    """Test /predict endpoint."""
    response = client.post(
        '/predict',
        data={'file': test_image},
        content_type='multipart/form-data'
    )

    assert response.status_code == 200
    data = response.json()
    assert "prediction" in data
    assert "confidence" in data
```

### Test Coverage

- Aim for **80%+ code coverage**
- Test edge cases and error handling
- Mock external dependencies
- Use fixtures for test data

---

## Documentation

### Code Comments

```python
# Good: Explain WHY, not WHAT
# Normalize pixel values to [0, 1] range as expected by the model
image = image / 255.0

# Bad: Obvious comment
# Divide image by 255
image = image / 255.0
```

### Docstrings

Use Google-style docstrings:

```python
def process_image(image_path: str, target_size: tuple = (150, 150)) -> np.ndarray:
    """
    Load and preprocess an image for model inference.

    Args:
        image_path: Path to the image file
        target_size: Target dimensions (width, height). Defaults to (150, 150)

    Returns:
        Preprocessed image array ready for model prediction

    Raises:
        FileNotFoundError: If image file doesn't exist
        ValueError: If image cannot be loaded or processed

    Example:
        >>> image = process_image("xray.jpg")
        >>> image.shape
        (1, 150, 150, 3)
    """
    pass
```

### API Documentation

Document all endpoints:

```python
@app.route('/predict', methods=['POST'])
def predict():
    """
    Predict pneumonia from chest X-ray image.

    ---
    tags:
      - Prediction
    consumes:
      - multipart/form-data
    parameters:
      - name: file
        in: formData
        type: file
        required: true
        description: Chest X-ray image (JPG, PNG)
    responses:
      200:
        description: Prediction successful
        schema:
          type: object
          properties:
            prediction:
              type: string
              enum: [Normal, Pneumonia]
            confidence:
              type: number
              format: float
      400:
        description: Invalid request
      500:
        description: Server error
    """
    pass
```

---

## Community

### Getting Help

- **GitHub Discussions**: Ask questions, share ideas
- **GitHub Issues**: Report bugs, request features
- **Stack Overflow**: Tag with `pneumoscan`

### Staying Updated

- **Watch** the repository for notifications
- **Star** the repository to show support
- **Follow** for project updates

### Recognition

All contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in documentation

---

## Questions?

If you have questions not covered here:

1. Check existing [Issues](https://github.com/YourUsername/PneumoScan/issues)
2. Search [Discussions](https://github.com/YourUsername/PneumoScan/discussions)
3. Create a new discussion
4. Contact maintainers

---

**Thank you for contributing to PneumoScan! Together, we can advance healthcare AI for the benefit of all. 🫁💙**
