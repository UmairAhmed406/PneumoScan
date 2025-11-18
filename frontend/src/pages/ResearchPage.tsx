import { Brain, Database, BarChart3, Layers, FileText, ExternalLink, TrendingUp } from 'lucide-react'

const ResearchPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Research & Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Explore the methodology, architecture, and performance of our pneumonia detection model
          </p>
        </div>

        {/* Overview */}
        <section className="mb-16">
          <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Brain className="h-8 w-8 text-purple-600" />
              Project Overview
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              PneumoScan utilizes a Convolutional Neural Network (CNN) architecture built with TensorFlow and Keras
              to classify chest X-ray images as either "Normal" or "Pneumonia". The model was trained on a large dataset
              of chest X-rays and achieved 89.67% accuracy on the test set, demonstrating the potential of deep learning
              in medical image analysis.
            </p>
          </div>
        </section>

        {/* Dataset */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Database className="h-7 w-7 text-blue-600" />
            Dataset
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-semibold text-lg mb-3 text-blue-600">Data Source</h3>
              <p className="text-sm text-muted-foreground mb-4">
                The model was trained on the Chest X-Ray Images (Pneumonia) dataset, which contains thousands
                of chest X-ray images organized into training, validation, and test sets.
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Training Images:</span>
                  <span className="font-semibold">5,216</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Validation Images:</span>
                  <span className="font-semibold">16</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Test Images:</span>
                  <span className="font-semibold">624</span>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-semibold text-lg mb-3 text-green-600">Data Preprocessing</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Image resizing to 150×150 pixels</li>
                <li>• Pixel value normalization (0-1 range)</li>
                <li>• Batch processing for efficient training</li>
                <li>• Data augmentation techniques applied</li>
                <li>• Stratified train-test split</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Model Architecture */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Layers className="h-7 w-7 text-purple-600" />
            Model Architecture
          </h2>
          <div className="p-6 border rounded-lg bg-card">
            <p className="text-muted-foreground mb-6">
              The CNN architecture consists of multiple convolutional layers followed by pooling layers,
              designed to extract and learn relevant features from chest X-ray images.
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Convolutional Layers</h4>
                <p className="text-sm text-blue-700">
                  Multiple Conv2D layers with increasing filter sizes (32, 64, 128) to capture hierarchical features
                  from simple edges to complex patterns.
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Pooling Layers</h4>
                <p className="text-sm text-green-700">
                  MaxPooling2D layers reduce spatial dimensions while retaining important features,
                  helping to reduce computational complexity.
                </p>
              </div>

              <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Dense Layers</h4>
                <p className="text-sm text-purple-700">
                  Fully connected layers with dropout regularization to prevent overfitting and make final predictions.
                </p>
              </div>

              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-2">Output Layer</h4>
                <p className="text-sm text-orange-700">
                  Sigmoid activation function for binary classification (Normal vs. Pneumonia).
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <h4 className="font-semibold mb-2 text-sm">Key Specifications</h4>
              <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
                <div>
                  <span className="block font-semibold text-foreground">Input Shape:</span>
                  150 × 150 × 3 (RGB)
                </div>
                <div>
                  <span className="block font-semibold text-foreground">Optimizer:</span>
                  Adam
                </div>
                <div>
                  <span className="block font-semibold text-foreground">Loss Function:</span>
                  Binary Crossentropy
                </div>
                <div>
                  <span className="block font-semibold text-foreground">Activation:</span>
                  ReLU (hidden), Sigmoid (output)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Metrics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <BarChart3 className="h-7 w-7 text-green-600" />
            Performance Metrics
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-green-800">Accuracy</h3>
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">89.67%</div>
              <p className="text-xs text-green-700">Test set accuracy</p>
            </div>

            <div className="p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-blue-800">Precision</h3>
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-blue-600 mb-2">~88%</div>
              <p className="text-xs text-blue-700">Positive predictive value</p>
            </div>

            <div className="p-6 border rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-purple-800">Recall</h3>
                <TrendingUp className="h-5 w-5 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">~92%</div>
              <p className="text-xs text-purple-700">True positive rate</p>
            </div>
          </div>

          <div className="mt-6 p-6 border rounded-lg bg-card">
            <h3 className="font-semibold mb-4">Model Performance Analysis</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                The model demonstrates strong performance across all metrics, with particularly high recall
                (~92%), indicating it successfully identifies most pneumonia cases. This is crucial for a
                medical screening tool where missing a positive case could have serious implications.
              </p>
              <p>
                The precision of ~88% shows that when the model predicts pneumonia, it's correct approximately
                88% of the time. The overall accuracy of 89.67% on the test set demonstrates the model's
                reliability in distinguishing between normal and pneumonia chest X-rays.
              </p>
            </div>
          </div>
        </section>

        {/* Training Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Training Process</h2>
          <div className="space-y-4">
            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs">1</span>
                Data Preparation
              </h3>
              <p className="text-sm text-muted-foreground ml-8">
                Images were organized into training, validation, and test sets. Data augmentation techniques
                (rotation, shift, zoom, flip) were applied to increase dataset diversity and prevent overfitting.
              </p>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs">2</span>
                Model Training
              </h3>
              <p className="text-sm text-muted-foreground ml-8">
                The CNN was trained using the Adam optimizer with binary crossentropy loss. Training was conducted
                over multiple epochs with early stopping and model checkpointing to prevent overfitting.
              </p>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs">3</span>
                Validation & Testing
              </h3>
              <p className="text-sm text-muted-foreground ml-8">
                Model performance was continuously monitored on the validation set during training.
                Final evaluation was performed on a separate test set to ensure unbiased performance assessment.
              </p>
            </div>

            <div className="p-6 border rounded-lg bg-card">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <span className="flex items-center justify-center w-6 h-6 bg-blue-600 text-white rounded-full text-xs">4</span>
                Model Optimization
              </h3>
              <p className="text-sm text-muted-foreground ml-8">
                Hyperparameter tuning was performed to optimize learning rate, batch size, and network architecture.
                The final model represents the best-performing configuration.
              </p>
            </div>
          </div>
        </section>

        {/* Limitations */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Limitations & Future Work</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border-2 border-orange-200 rounded-lg bg-orange-50">
              <h3 className="font-semibold text-orange-800 mb-3">Current Limitations</h3>
              <ul className="text-sm text-orange-700 space-y-2 list-disc list-inside">
                <li>Limited to binary classification (Normal vs. Pneumonia)</li>
                <li>Cannot distinguish between bacterial and viral pneumonia</li>
                <li>Performance may vary with image quality</li>
                <li>Trained on specific dataset distribution</li>
                <li>Not validated for clinical use</li>
              </ul>
            </div>

            <div className="p-6 border-2 border-green-200 rounded-lg bg-green-50">
              <h3 className="font-semibold text-green-800 mb-3">Future Enhancements</h3>
              <ul className="text-sm text-green-700 space-y-2 list-disc list-inside">
                <li>Multi-class classification for different lung conditions</li>
                <li>Grad-CAM visualization for explainability</li>
                <li>Larger and more diverse training dataset</li>
                <li>Integration with DICOM medical imaging standards</li>
                <li>Mobile application development</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Research Papers */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <FileText className="h-7 w-7 text-indigo-600" />
            Research References
          </h2>
          <div className="space-y-4">
            <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Deep Learning for Medical Image Analysis</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Comprehensive review of deep learning applications in medical imaging, including pneumonia detection
                from chest radiographs.
              </p>
              <a
                href="https://github.com/UmairAhmed406/PneumoScan/tree/main/research"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                View Research Materials
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow">
              <h3 className="font-semibold mb-2">Convolutional Neural Networks in Healthcare</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Study on the effectiveness of CNN architectures for automated disease detection in radiological images.
              </p>
              <a
                href="https://github.com/UmairAhmed406/PneumoScan/tree/main/notebooks"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
              >
                View Jupyter Notebooks
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </section>

        {/* Technical Documentation */}
        <section>
          <div className="p-8 bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Technical Documentation</h2>
            <p className="text-muted-foreground mb-6">
              For detailed technical information, including code implementation, training scripts, and model architecture
              details, please visit our GitHub repository.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/UmairAhmed406/PneumoScan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <FileText className="h-4 w-4" />
                View Full Documentation
                <ExternalLink className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/UmairAhmed406/PneumoScan/tree/main/model"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Brain className="h-4 w-4" />
                Model Files
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ResearchPage
