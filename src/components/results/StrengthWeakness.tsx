import { DIMENSIONS } from '@/lib/dimensions'
import type { DimensionScore } from '@/lib/types'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StrengthWeaknessProps {
  strengths: DimensionScore[]
  weaknesses: DimensionScore[]
}

export default function StrengthWeakness({ strengths, weaknesses }: StrengthWeaknessProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-success" />
          <h3 className="font-semibold text-slate-800">Sterke punten</h3>
        </div>
        <div className="space-y-2">
          {strengths.map((s) => {
            const dim = DIMENSIONS.find((d) => d.key === s.dimensionKey)
            return (
              <div key={s.dimensionKey} className="flex items-center justify-between bg-success-light rounded-lg px-3 py-2">
                <span className="text-sm font-medium text-slate-700">{dim?.label}</span>
                <span className="text-sm font-bold text-success">{s.score}/5</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="w-5 h-5 text-warning" />
          <h3 className="font-semibold text-slate-800">Kansen</h3>
        </div>
        <div className="space-y-2">
          {weaknesses.map((s) => {
            const dim = DIMENSIONS.find((d) => d.key === s.dimensionKey)
            return (
              <div key={s.dimensionKey} className="flex items-center justify-between bg-warning-light rounded-lg px-3 py-2">
                <span className="text-sm font-medium text-slate-700">{dim?.label}</span>
                <span className="text-sm font-bold text-warning">{s.score}/5</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
