import type { Assessment } from '@/lib/types'
import { DIMENSIONS, SCORE_LABELS } from '@/lib/dimensions'

interface ReportScoreSectionProps {
  assessment: Assessment
}

export default function ReportScoreSection({ assessment }: ReportScoreSectionProps) {
  const anchors = assessment.scores.filter((s) => {
    const d = DIMENSIONS.find((dim) => dim.key === s.dimensionKey)
    return d?.category === 'anchor'
  })
  const bridges = assessment.scores.filter((s) => {
    const d = DIMENSIONS.find((dim) => dim.key === s.dimensionKey)
    return d?.category === 'bridge'
  })

  const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '13px',
  }

  const thStyle: React.CSSProperties = {
    textAlign: 'left',
    padding: '8px 12px',
    borderBottom: '2px solid #e2e8f0',
    color: '#64748b',
    fontWeight: 600,
    fontSize: '12px',
  }

  const tdStyle: React.CSSProperties = {
    padding: '8px 12px',
    borderBottom: '1px solid #f1f5f9',
  }

  const renderTable = (title: string, scores: typeof assessment.scores) => (
    <div style={{ marginBottom: '32px' }}>
      <h3
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#1e3a5f',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          marginBottom: '12px',
        }}
      >
        {title}
      </h3>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Dimensie</th>
            <th style={{ ...thStyle, textAlign: 'center', width: '60px' }}>Score</th>
            <th style={{ ...thStyle, textAlign: 'center', width: '80px' }}>Niveau</th>
            <th style={{ ...thStyle, textAlign: 'center', width: '60px' }}>Gewicht</th>
            <th style={{ ...thStyle, textAlign: 'center', width: '80px' }}>Gewogen</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((s) => {
            const dim = DIMENSIONS.find((d) => d.key === s.dimensionKey)
            return (
              <tr key={s.dimensionKey}>
                <td style={{ ...tdStyle, fontWeight: 500, color: '#334155' }}>
                  {dim?.label}
                  {dim?.anchorLabel && (
                    <span style={{ fontSize: '11px', color: '#94a3b8', marginLeft: '6px' }}>
                      ({dim.anchorLabel})
                    </span>
                  )}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 600, color: '#1e3a5f' }}>
                  {s.score}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center', color: '#64748b', fontSize: '12px' }}>
                  {SCORE_LABELS[s.score]}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center', color: '#64748b' }}>
                  {s.weight.toFixed(1)}
                </td>
                <td style={{ ...tdStyle, textAlign: 'center', fontWeight: 600, color: '#1e3a5f' }}>
                  {(s.score * s.weight).toFixed(1)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )

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
        Gedetailleerde Scores
      </h2>

      {renderTable('Ankers', anchors)}
      {renderTable('Bruggen', bridges)}

      {/* Bar chart */}
      <div style={{ marginTop: '16px' }}>
        {assessment.scores.map((s) => {
          const dim = DIMENSIONS.find((d) => d.key === s.dimensionKey)
          const pct = (s.score / 5) * 100
          return (
            <div
              key={s.dimensionKey}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '6px',
              }}
            >
              <div style={{ width: '120px', fontSize: '12px', color: '#475569', textAlign: 'right' }}>
                {dim?.label}
              </div>
              <div
                style={{
                  flex: 1,
                  height: '16px',
                  background: '#f1f5f9',
                  borderRadius: '8px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #1e3a5f, #2d5a8e)',
                    borderRadius: '8px',
                  }}
                />
              </div>
              <div style={{ width: '30px', fontSize: '12px', fontWeight: 600, color: '#1e3a5f' }}>
                {s.score}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
