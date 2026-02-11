import { Link } from 'react-router-dom'
import { ArrowRight, History, Radar } from 'lucide-react'
import { useAssessmentStore } from '@/lib/store'
import { DIMENSIONS } from '@/lib/dimensions'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar as RechartsRadar,
  ResponsiveContainer,
} from 'recharts'

const sampleData = DIMENSIONS.map((d, i) => ({
  dimension: d.label,
  score: [4, 2, 3, 5, 3, 2, 4, 3, 2, 4, 3, 5][i],
}))

export default function LandingPage() {
  const initNewAssessment = useAssessmentStore((s) => s.initNewAssessment)

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center">
              <Radar className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-primary">Innovatieradar</h1>
          </div>
          <p className="text-lg text-slate-600 mb-4">
            Breng de innovatiekracht van uw organisatie in kaart over 12 dimensies.
            Ontdek sterke punten, identificeer kansen en ontvang concrete aanbevelingen.
          </p>
          <p className="text-sm text-slate-500 mb-8">
            Gebaseerd op het wetenschappelijke Innovation Radar framework van Sawhney,
            Wolcott &amp; Arroniz (MIT Sloan Management Review, 2006).
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/assessment/info"
              onClick={initNewAssessment}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-light transition-colors no-underline"
            >
              Nieuwe Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/history"
              className="inline-flex items-center gap-2 bg-white text-primary border border-primary px-6 py-3 rounded-lg font-medium hover:bg-primary-50 transition-colors no-underline"
            >
              <History className="w-4 h-4" />
              Geschiedenis
            </Link>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-md aspect-square">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={sampleData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis
                  dataKey="dimension"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 5]}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  tickCount={6}
                />
                <RechartsRadar
                  name="Score"
                  dataKey="score"
                  stroke="#1e3a5f"
                  fill="#1e3a5f"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}
