import { useNavigate } from 'react-router-dom'
import { useAssessmentStore } from '@/lib/store'
import ProgressStepper from '@/components/layout/ProgressStepper'
import WeightingPanel from '@/components/assessment/WeightingPanel'

export default function AssessmentWeightsPage() {
  const navigate = useNavigate()
  const setStep = useAssessmentStore((s) => s.setStep)

  const handleComplete = () => {
    setStep(3)
    navigate('/assessment/review')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ProgressStepper currentStep={2} />
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
        Wegingsfactoren
      </h2>
      <p className="text-center text-sm text-slate-500 mb-8">
        Pas optioneel de relatieve belangrijkheid van elke dimensie aan.
      </p>
      <WeightingPanel onComplete={handleComplete} onSkip={handleComplete} />
    </div>
  )
}
