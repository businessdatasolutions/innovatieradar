import type { Assessment, AssessmentResults } from '@/lib/types'
import ReportCover from './ReportCover'
import ReportExecutiveSummary from './ReportExecutiveSummary'
import ReportRadarSection from './ReportRadarSection'
import ReportScoreSection from './ReportScoreSection'
import ReportAnalysis from './ReportAnalysis'
import ReportRecommendations from './ReportRecommendations'

interface ReportLayoutProps {
  assessment: Assessment
  results: AssessmentResults
  recommendations: string[]
}

export default function ReportLayout({ assessment, results, recommendations }: ReportLayoutProps) {
  return (
    <div className="bg-white" style={{ width: '794px', fontFamily: 'Inter, sans-serif' }}>
      <ReportCover assessment={assessment} />
      <ReportExecutiveSummary assessment={assessment} results={results} />
      <ReportRadarSection assessment={assessment} />
      <ReportScoreSection assessment={assessment} />
      <ReportAnalysis results={results} />
      <ReportRecommendations
        assessment={assessment}
        results={results}
        recommendations={recommendations}
      />
    </div>
  )
}
