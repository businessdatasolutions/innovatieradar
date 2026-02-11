import type { ProfileShape } from '@/lib/types'

interface ShapeAnalysisProps {
  shape: ProfileShape
  standardDeviation: number
  interpretation: string
}

const SHAPE_LABELS: Record<ProfileShape, string> = {
  balanced: 'Evenwichtig profiel (rond)',
  mixed: 'Gemengd profiel',
  focused: 'Gefocust profiel (puntig)',
}

export default function ShapeAnalysis({ shape, standardDeviation, interpretation }: ShapeAnalysisProps) {
  return (
    <div className="bg-white rounded-xl border border-border p-5">
      <h3 className="font-semibold text-slate-800 mb-3">Profielanalyse</h3>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-sm font-medium px-3 py-1 rounded-full bg-primary-50 text-primary">
          {SHAPE_LABELS[shape]}
        </span>
        <span className="text-xs text-slate-400">
          SD: {standardDeviation.toFixed(2)}
        </span>
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{interpretation}</p>
    </div>
  )
}
