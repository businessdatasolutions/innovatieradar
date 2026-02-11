import type { Assessment } from '@/lib/types'

interface ReportCoverProps {
  assessment: Assessment
}

export default function ReportCover({ assessment }: ReportCoverProps) {
  const { companyInfo } = assessment

  return (
    <div
      data-pdf-page
      style={{
        width: '794px',
        height: '1123px',
        background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 50%, #1e3a5f 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '80px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          border: '2px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-150px',
          left: '-150px',
          width: '500px',
          height: '500px',
          border: '2px solid rgba(255,255,255,0.05)',
          borderRadius: '50%',
        }}
      />

      <div style={{ textAlign: 'center', zIndex: 1 }}>
        <div
          style={{
            fontSize: '14px',
            letterSpacing: '6px',
            textTransform: 'uppercase',
            opacity: 0.7,
            marginBottom: '24px',
          }}
        >
          Assessment Rapport
        </div>
        <h1
          style={{
            fontSize: '48px',
            fontWeight: 700,
            margin: '0 0 16px 0',
            letterSpacing: '-1px',
          }}
        >
          INNOVATIERADAR
        </h1>
        <div
          style={{
            width: '80px',
            height: '3px',
            background: 'rgba(255,255,255,0.5)',
            margin: '0 auto 48px',
          }}
        />

        <div style={{ fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>
          {companyInfo.companyName}
        </div>
        <div style={{ fontSize: '16px', opacity: 0.8, marginBottom: '48px' }}>
          {companyInfo.industry}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '16px',
            fontSize: '14px',
            opacity: 0.7,
            maxWidth: '400px',
            margin: '0 auto',
          }}
        >
          <div>Datum: {companyInfo.assessmentDate}</div>
          <div>Consultant: {companyInfo.consultantName}</div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          textAlign: 'center',
          fontSize: '11px',
          opacity: 0.5,
          lineHeight: 1.6,
        }}
      >
        Gebaseerd op het Innovation Radar framework
        <br />
        Sawhney, Wolcott &amp; Arroniz (MIT Sloan Management Review, 2006)
      </div>
    </div>
  )
}
