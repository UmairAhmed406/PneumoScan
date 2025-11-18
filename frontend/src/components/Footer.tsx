import { Github, Mail, Heart, ExternalLink } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="md:col-span-2">
            <h3 className="font-bold text-lg mb-4">PneumoScan</h3>
            <p className="text-sm text-muted-foreground mb-4">
              AI-powered pneumonia detection from chest X-rays for educational and research purposes.
              This tool demonstrates the potential of deep learning in medical imaging analysis.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
              <span>for education and research</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/analyze" className="text-muted-foreground hover:text-foreground transition-colors">
                  Analyze X-Ray
                </a>
              </li>
              <li>
                <a href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="/research" className="text-muted-foreground hover:text-foreground transition-colors">
                  Research
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/UmairAhmed406/PneumoScan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  GitHub Repository
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/UmairAhmed406/PneumoScan/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Documentation
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/UmairAhmed406/PneumoScan/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Contributing
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://huggingface.co/SudoSorcerer/pneumoscan-model"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                >
                  Model on HuggingFace
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            <p>© {currentYear} PneumoScan. All rights reserved.</p>
            <p className="text-xs mt-1">
              Educational project - Not for medical diagnosis
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/UmairAhmed406/PneumoScan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub Repository"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="mailto:ahmedomair406@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email Contact"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <p className="text-xs text-center text-destructive font-semibold">
            ⚠️ MEDICAL DISCLAIMER: This tool is for educational and research purposes only.
            It is NOT a medical device and should NOT be used for clinical diagnosis.
            Always consult qualified healthcare professionals for medical advice.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
