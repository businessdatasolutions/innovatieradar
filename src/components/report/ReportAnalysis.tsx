import type { AssessmentResults } from '@/lib/types'
import { DIMENSIONS } from '@/lib/dimensions'
import { getInnovationLevelLabel } from '@/lib/scoring'

interface ReportAnalysisProps {
  results: AssessmentResults
}

const SHAPE_LABELS = {
  balanced: 'Evenwichtig profiel (rond)',
  mixed: 'Gemengd profiel',
  focused: 'Gefocust profiel (puntig)',
}

export default function ReportAnalysis({ results }: ReportAnalysisProps) {
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
      <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#1e3a5f', margin: '0 0 40px 0' }}>
        Analyse
      </h2>

      {/* Innovation level */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#334155', marginBottom: '12px' }}>
          Innovatieniveau: {getInnovationLevelLabel(results.innovationLevel)}
        </h3>
        <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>
          {results.innovationLevel === 'systemic'
            ? 'De organisatie kwalificeert zich als Systematische Innovator. Innovatie is verankerd in het DNA van de organisatie — het is continu, doelgericht en waardecreërend. De organisatie heeft een bewezen staat van dienst in herhaald succes over meerdere dimensies.'
            : results.innovationLevel === 'occasional'
              ? 'De organisatie kwalificeert zich als Incidentele Innovator. Er wordt af en toe geïnnoveerd, maar dit is eerder een reactie op omstandigheden dan een bewust proces. Innovatie is een gebeurtenis, geen gewoonte. De organisatie is kwetsbaar voor disruptie door meer systematische concurrenten.'
              : 'De organisatie vertoont weinig tot geen innovatie-activiteit. De organisatie is reactief en dreigt te stagneren. Er is een hoog risico op veroudering en verlies van concurrentiepositie als er niet snel actie wordt ondernomen.'}
        </p>
      </div>

      {/* Profile shape */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#334155', marginBottom: '12px' }}>
          Profielvorm: {SHAPE_LABELS[results.profileShape]}
        </h3>
        <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>
          {results.interpretation}
        </p>
      </div>

      {/* Strengths */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#334155', marginBottom: '12px' }}>
          Sterke Punten
        </h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          {results.strengths.map((s) => {
            const dim = DIMENSIONS.find((d) => d.key === s.dimensionKey)
            return (
              <div
                key={s.dimensionKey}
                style={{
                  flex: 1,
                  background: '#f0fdf4',
                  borderRadius: '8px',
                  padding: '16px',
                  border: '1px solid #bbf7d0',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#16a34a' }}>
                  {dim?.label}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#16a34a' }}>
                  {s.score}/5
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Weaknesses / Opportunities */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#334155', marginBottom: '12px' }}>
          Kansen voor Verbetering
        </h3>
        <div style={{ display: 'flex', gap: '12px' }}>
          {results.weaknesses.map((s) => {
            const dim = DIMENSIONS.find((d) => d.key === s.dimensionKey)
            return (
              <div
                key={s.dimensionKey}
                style={{
                  flex: 1,
                  background: '#fef3c7',
                  borderRadius: '8px',
                  padding: '16px',
                  border: '1px solid #fde68a',
                }}
              >
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#d97706' }}>
                  {dim?.label}
                </div>
                <div style={{ fontSize: '24px', fontWeight: 700, color: '#d97706' }}>
                  {s.score}/5
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Anchor vs Bridge */}
      <div>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#334155', marginBottom: '12px' }}>
          Anker vs. Brug Analyse
        </h3>
        <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.7 }}>
          {results.anchorBridgeInterpretation}
        </p>
      </div>
    </div>
  )
}
