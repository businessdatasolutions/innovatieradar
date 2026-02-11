import { useForm } from 'react-hook-form'
import type { CompanyInfo } from '@/lib/types'

interface CompanyInfoFormProps {
  defaultValues: CompanyInfo
  onSubmit: (data: CompanyInfo) => void
}

export default function CompanyInfoForm({ defaultValues, onSubmit }: CompanyInfoFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CompanyInfo>({
    defaultValues,
    mode: 'onBlur',
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-lg mx-auto">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Bedrijfsnaam *
        </label>
        <input
          {...register('companyName')}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          placeholder="Naam van het bedrijf"
        />
        {errors.companyName && (
          <p className="text-danger text-xs mt-1">{errors.companyName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Branche *
        </label>
        <input
          {...register('industry')}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          placeholder="Bijv. Technologie, Productie, Dienstverlening"
        />
        {errors.industry && (
          <p className="text-danger text-xs mt-1">{errors.industry.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Consultant *
        </label>
        <input
          {...register('consultantName')}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          placeholder="Uw naam"
        />
        {errors.consultantName && (
          <p className="text-danger text-xs mt-1">{errors.consultantName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Datum *
        </label>
        <input
          {...register('assessmentDate')}
          type="date"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
        {errors.assessmentDate && (
          <p className="text-danger text-xs mt-1">{errors.assessmentDate.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Opmerkingen
        </label>
        <textarea
          {...register('additionalNotes')}
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none"
          placeholder="Optionele opmerkingen over deze assessment..."
        />
        {errors.additionalNotes && (
          <p className="text-danger text-xs mt-1">{errors.additionalNotes.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Volgende
      </button>
    </form>
  )
}
