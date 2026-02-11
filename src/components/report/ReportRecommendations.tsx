import type { Assessment, AssessmentResults } from '@/lib/types'

interface ReportRecommendationsProps {
  assessment: Assessment
  results: AssessmentResults
  recommendations: string[]
}

export default function ReportRecommendations({
  assessment,
  recommendations,
}: ReportRecommendationsProps) {
  return (
    <div
      data-pdf-page
      style={{
        width: '794px',
        minHeight: '1123px',
        padding: '60px 70px',
        fontFamily: 'Inter, sans-serif',
        color: '#1a202c',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1e3a5f', margin: '0 0 40px 0' }}>
        Aanbevelingen &amp; Vervolgstappen
      </h2>

      {/* Recommendations */}
      <div style={{ marginBottom: '40px' }}>
        {recommendations.map((rec, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '20px',
              alignItems: 'flex-start',
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#f0f5fa',
                color: '#1e3a5f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '14px',
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7, margin: 0 }}>
              {rec}
            </p>
          </div>
        ))}
      </div>

      {/* Next steps */}
      <div
        style={{
          background: '#f8fafc',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '40px',
        }}
      >
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#1e3a5f', marginBottom: '16px' }}>
          Vervolgstappen
        </h3>
        <ul style={{ fontSize: '14px', color: '#475569', lineHeight: 2, paddingLeft: '20px' }}>
          <li>Plan verdiepende workshops voor de dimensies met de grootste kansen</li>
          <li>Benchmark het innovatieprofiel tegen directe concurrenten</li>
          <li>Stel concrete innovatiedoelen voor de komende 6 maanden</li>
          <li>Voer een herassessment uit over 12 maanden om voortgang te meten</li>
        </ul>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 'auto',
          borderTop: '1px solid #e2e8f0',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#94a3b8',
        }}
      >
        <div>
          <div>{assessment.companyInfo.consultantName}</div>
          <div>{assessment.companyInfo.assessmentDate}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div>Innovatieradar Assessment</div>
          <div>Methodologie: Sawhney, Wolcott &amp; Arroniz (2006)</div>
        </div>
      </div>
    </div>
  )
}
