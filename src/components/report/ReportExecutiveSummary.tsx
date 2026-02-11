import type { Assessment, AssessmentResults } from '@/lib/types'
import { getInnovationLevelLabel } from '@/lib/scoring'
import { generateSummary } from '@/lib/recommendations'
import { DIMENSIONS } from '@/lib/dimensions'

interface ReportExecutiveSummaryProps {
  assessment: Assessment
  results: AssessmentResults
}

export default function ReportExecutiveSummary({ assessment, results }: ReportExecutiveSummaryProps) {
  const summary = generateSummary(results)
  const strongDim = DIMENSIONS.find((d) => d.key === results.strengths[0]?.dimensionKey)
  const weakDim = DIMENSIONS.find((d) => d.key === results.weaknesses[0]?.dimensionKey)

  const levelColor =
    results.innovationLevel === 'systemic'
      ? '#16a34a'
      : results.innovationLevel === 'occasional'
        ? '#d97706'
        : '#dc2626'

  return (
    <div
      data-pdf-page
      style={{
        width: '794px',
        minHeight: '1123px',
        padding: '60px 70px',
        fontFamily: 'Inter, sans-serif',
        color: '#1a202c',
      }}
    >
      <div
        style={{
          fontSize: '11px',
          color: '#64748b',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          marginBottom: '8px',
        }}
      >
        {assessment.companyInfo.companyName}
      </div>
      <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1e3a5f', margin: '0 0 40px 0' }}>
        Management Samenvatting
      </h2>

      {/* Magnitude Index box */}
      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '12px',
          padding: '32px',
          textAlign: 'center',
          marginBottom: '32px',
        }}
      >
        <div style={{ fontSize: '13px', color: '#64748b', marginBottom: '8px' }}>
          Magnitude Index
        </div>
        <div style={{ fontSize: '56px', fontWeight: 700, color: levelColor }}>
          {results.magnitudeIndex.toFixed(2)}
        </div>
        <div style={{ fontSize: '18px', color: '#94a3b8', marginBottom: '8px' }}>/ 5.00</div>
        <div style={{ fontSize: '16px', fontWeight: 600, color: levelColor }}>
          {getInnovationLevelLabel(results.innovationLevel)}
        </div>
      </div>

      {/* Key findings grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          marginBottom: '32px',
        }}
      >
        <div style={{ background: '#f0fdf4', borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
            Sterkste dimensie
          </div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#16a34a' }}>
            {strongDim?.label} ({results.strengths[0]?.score}/5)
          </div>
        </div>
        <div style={{ background: '#fef3c7', borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
            Grootste kans
          </div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#d97706' }}>
            {weakDim?.label} ({results.weaknesses[0]?.score}/5)
          </div>
        </div>
        <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
            Gemiddelde Ankers
          </div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e3a5f' }}>
            {results.anchorAverage.toFixed(2)}
          </div>
        </div>
        <div style={{ background: '#f8fafc', borderRadius: '8px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '4px' }}>
            Gemiddelde Bruggen
          </div>
          <div style={{ fontSize: '16px', fontWeight: 600, color: '#1e3a5f' }}>
            {results.bridgeAverage.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Summary text */}
      <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>{summary}</p>
    </div>
  )
}
