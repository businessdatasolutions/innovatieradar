import { DIMENSIONS } from '@/lib/dimensions'
import { useAssessmentStore } from '@/lib/store'
import { calculateMagnitudeIndex, classifyInnovationLevel, getInnovationLevelLabel } from '@/lib/scoring'
import type { DimensionKey } from '@/lib/types'

interface WeightingPanelProps {
  onComplete: () => void
  onSkip: () => void
}

export default function WeightingPanel({ onComplete, onSkip }: WeightingPanelProps) {
  const assessment = useAssessmentStore((s) => s.currentAssessment)
  const setDimensionWeight = useAssessmentStore((s) => s.setDimensionWeight)

  if (!assessment) return null

  const mi = calculateMagnitudeIndex(assessment.scores)
  const level = classifyInnovationLevel(mi)

  const resetWeights = () => {
    DIMENSIONS.forEach((d) => {
      setDimensionWeight(d.key as DimensionKey, 1.0)
    })
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="bg-surface rounded-lg p-4 text-sm text-slate-600">
        Pas gewichten aan als bepaalde dimensies belangrijker zijn voor de branche van deze klant.
        Standaard hebben alle dimensies gelijk gewicht (1.0).
      </div>

      <div className="bg-white rounded-xl border border-border p-4">
        <div className="text-center mb-4">
          <p className="text-sm text-slate-500">Magnitude Index</p>
          <p className="text-3xl font-bold text-primary">{mi.toFixed(2)}</p>
          <p className="text-sm text-slate-500">{getInnovationLevelLabel(level)}</p>
        </div>

        <div className="space-y-3">
          {DIMENSIONS.map((d) => {
            const score = assessment.scores.find((s) => s.dimensionKey === d.key)
            if (!score) return null
            return (
              <div key={d.key} className="flex items-center gap-4">
                <div className="w-36 text-sm font-medium text-slate-700 shrink-0">
                  {d.label}
                </div>
                <div className="w-8 text-center text-sm text-slate-500">
                  {score.score}
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={score.weight}
                  onChange={(e) =>
                    setDimensionWeight(d.key as DimensionKey, parseFloat(e.target.value))
                  }
                  className="flex-1 accent-primary"
                />
                <div className="w-10 text-center text-sm text-slate-500">
                  {score.weight.toFixed(1)}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={resetWeights}
          className="px-4 py-2 text-sm text-slate-600 hover:text-primary transition-colors"
        >
          Reset gewichten
        </button>
        <div className="flex gap-3">
          <button
            onClick={onSkip}
            className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Overslaan (gelijke weging)
          </button>
          <button
            onClick={onComplete}
            className="px-6 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
          >
            Volgende
          </button>
        </div>
      </div>
    </div>
  )
}
