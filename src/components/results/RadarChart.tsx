import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { DIMENSIONS } from '@/lib/dimensions'
import type { DimensionScore } from '@/lib/types'

interface InnovationRadarChartProps {
  scores: DimensionScore[]
  size?: 'sm' | 'lg'
  animate?: boolean
}

export default function InnovationRadarChart({
  scores,
  size = 'lg',
  animate = true,
}: InnovationRadarChartProps) {
  const data = scores.map((s) => ({
    dimension: DIMENSIONS.find((d) => d.key === s.dimensionKey)?.label ?? s.dimensionKey,
    score: s.score,
    fullMark: 5,
  }))

  const fontSize = size === 'lg' ? 11 : 9

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadarChart data={data} cx="50%" cy="50%" outerRadius={size === 'lg' ? '75%' : '70%'}>
        <PolarGrid stroke="#e2e8f0" />
        <PolarAngleAxis
          dataKey="dimension"
          tick={{ fontSize, fill: '#64748b' }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 5]}
          tick={{ fontSize: 10, fill: '#94a3b8' }}
          tickCount={6}
        />
        <Radar
          name="Score"
          dataKey="score"
          stroke="#1e3a5f"
          fill="#1e3a5f"
          fillOpacity={0.15}
          strokeWidth={2}
          isAnimationActive={animate}
          dot={{ r: 4, fill: '#1e3a5f' }}
        />
        {size === 'lg' && (
          <Tooltip
            content={({ payload }) => {
              if (!payload || payload.length === 0) return null
              const item = payload[0]
              return (
                <div className="bg-white border border-border rounded-lg shadow-sm px-3 py-2 text-sm">
                  <p className="font-medium text-slate-800">{item.payload.dimension}</p>
                  <p className="text-primary font-semibold">{item.value} / 5</p>
                </div>
              )
            }}
          />
        )}
      </RechartsRadarChart>
    </ResponsiveContainer>
  )
}
