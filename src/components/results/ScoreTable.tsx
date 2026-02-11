import { DIMENSIONS, SCORE_LABELS } from '@/lib/dimensions'
import type { DimensionScore } from '@/lib/types'

interface ScoreTableProps {
  scores: DimensionScore[]
}

export default function ScoreTable({ scores }: ScoreTableProps) {
  const anchors = scores.filter((s) => {
    const d = DIMENSIONS.find((dim) => dim.key === s.dimensionKey)
    return d?.category === 'anchor'
  })
  const bridges = scores.filter((s) => {
    const d = DIMENSIONS.find((dim) => dim.key === s.dimensionKey)
    return d?.category === 'bridge'
  })

  const renderGroup = (title: string, items: DimensionScore[]) => (
    <div>
      <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
        {title}
      </h4>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 text-slate-500 font-medium">Dimensie</th>
              <th className="text-center py-2 text-slate-500 font-medium w-16">Score</th>
              <th className="text-center py-2 text-slate-500 font-medium w-20">Niveau</th>
              <th className="text-center py-2 text-slate-500 font-medium w-16">Gewicht</th>
              <th className="text-left py-2 text-slate-500 font-medium">Notities</th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => {
              const dim = DIMENSIONS.find((d) => d.key === s.dimensionKey)
              return (
                <tr key={s.dimensionKey} className="border-b border-border/50">
                  <td className="py-2 font-medium text-slate-700">{dim?.label}</td>
                  <td className="py-2 text-center font-semibold text-primary">{s.score}</td>
                  <td className="py-2 text-center text-xs text-slate-500">
                    {SCORE_LABELS[s.score]}
                  </td>
                  <td className="py-2 text-center text-slate-500">{s.weight.toFixed(1)}</td>
                  <td className="py-2 text-xs text-slate-500 truncate max-w-48">
                    {s.notes || '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-xl border border-border p-5 space-y-6">
      <h3 className="font-semibold text-slate-800">Gedetailleerde Scores</h3>
      {renderGroup('Ankers', anchors)}
      {renderGroup('Bruggen', bridges)}
    </div>
  )
}
