import { useNavigate } from 'react-router-dom'
import { useAssessmentStore } from '@/lib/store'
import ProgressStepper from '@/components/layout/ProgressStepper'
import ReviewSummary from '@/components/assessment/ReviewSummary'

export default function AssessmentReviewPage() {
  const navigate = useNavigate()
  const saveAssessment = useAssessmentStore((s) => s.saveAssessment)
  const setStep = useAssessmentStore((s) => s.setStep)

  const handleConfirm = () => {
    saveAssessment()
    navigate('/results')
  }

  const handleEditStep = (step: number) => {
    setStep(step)
    const routes = [
      '/assessment/info',
      '/assessment/dimensions',
      '/assessment/weights',
      '/assessment/review',
    ]
    navigate(routes[step])
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ProgressStepper currentStep={3} />
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
        Controleer &amp; Bevestig
      </h2>
      <p className="text-center text-sm text-slate-500 mb-8">
        Bekijk alle gegevens voordat u de resultaten genereert.
      </p>
      <ReviewSummary onConfirm={handleConfirm} onEditStep={handleEditStep} />
    </div>
  )
}
