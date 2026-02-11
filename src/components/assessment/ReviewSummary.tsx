import { DIMENSIONS } from '@/lib/dimensions'
import { useAssessmentStore } from '@/lib/store'
import { calculateMagnitudeIndex, classifyInnovationLevel, getInnovationLevelLabel, getInnovationLevelColor } from '@/lib/scoring'
import { SCORE_LABELS } from '@/lib/dimensions'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from 'recharts'

interface ReviewSummaryProps {
  onConfirm: () => void
  onEditStep: (step: number) => void
}

export default function ReviewSummary({ onConfirm, onEditStep }: ReviewSummaryProps) {
  const assessment = useAssessmentStore((s) => s.currentAssessment)

  if (!assessment) return null

  const mi = calculateMagnitudeIndex(assessment.scores)
  const level = classifyInnovationLevel(mi)
  const chartData = assessment.scores.map((s) => ({
    dimension: DIMENSIONS.find((d) => d.key === s.dimensionKey)?.label ?? s.dimensionKey,
    score: s.score,
  }))

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Company info */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-slate-800">Bedrijfsgegevens</h3>
          <button
            onClick={() => onEditStep(0)}
            className="text-xs text-primary hover:underline"
          >
            Wijzig
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-slate-500">Bedrijf:</span>{' '}
            <span className="font-medium">{assessment.companyInfo.companyName}</span>
          </div>
          <div>
            <span className="text-slate-500">Branche:</span>{' '}
            <span className="font-medium">{assessment.companyInfo.industry}</span>
          </div>
          <div>
            <span className="text-slate-500">Consultant:</span>{' '}
            <span className="font-medium">{assessment.companyInfo.consultantName}</span>
          </div>
          <div>
            <span className="text-slate-500">Datum:</span>{' '}
            <span className="font-medium">{assessment.companyInfo.assessmentDate}</span>
          </div>
        </div>
        {assessment.companyInfo.additionalNotes && (
          <p className="text-sm text-slate-500 mt-2">{assessment.companyInfo.additionalNotes}</p>
        )}
      </div>

      {/* Mini radar + magnitude */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border p-5 flex items-center justify-center">
          <div className="w-full max-w-xs aspect-square">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={chartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 9, fill: '#64748b' }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} tick={false} />
                <Radar
                  dataKey="score"
                  stroke="#1e3a5f"
                  fill="#1e3a5f"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border p-5 flex flex-col items-center justify-center">
          <p className="text-sm text-slate-500 mb-1">Magnitude Index</p>
          <p className="text-4xl font-bold text-primary">{mi.toFixed(2)}</p>
          <p className={`text-sm font-medium mt-1 ${getInnovationLevelColor(level)}`}>
            {getInnovationLevelLabel(level)}
          </p>
        </div>
      </div>

      {/* Scores table */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-semibold text-slate-800">Scores</h3>
          <button
            onClick={() => onEditStep(1)}
            className="text-xs text-primary hover:underline"
          >
            Wijzig
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-slate-500 font-medium">Dimensie</th>
                <th className="text-center py-2 text-slate-500 font-medium w-20">Score</th>
                <th className="text-center py-2 text-slate-500 font-medium w-20">Gewicht</th>
                <th className="text-left py-2 text-slate-500 font-medium">Notities</th>
              </tr>
            </thead>
            <tbody>
              {assessment.scores.map((s) => {
                const dim = DIMENSIONS.find((d) => d.key === s.dimensionKey)
                return (
                  <tr key={s.dimensionKey} className="border-b border-border/50">
                    <td className="py-2 font-medium text-slate-700">{dim?.label}</td>
                    <td className="py-2 text-center">
                      <span className="inline-flex items-center gap-1">
                        {s.score}
                        <span className="text-xs text-slate-400">
                          {SCORE_LABELS[s.score]}
                        </span>
                      </span>
                    </td>
                    <td className="py-2 text-center text-slate-500">{s.weight.toFixed(1)}</td>
                    <td className="py-2 text-slate-500 text-xs truncate max-w-48">
                      {s.notes || '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={onConfirm}
        className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-light transition-colors"
      >
        Bevestig &amp; Bekijk Resultaten
      </button>
    </div>
  )
}
