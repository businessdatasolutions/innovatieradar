import { Link } from 'react-router-dom'
import { useAssessmentStore } from '@/lib/store'
import { calculateResults } from '@/lib/scoring'
import { generateRecommendations } from '@/lib/recommendations'
import InnovationRadarChart from '@/components/results/RadarChart'
import MagnitudeGauge from '@/components/results/MagnitudeGauge'
import ShapeAnalysis from '@/components/results/ShapeAnalysis'
import StrengthWeakness from '@/components/results/StrengthWeakness'
import ScoreTable from '@/components/results/ScoreTable'
import PdfDownloadButton from '@/components/report/PdfDownloadButton'
import { Plus, History } from 'lucide-react'

export default function ResultsPage() {
  const assessment = useAssessmentStore((s) => s.currentAssessment)
  const resetCurrent = useAssessmentStore((s) => s.resetCurrent)
  const initNewAssessment = useAssessmentStore((s) => s.initNewAssessment)

  if (!assessment) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-slate-500 mb-4">Geen assessment gevonden.</p>
        <Link
          to="/"
          className="text-primary hover:underline"
        >
          Terug naar home
        </Link>
      </div>
    )
  }

  const results = calculateResults(assessment.scores)
  const recommendations = generateRecommendations(results)

  const handleNewAssessment = () => {
    resetCurrent()
    initNewAssessment()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {assessment.companyInfo.companyName}
          </h2>
          <p className="text-sm text-slate-500">
            {assessment.companyInfo.industry} &middot; {assessment.companyInfo.assessmentDate}
          </p>
        </div>
        <div className="flex gap-2">
          <PdfDownloadButton assessment={assessment} results={results} />
          <Link
            to="/assessment/info"
            onClick={handleNewAssessment}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors no-underline"
          >
            <Plus className="w-4 h-4" />
            Nieuwe Assessment
          </Link>
          <Link
            to="/history"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors no-underline"
          >
            <History className="w-4 h-4" />
            Geschiedenis
          </Link>
        </div>
      </div>

      {/* Radar + Gauge */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-xl border border-border p-5">
          <div className="aspect-square max-h-[500px] w-full">
            <InnovationRadarChart scores={assessment.scores} size="lg" />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <MagnitudeGauge
            magnitudeIndex={results.magnitudeIndex}
            level={results.innovationLevel}
          />
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="font-semibold text-slate-800 text-sm mb-2">Anker vs. Brug</h3>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-500">Ankers</span>
              <span className="font-medium text-primary">{results.anchorAverage.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Bruggen</span>
              <span className="font-medium text-primary">{results.bridgeAverage.toFixed(2)}</span>
            </div>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              {results.anchorBridgeInterpretation}
            </p>
          </div>
        </div>
      </div>

      {/* Shape Analysis */}
      <ShapeAnalysis
        shape={results.profileShape}
        standardDeviation={results.standardDeviation}
        interpretation={results.interpretation}
      />

      {/* Strengths & Weaknesses */}
      <StrengthWeakness
        strengths={results.strengths}
        weaknesses={results.weaknesses}
      />

      {/* Recommendations */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h3 className="font-semibold text-slate-800 mb-3">Aanbevelingen</h3>
        <div className="space-y-3">
          {recommendations.map((rec, i) => (
            <div key={i} className="flex gap-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary-50 text-primary text-sm font-medium flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-slate-600 leading-relaxed">{rec}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Score Table */}
      <ScoreTable scores={assessment.scores} />
    </div>
  )
}
