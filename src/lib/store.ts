import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Assessment, CompanyInfo, DimensionKey, DimensionScore, Score } from './types'
import { DIMENSION_KEYS } from './types'

function createEmptyScores(): DimensionScore[] {
  return DIMENSION_KEYS.map((key) => ({
    dimensionKey: key,
    score: 0 as Score,
    weight: 1.0,
    notes: '',
  }))
}

function createEmptyCompanyInfo(): CompanyInfo {
  return {
    companyName: '',
    industry: '',
    consultantName: '',
    assessmentDate: new Date().toISOString().split('T')[0],
    additionalNotes: '',
  }
}

export interface AssessmentStore {
  currentAssessment: Assessment | null
  currentStep: number
  savedAssessments: Assessment[]

  initNewAssessment: () => void
  setCompanyInfo: (info: CompanyInfo) => void
  setDimensionScore: (key: DimensionKey, score: Score, notes?: string) => void
  setDimensionWeight: (key: DimensionKey, weight: number) => void
  setStep: (step: number) => void
  saveAssessment: () => void
  loadAssessment: (id: string) => void
  deleteAssessment: (id: string) => void
  resetCurrent: () => void
  importAssessments: (assessments: Assessment[]) => void
}

export const useAssessmentStore = create<AssessmentStore>()(
  persist(
    (set, get) => ({
      currentAssessment: null,
      currentStep: 0,
      savedAssessments: [],

      initNewAssessment: () => {
        set({
          currentAssessment: {
            id: crypto.randomUUID(),
            companyInfo: createEmptyCompanyInfo(),
            scores: createEmptyScores(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          currentStep: 0,
        })
      },

      setCompanyInfo: (info) => {
        const current = get().currentAssessment
        if (!current) return
        set({
          currentAssessment: {
            ...current,
            companyInfo: info,
            updatedAt: new Date().toISOString(),
          },
        })
      },

      setDimensionScore: (key, score, notes) => {
        const current = get().currentAssessment
        if (!current) return
        set({
          currentAssessment: {
            ...current,
            scores: current.scores.map((s) =>
              s.dimensionKey === key
                ? { ...s, score, notes: notes !== undefined ? notes : s.notes }
                : s
            ),
            updatedAt: new Date().toISOString(),
          },
        })
      },

      setDimensionWeight: (key, weight) => {
        const current = get().currentAssessment
        if (!current) return
        set({
          currentAssessment: {
            ...current,
            scores: current.scores.map((s) =>
              s.dimensionKey === key ? { ...s, weight } : s
            ),
            updatedAt: new Date().toISOString(),
          },
        })
      },

      setStep: (step) => set({ currentStep: step }),

      saveAssessment: () => {
        const current = get().currentAssessment
        if (!current) return
        const saved = get().savedAssessments
        const existing = saved.findIndex((a) => a.id === current.id)
        const updated = { ...current, updatedAt: new Date().toISOString() }

        if (existing >= 0) {
          const newSaved = [...saved]
          newSaved[existing] = updated
          set({ savedAssessments: newSaved, currentAssessment: updated })
        } else {
          set({
            savedAssessments: [updated, ...saved],
            currentAssessment: updated,
          })
        }
      },

      loadAssessment: (id) => {
        const assessment = get().savedAssessments.find((a) => a.id === id)
        if (assessment) {
          set({ currentAssessment: { ...assessment }, currentStep: 0 })
        }
      },

      deleteAssessment: (id) => {
        set({
          savedAssessments: get().savedAssessments.filter((a) => a.id !== id),
        })
      },

      resetCurrent: () => {
        set({ currentAssessment: null, currentStep: 0 })
      },

      importAssessments: (assessments) => {
        const existing = get().savedAssessments
        const existingIds = new Set(existing.map((a) => a.id))
        const newOnes = assessments.filter((a) => !existingIds.has(a.id))
        set({ savedAssessments: [...newOnes, ...existing] })
      },
    }),
    {
      name: 'innovatieradar-store',
    }
  )
)
