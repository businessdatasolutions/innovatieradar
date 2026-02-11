import type { InnovationLevel } from '@/lib/types'
import { getInnovationLevelLabel, getInnovationLevelColor, getInnovationLevelBg } from '@/lib/scoring'
import { cn } from '@/lib/utils'

interface MagnitudeGaugeProps {
  magnitudeIndex: number
  level: InnovationLevel
}

export default function MagnitudeGauge({ magnitudeIndex, level }: MagnitudeGaugeProps) {
  return (
    <div className={cn('rounded-xl p-6 text-center', getInnovationLevelBg(level))}>
      <p className="text-sm text-slate-500 mb-1">Magnitude Index</p>
      <p className={cn('text-5xl font-bold', getInnovationLevelColor(level))}>
        {magnitudeIndex.toFixed(2)}
      </p>
      <p className="text-lg text-slate-500 mb-2">/ 5.00</p>
      <p className={cn('text-sm font-semibold', getInnovationLevelColor(level))}>
        {getInnovationLevelLabel(level)}
      </p>
    </div>
  )
}
