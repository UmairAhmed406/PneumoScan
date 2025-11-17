import { Link } from 'react-router-dom'
import { ArrowRight, Activity, Brain, Shield } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 mb-20">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          AI-Powered
          <span className="text-primary"> Pneumonia Detection</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Advanced deep learning technology for pneumonia detection from chest X-rays.
          Built for education and research.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            to="/analyze"
            className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Try Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/research"
            className="inline-flex items-center px-8 py-4 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors"
          >
            View Research
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-20">
        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Activity className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">89.67% Accuracy</h3>
          <p className="text-muted-foreground">
            CNN model trained on thousands of chest X-rays achieving high accuracy on test data.
          </p>
        </div>

        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Deep Learning</h3>
          <p className="text-muted-foreground">
            Powered by TensorFlow and Keras with advanced convolutional neural network architecture.
          </p>
        </div>

        <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Open Source</h3>
          <p className="text-muted-foreground">
            Fully open source project for educational and research purposes. MIT licensed.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-muted rounded-lg p-12 text-center">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">4,511</div>
            <div className="text-muted-foreground">Training Images</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">89.67%</div>
            <div className="text-muted-foreground">Test Accuracy</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">150x150</div>
            <div className="text-muted-foreground">Input Resolution</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
