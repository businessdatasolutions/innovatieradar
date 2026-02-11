import { DIMENSIONS } from './dimensions'
import type { AssessmentResults } from './types'

export function generateRecommendations(results: AssessmentResults): string[] {
  const recommendations: string[] = []

  const weakest = results.weaknesses[0]
  const weakDim = DIMENSIONS.find((d) => d.key === weakest?.dimensionKey)
  if (weakDim) {
    recommendations.push(
      `Prioriteitsgebied voor verbetering: ${weakDim.label} (score: ${weakest.score}/5). ` +
        `${weakDim.diagnosticQuestion} Bestudeer marktleiders die uitblinken in deze ` +
        `dimensie als benchmark.`
    )
  }

  const strongest = results.strengths[0]
  const strongDim = DIMENSIONS.find((d) => d.key === strongest?.dimensionKey)
  if (strongDim) {
    recommendations.push(
      `Benut uw sterkte in ${strongDim.label} (score: ${strongest.score}/5). ` +
        `Onderzoek hoe deze capaciteit kan worden uitgebreid om aangrenzende ` +
        `dimensies op de innovatieradar te versterken.`
    )
  }

  if (results.profileShape === 'focused') {
    recommendations.push(
      'Uw gefocuste innovatieprofiel suggereert kansen in verwaarloosde dimensies. ' +
        'Voer een "Blue Ocean" analyse uit op uw laagst scorende dimensies om ' +
        'competitieve witte ruimte te identificeren.'
    )
  } else if (results.profileShape === 'balanced' && results.magnitudeIndex < 4) {
    recommendations.push(
      'Uw evenwichtige profiel biedt een sterke basis. Om de status van ' +
        '"Systematische Innovator" te bereiken, versterk selectief de inspanningen ' +
        'in 2-3 dimensies waar doorbraakimpact mogelijk is.'
    )
  } else if (results.profileShape === 'mixed') {
    recommendations.push(
      'Uw profiel toont zowel sterke als zwakkere gebieden. Focus op het ' +
        'systematiseren van innovatie in de lagere dimensies terwijl u voortbouwt ' +
        'op bestaande sterktes.'
    )
  }

  if (results.innovationLevel === 'little') {
    recommendations.push(
      'Stel een formeel innovatieproces in: wijs innovatiechampions aan, ' +
        'reserveer tijd en budget, en creëer een gestructureerde pijplijn ' +
        'voor het evalueren en implementeren van ideeën over alle 12 dimensies.'
    )
  }

  return recommendations
}

export function generateSummary(results: AssessmentResults): string {
  const strongDim = DIMENSIONS.find((d) => d.key === results.strengths[0]?.dimensionKey)
  const weakDim = DIMENSIONS.find((d) => d.key === results.weaknesses[0]?.dimensionKey)

  const levelText =
    results.innovationLevel === 'systemic'
      ? 'een systematische innovator met sterke capaciteiten over de hele linie'
      : results.innovationLevel === 'occasional'
        ? 'een incidentele innovator die af en toe innoveert maar nog geen consistente aanpak heeft'
        : 'een organisatie met weinig tot geen innovatie-activiteit'

  return (
    `Het bedrijf kwalificeert zich als ${levelText} met een Magnitude Index van ` +
    `${results.magnitudeIndex.toFixed(2)} op 5. ` +
    (strongDim
      ? `De sterkste dimensie is ${strongDim.label} (${results.strengths[0].score}/5). `
      : '') +
    (weakDim
      ? `Het grootste ontwikkelpunt ligt bij ${weakDim.label} (${results.weaknesses[0].score}/5).`
      : '')
  )
}
