import { useState } from 'react'
import { DIMENSIONS } from '@/lib/dimensions'
import { useAssessmentStore } from '@/lib/store'
import type { DimensionKey, Score } from '@/lib/types'
import DimensionScorer from './DimensionScorer'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'

interface DimensionWizardProps {
  onComplete: () => void
}

export default function DimensionWizard({ onComplete }: DimensionWizardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const assessment = useAssessmentStore((s) => s.currentAssessment)
  const setDimensionScore = useAssessmentStore((s) => s.setDimensionScore)

  if (!assessment) return null

  const dimension = DIMENSIONS[currentIndex]
  const currentScore = assessment.scores.find(
    (s) => s.dimensionKey === dimension.key
  )
  const allScored = assessment.scores.every((s) => s.score > 0)

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const handleNext = () => {
    if (currentIndex < DIMENSIONS.length - 1) {
      goTo(currentIndex + 1)
    }
  }

  const handlePrev = () => {
    if (currentIndex > 0) {
      goTo(currentIndex - 1)
    }
  }

  return (
    <div className="space-y-6">
      {/* Mini navigation */}
      <div className="flex justify-center gap-1.5 flex-wrap">
        {DIMENSIONS.map((d, i) => {
          const scored = assessment.scores.find(
            (s) => s.dimensionKey === d.key
          )
          return (
            <button
              key={d.key}
              onClick={() => goTo(i)}
              className={cn(
                'w-8 h-8 rounded-full text-xs font-medium transition-all',
                i === currentIndex
                  ? 'bg-primary text-white scale-110'
                  : scored && scored.score > 0
                    ? 'bg-primary-100 text-primary'
                    : 'bg-slate-100 text-slate-400'
              )}
              title={d.label}
            >
              {i + 1}
            </button>
          )
        })}
      </div>

      {/* Dimension counter */}
      <p className="text-center text-sm text-slate-500">
        Dimensie {currentIndex + 1} van {DIMENSIONS.length}
      </p>

      {/* Animated dimension card */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={dimension.key}
          initial={{ opacity: 0, x: direction * 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -50 }}
          transition={{ duration: 0.2 }}
        >
          <DimensionScorer
            dimensionKey={dimension.key as DimensionKey}
            score={currentScore?.score ?? 0}
            notes={currentScore?.notes ?? ''}
            onScoreChange={(score: Score) =>
              setDimensionScore(dimension.key as DimensionKey, score)
            }
            onNotesChange={(notes: string) =>
              setDimensionScore(
                dimension.key as DimensionKey,
                (currentScore?.score || 1) as Score,
                notes
              )
            }
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="flex items-center gap-1 px-4 py-2 text-sm text-slate-600 hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Vorige
        </button>

        {currentIndex < DIMENSIONS.length - 1 ? (
          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
          >
            Volgende
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onComplete}
            disabled={!allScored}
            className="px-6 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Door naar Weging
          </button>
        )}
      </div>
    </div>
  )
}
