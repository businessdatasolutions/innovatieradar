import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas-pro'

export async function generatePdf(
  reportElement: HTMLElement,
  fileName: string
): Promise<void> {
  const pages = reportElement.querySelectorAll<HTMLElement>('[data-pdf-page]')
  if (pages.length === 0) return

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const a4Width = 210
  const a4Height = 297

  for (let i = 0; i < pages.length; i++) {
    const page = pages[i]

    const canvas = await html2canvas(page, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: page.scrollWidth,
      height: page.scrollHeight,
    })

    const imgData = canvas.toDataURL('image/png')
    const imgWidth = a4Width
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    if (i > 0) pdf.addPage()

    // If content is taller than A4, scale to fit
    if (imgHeight > a4Height) {
      const scale = a4Height / imgHeight
      const scaledWidth = imgWidth * scale
      const xOffset = (a4Width - scaledWidth) / 2
      pdf.addImage(imgData, 'PNG', xOffset, 0, scaledWidth, a4Height)
    } else {
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
    }
  }

  pdf.setProperties({
    title: fileName.replace('.pdf', ''),
    creator: 'Innovatieradar',
    subject: 'Innovatiekracht Assessment',
  })

  pdf.save(fileName)
}
