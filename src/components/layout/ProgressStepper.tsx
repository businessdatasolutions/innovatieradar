import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

const STEPS = [
  { label: 'Bedrijfsgegevens', step: 0 },
  { label: 'Dimensies', step: 1 },
  { label: 'Weging', step: 2 },
  { label: 'Controle', step: 3 },
]

interface ProgressStepperProps {
  currentStep: number
}

export default function ProgressStepper({ currentStep }: ProgressStepperProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-6">
      {STEPS.map(({ label, step }, i) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                step < currentStep
                  ? 'bg-primary text-white'
                  : step === currentStep
                    ? 'bg-primary text-white'
                    : 'bg-slate-200 text-slate-500'
              )}
            >
              {step < currentStep ? <Check className="w-4 h-4" /> : step + 1}
            </div>
            <span
              className={cn(
                'text-xs mt-1 whitespace-nowrap',
                step <= currentStep ? 'text-primary font-medium' : 'text-slate-400'
              )}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={cn(
                'w-12 h-0.5 mx-2 mt-[-1rem]',
                step < currentStep ? 'bg-primary' : 'bg-slate-200'
              )}
            />
          )}
        </div>
      ))}
    </div>
  )
}
