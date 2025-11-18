import { Heart, Target, Shield, Users, Github, Mail } from 'lucide-react'

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">About PneumoScan</h1>
          <p className="text-xl text-muted-foreground">
            AI-powered pneumonia detection for educational and research purposes
          </p>
        </div>

        {/* Mission Statement */}
        <section className="mb-16">
          <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
              <Heart className="h-8 w-8 text-blue-600" />
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              PneumoScan aims to demonstrate the potential of artificial intelligence in medical imaging analysis.
              By making this technology accessible and transparent, we hope to contribute to the growing field of
              AI-assisted healthcare while emphasizing the irreplaceable role of medical professionals in diagnosis and treatment.
            </p>
          </div>
        </section>

        {/* What is PneumoScan */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">What is PneumoScan?</h2>
          <div className="prose max-w-none text-muted-foreground space-y-4">
            <p className="text-lg leading-relaxed">
              PneumoScan is a deep learning-powered web application designed to analyze chest X-ray images
              and predict the presence of pneumonia. Built using state-of-the-art Convolutional Neural Networks (CNN),
              the system has been trained on thousands of chest X-ray images to recognize patterns associated with pneumonia.
            </p>
            <p className="text-lg leading-relaxed">
              The project was developed as an educational initiative to explore the intersection of artificial intelligence
              and medical imaging. It demonstrates how machine learning models can assist in preliminary screening, while
              always emphasizing that final diagnosis must come from qualified healthcare professionals.
            </p>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Target className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">High Accuracy</h3>
                  <p className="text-sm text-muted-foreground">
                    Achieved 89.67% accuracy on test dataset through rigorous training and validation processes.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Privacy Focused</h3>
                  <p className="text-sm text-muted-foreground">
                    Images are processed in real-time and not stored. Your privacy and data security are our priority.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">User Friendly</h3>
                  <p className="text-sm text-muted-foreground">
                    Simple drag-and-drop interface makes it easy to upload and analyze chest X-rays instantly.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border rounded-lg bg-card hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Github className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Open Source</h3>
                  <p className="text-sm text-muted-foreground">
                    Fully open-source on GitHub. Explore the code, contribute, and learn from the implementation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Technology Stack</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-card">
              <h3 className="font-semibold mb-2 text-blue-600">Frontend</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• React 18</li>
                <li>• TypeScript</li>
                <li>• TailwindCSS</li>
                <li>• Vite</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg bg-card">
              <h3 className="font-semibold mb-2 text-green-600">Backend</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• FastAPI</li>
                <li>• Python 3.12</li>
                <li>• Uvicorn</li>
                <li>• Pydantic</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg bg-card">
              <h3 className="font-semibold mb-2 text-purple-600">Machine Learning</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• TensorFlow 2.18</li>
                <li>• Keras</li>
                <li>• CNN Architecture</li>
                <li>• NumPy</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Important Disclaimer */}
        <section className="mb-16">
          <div className="p-8 bg-red-50 border-2 border-red-200 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-red-800 flex items-center gap-3">
              <Shield className="h-7 w-7" />
              Important Medical Disclaimer
            </h2>
            <div className="space-y-3 text-red-900">
              <p className="font-semibold">
                PneumoScan is NOT a medical device and should NOT be used for clinical diagnosis.
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>This tool is for <strong>educational and research purposes only</strong></li>
                <li>Results should <strong>never replace professional medical advice</strong></li>
                <li>Always consult qualified healthcare professionals for medical diagnosis</li>
                <li>Do not make medical decisions based solely on this tool's predictions</li>
                <li>In case of medical emergencies, seek immediate professional help</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Developer Info */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6">About the Developer</h2>
          <div className="p-6 border rounded-lg bg-card">
            <p className="text-muted-foreground mb-4">
              PneumoScan was developed as part of an academic research project to explore the application
              of deep learning in medical image analysis. The project combines expertise in machine learning,
              web development, and healthcare to create an accessible demonstration of AI capabilities.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://github.com/UmairAhmed406/PneumoScan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
              <a
                href="mailto:ahmedomair406@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <Mail className="h-4 w-4" />
                Contact
              </a>
            </div>
          </div>
        </section>

        {/* Contributing */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Contributing</h2>
          <div className="p-6 border rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
            <p className="text-muted-foreground mb-4">
              PneumoScan is open source and we welcome contributions! Whether you're interested in:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
              <li>Improving the model accuracy</li>
              <li>Enhancing the user interface</li>
              <li>Adding new features</li>
              <li>Fixing bugs or improving documentation</li>
            </ul>
            <p className="text-muted-foreground">
              Check out our <a href="https://github.com/UmairAhmed406/PneumoScan/blob/main/CONTRIBUTING.md"
              className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Contributing Guidelines</a> to get started!
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
