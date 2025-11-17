# PneumoScan Frontend

Modern React web application for PneumoScan - AI-powered pneumonia detection.

## Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Query** - Data fetching
- **React Router** - Routing
- **Zustand** - State management
- **Lucide React** - Icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see `../backend/README.md`)

### Installation

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update .env with your backend URL
# VITE_API_URL=http://localhost:8000
```

### Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:3000
```

### Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable components
│   │   └── Layout.tsx   # Main layout with navigation
│   ├── pages/           # Page components
│   │   ├── HomePage.tsx
│   │   ├── AnalyzePage.tsx
│   │   ├── AboutPage.tsx
│   │   └── ResearchPage.tsx
│   ├── lib/             # Utilities and API
│   │   ├── api.ts       # API client
│   │   └── utils.ts     # Helper functions
│   ├── assets/          # Static assets
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── public/              # Public assets
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies

```

## Features

### Current
- **Landing Page** - Hero section with features and stats
- **Image Upload** - Drag-and-drop X-ray upload
- **Real-time Analysis** - Instant pneumonia detection
- **Results Display** - Prediction with confidence scores
- **Responsive Design** - Mobile-first approach
- **Medical Disclaimer** - Prominent safety warnings

### Coming Soon
- **Grad-CAM Visualization** - Heatmaps showing important regions
- **Batch Upload** - Multiple X-ray analysis
- **Result History** - Save and compare predictions
- **Dark Mode** - Theme toggle
- **PDF Reports** - Export results

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:8000
```

## API Integration

The frontend communicates with the FastAPI backend through the API client in `src/lib/api.ts`.

**Endpoints used:**
- `GET /health` - Health check
- `GET /api/model/info` - Model information
- `POST /api/predict` - Pneumonia prediction

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Build and Host Manually

```bash
# Build
npm run build

# The dist/ folder can be hosted on any static hosting service
# - Netlify
# - GitHub Pages
# - AWS S3
# - Firebase Hosting
```

## Contributing

See [CONTRIBUTING.md](../CONTRIBUTING.md) in the root directory.

## License

MIT License - see [LICENSE](../LICENSE)

## Medical Disclaimer

This application is for educational and research purposes only. It is NOT a medical device and should NEVER be used for clinical diagnosis. Always consult qualified healthcare professionals for medical advice.
