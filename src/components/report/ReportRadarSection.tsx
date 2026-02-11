import type { Assessment } from '@/lib/types'
import { DIMENSIONS } from '@/lib/dimensions'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'

interface ReportRadarSectionProps {
  assessment: Assessment
}

export default function ReportRadarSection({ assessment }: ReportRadarSectionProps) {
  const data = assessment.scores.map((s) => ({
    dimension: DIMENSIONS.find((d) => d.key === s.dimensionKey)?.label ?? s.dimensionKey,
    score: s.score,
  }))

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
        Innovatieprofiel
      </h2>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
        <RadarChart width={580} height={500} data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 12, fill: '#475569' }} />
          <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fontSize: 10, fill: '#94a3b8' }} tickCount={6} />
          <Radar
            dataKey="score"
            stroke="#1e3a5f"
            fill="#1e3a5f"
            fillOpacity={0.15}
            strokeWidth={2}
            dot={{ r: 4, fill: '#1e3a5f' }}
            isAnimationActive={false}
          />
        </RadarChart>
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '32px',
          fontSize: '12px',
          color: '#64748b',
        }}
      >
        <span>1 = Statisch</span>
        <span>2 = Ondergemiddeld</span>
        <span>3 = Incidenteel</span>
        <span>4 = Bovengemiddeld</span>
        <span>5 = Systematisch</span>
      </div>
    </div>
  )
}
