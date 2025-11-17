import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import HomePage from './pages/HomePage'
import AnalyzePage from './pages/AnalyzePage'
import AboutPage from './pages/AboutPage'
import ResearchPage from './pages/ResearchPage'
import Layout from './components/Layout'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/research" element={<ResearchPage />} />
        </Routes>
      </Layout>
    </>
  )
}

export default App
