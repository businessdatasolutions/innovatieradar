import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import LandingPage from './pages/LandingPage'
import AssessmentInfoPage from './pages/AssessmentInfoPage'
import AssessmentDimensionsPage from './pages/AssessmentDimensionsPage'
import AssessmentWeightsPage from './pages/AssessmentWeightsPage'
import AssessmentReviewPage from './pages/AssessmentReviewPage'
import ResultsPage from './pages/ResultsPage'
import HistoryPage from './pages/HistoryPage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/assessment/info" element={<AssessmentInfoPage />} />
          <Route path="/assessment/dimensions" element={<AssessmentDimensionsPage />} />
          <Route path="/assessment/weights" element={<AssessmentWeightsPage />} />
          <Route path="/assessment/review" element={<AssessmentReviewPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
