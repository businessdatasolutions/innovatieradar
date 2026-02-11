import { useNavigate } from 'react-router-dom'
import { useAssessmentStore } from '@/lib/store'
import ProgressStepper from '@/components/layout/ProgressStepper'
import DimensionWizard from '@/components/assessment/DimensionWizard'

export default function AssessmentDimensionsPage() {
  const navigate = useNavigate()
  const setStep = useAssessmentStore((s) => s.setStep)

  const handleComplete = () => {
    setStep(2)
    navigate('/assessment/weights')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ProgressStepper currentStep={1} />
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
        Score de 12 Dimensies
      </h2>
      <p className="text-center text-sm text-slate-500 mb-8">
        Beoordeel elke dimensie op een schaal van 1 (statisch) tot 5 (systematisch).
      </p>
      <DimensionWizard onComplete={handleComplete} />
    </div>
  )
}
