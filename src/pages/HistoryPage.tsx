import { useNavigate, Link } from 'react-router-dom'
import { useAssessmentStore } from '@/lib/store'
import { calculateMagnitudeIndex, classifyInnovationLevel, getInnovationLevelLabel, getInnovationLevelColor } from '@/lib/scoring'
import { Trash2, Download, Upload, FileText, Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import type { Assessment } from '@/lib/types'

export default function HistoryPage() {
  const navigate = useNavigate()
  const savedAssessments = useAssessmentStore((s) => s.savedAssessments)
  const loadAssessment = useAssessmentStore((s) => s.loadAssessment)
  const deleteAssessment = useAssessmentStore((s) => s.deleteAssessment)
  const importAssessments = useAssessmentStore((s) => s.importAssessments)
  const initNewAssessment = useAssessmentStore((s) => s.initNewAssessment)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLoad = (id: string) => {
    loadAssessment(id)
    navigate('/results')
  }

  const handleDelete = (id: string) => {
    deleteAssessment(id)
    setDeleteId(null)
  }

  const handleExport = () => {
    const data = JSON.stringify(savedAssessments, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `innovatieradar_export_${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string) as Assessment[]
        if (Array.isArray(data)) {
          importAssessments(data)
        }
      } catch {
        alert('Ongeldig bestand. Zorg dat het een geldig JSON-bestand is.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleNew = () => {
    initNewAssessment()
    navigate('/assessment/info')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Opgeslagen Assessments</h2>
        <div className="flex gap-2">
          <button
            onClick={handleNew}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-light transition-colors"
          >
            <Plus className="w-4 h-4" />
            Nieuw
          </button>
          {savedAssessments.length > 0 && (
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exporteer
            </button>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-sm border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Importeer
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImport}
            className="hidden"
          />
        </div>
      </div>

      {savedAssessments.length === 0 ? (
        <div className="text-center py-16">
          <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">Nog geen assessments opgeslagen.</p>
          <Link
            to="/assessment/info"
            onClick={() => initNewAssessment()}
            className="text-primary hover:underline"
          >
            Start uw eerste assessment
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {savedAssessments
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((a) => {
              const mi = calculateMagnitudeIndex(a.scores)
              const level = classifyInnovationLevel(mi)
              return (
                <div
                  key={a.id}
                  className="bg-white rounded-xl border border-border p-4 flex items-center gap-4 hover:border-primary/30 transition-colors"
                >
                  <button
                    onClick={() => handleLoad(a.id)}
                    className="flex-1 text-left"
                  >
                    <div className="font-semibold text-slate-800">
                      {a.companyInfo.companyName}
                    </div>
                    <div className="text-sm text-slate-500">
                      {a.companyInfo.industry} &middot; {a.companyInfo.assessmentDate}
                    </div>
                  </button>
                  <div className="text-right shrink-0">
                    <div className="text-lg font-bold text-primary">{mi.toFixed(2)}</div>
                    <div className={`text-xs font-medium ${getInnovationLevelColor(level)}`}>
                      {getInnovationLevelLabel(level)}
                    </div>
                  </div>
                  <button
                    onClick={() => setDeleteId(a.id)}
                    className="p-2 text-slate-400 hover:text-danger transition-colors shrink-0"
                    title="Verwijder"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="font-semibold text-slate-800 mb-2">Assessment verwijderen?</h3>
            <p className="text-sm text-slate-500 mb-4">
              Deze actie kan niet ongedaan worden gemaakt.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
              >
                Annuleren
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 text-sm bg-danger text-white rounded-lg hover:bg-red-700"
              >
                Verwijderen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
