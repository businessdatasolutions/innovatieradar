import { useNavigate } from 'react-router-dom'
import { useAssessmentStore } from '@/lib/store'
import ProgressStepper from '@/components/layout/ProgressStepper'
import CompanyInfoForm from '@/components/assessment/CompanyInfoForm'
import type { CompanyInfo } from '@/lib/types'
import { useEffect } from 'react'

export default function AssessmentInfoPage() {
  const navigate = useNavigate()
  const assessment = useAssessmentStore((s) => s.currentAssessment)
  const setCompanyInfo = useAssessmentStore((s) => s.setCompanyInfo)
  const setStep = useAssessmentStore((s) => s.setStep)
  const initNewAssessment = useAssessmentStore((s) => s.initNewAssessment)

  useEffect(() => {
    if (!assessment) {
      initNewAssessment()
    }
  }, [assessment, initNewAssessment])

  if (!assessment) return null

  const handleSubmit = (data: CompanyInfo) => {
    setCompanyInfo(data)
    setStep(1)
    navigate('/assessment/dimensions')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ProgressStepper currentStep={0} />
      <h2 className="text-2xl font-bold text-center text-slate-800 mb-2">
        Bedrijfsgegevens
      </h2>
      <p className="text-center text-sm text-slate-500 mb-8">
        Vul de gegevens in van het bedrijf dat beoordeeld wordt.
      </p>
      <CompanyInfoForm
        defaultValues={assessment.companyInfo}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
