import { DIMENSIONS } from '@/lib/dimensions'
import type { DimensionKey, Score } from '@/lib/types'
import ScoreSelector from './ScoreSelector'

interface DimensionScorerProps {
  dimensionKey: DimensionKey
  score: number
  notes: string
  onScoreChange: (score: Score) => void
  onNotesChange: (notes: string) => void
}

export default function DimensionScorer({
  dimensionKey,
  score,
  notes,
  onScoreChange,
  onNotesChange,
}: DimensionScorerProps) {
  const dimension = DIMENSIONS.find((d) => d.key === dimensionKey)!

  return (
    <div className="bg-white rounded-xl border border-border p-6 space-y-5">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-xl font-semibold text-primary">{dimension.label}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary font-medium">
            {dimension.category === 'anchor'
              ? `Anker (${dimension.anchorLabel})`
              : 'Brug'}
          </span>
        </div>
        <p className="text-sm text-slate-600">{dimension.focus}</p>
      </div>

      <div className="bg-surface rounded-lg p-4">
        <p className="text-sm font-medium text-slate-700 mb-1">Diagnostische vraag:</p>
        <p className="text-sm text-slate-600 italic">{dimension.diagnosticQuestion}</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-700">Score</p>
        <ScoreSelector value={score} onChange={onScoreChange} />
      </div>

      <div className="grid grid-cols-3 gap-3 text-xs">
        <div className="bg-danger-light rounded-lg p-3">
          <p className="font-semibold text-danger mb-1">1 — Statisch</p>
          <p className="text-slate-600">{dimension.scoringGuide.low}</p>
        </div>
        <div className="bg-warning-light rounded-lg p-3">
          <p className="font-semibold text-warning mb-1">3 — Incidenteel</p>
          <p className="text-slate-600">{dimension.scoringGuide.medium}</p>
        </div>
        <div className="bg-success-light rounded-lg p-3">
          <p className="font-semibold text-success mb-1">5 — Systematisch</p>
          <p className="text-slate-600">{dimension.scoringGuide.high}</p>
        </div>
      </div>

      {dimension.examples.length > 0 && (
        <p className="text-xs text-slate-400">
          Voorbeelden: {dimension.examples.join(', ')}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Notities (optioneel)
        </label>
        <textarea
          value={notes}
          onChange={(e) => onNotesChange(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
          placeholder="Observaties of toelichting..."
        />
      </div>
    </div>
  )
}
