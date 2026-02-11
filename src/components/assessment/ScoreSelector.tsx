import { cn } from '@/lib/utils'
import { SCORE_LABELS } from '@/lib/dimensions'
import type { Score } from '@/lib/types'

interface ScoreSelectorProps {
  value: number
  onChange: (score: Score) => void
}

export default function ScoreSelector({ value, onChange }: ScoreSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between gap-2">
        {([1, 2, 3, 4, 5] as Score[]).map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            className={cn(
              'flex-1 flex flex-col items-center gap-1 py-3 px-2 rounded-lg border-2 transition-all cursor-pointer',
              value === score
                ? 'border-primary bg-primary-50 text-primary'
                : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50'
            )}
          >
            <span className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm',
              value === score ? 'bg-primary text-white' : 'bg-slate-100'
            )}>
              {score}
            </span>
            <span className="text-xs text-center leading-tight">{SCORE_LABELS[score]}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
