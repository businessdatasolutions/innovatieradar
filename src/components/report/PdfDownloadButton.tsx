import { useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Download, Loader2 } from 'lucide-react'
import type { Assessment, AssessmentResults } from '@/lib/types'
import { generateRecommendations } from '@/lib/recommendations'
import { generatePdf } from '@/lib/pdf'
import ReportLayout from './ReportLayout'

interface PdfDownloadButtonProps {
  assessment: Assessment
  results: AssessmentResults
}

export default function PdfDownloadButton({ assessment, results }: PdfDownloadButtonProps) {
  const [generating, setGenerating] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const reportRef = useRef<HTMLDivElement>(null)

  const recommendations = generateRecommendations(results)

  const handleDownload = async () => {
    setGenerating(true)
    setShowReport(true)

    // Wait for render
    await new Promise((resolve) => setTimeout(resolve, 500))

    try {
      if (reportRef.current) {
        const fileName = `Innovatieradar_${assessment.companyInfo.companyName.replace(/\s+/g, '_')}_${assessment.companyInfo.assessmentDate}.pdf`
        await generatePdf(reportRef.current, fileName)
      }
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setGenerating(false)
      setShowReport(false)
    }
  }

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={generating}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-light transition-colors disabled:opacity-70"
      >
        {generating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Rapport genereren...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            Download PDF
          </>
        )}
      </button>

      {/* Hidden report for PDF capture */}
      {showReport &&
        createPortal(
          <div
            ref={reportRef}
            style={{
              position: 'absolute',
              left: '-9999px',
              top: 0,
            }}
          >
            <ReportLayout
              assessment={assessment}
              results={results}
              recommendations={recommendations}
            />
          </div>,
          document.body
        )}
    </>
  )
}
