export const DIMENSION_KEYS = [
  'offerings',
  'platform',
  'solutions',
  'customers',
  'customerExperience',
  'valueCapture',
  'processes',
  'organization',
  'supplyChain',
  'presence',
  'networking',
  'brand',
] as const

export type DimensionKey = (typeof DIMENSION_KEYS)[number]

export type Score = 1 | 2 | 3 | 4 | 5

export type InnovationLevel = 'systemic' | 'occasional' | 'little'

export type ProfileShape = 'balanced' | 'focused' | 'mixed'

export interface DimensionDefinition {
  key: DimensionKey
  label: string
  category: 'anchor' | 'bridge'
  anchorLabel?: 'WAT' | 'WIE' | 'HOE' | 'WAAR'
  focus: string
  diagnosticQuestion: string
  scoringGuide: {
    low: string
    medium: string
    high: string
  }
  examples: string[]
}

export interface DimensionScore {
  dimensionKey: DimensionKey
  score: Score
  weight: number
  notes: string
}

export interface CompanyInfo {
  companyName: string
  industry: string
  consultantName: string
  assessmentDate: string
  additionalNotes: string
}

export interface Assessment {
  id: string
  companyInfo: CompanyInfo
  scores: DimensionScore[]
  createdAt: string
  updatedAt: string
}

export interface AssessmentResults {
  magnitudeIndex: number
  innovationLevel: InnovationLevel
  profileShape: ProfileShape
  standardDeviation: number
  strengths: DimensionScore[]
  weaknesses: DimensionScore[]
  anchorAverage: number
  bridgeAverage: number
  interpretation: string
  anchorBridgeInterpretation: string
}
