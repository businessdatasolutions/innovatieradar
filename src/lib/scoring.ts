import { DIMENSIONS } from './dimensions'
import type {
  AssessmentResults,
  DimensionScore,
  InnovationLevel,
  ProfileShape,
} from './types'

export function calculateMagnitudeIndex(scores: DimensionScore[]): number {
  const totalWeighted = scores.reduce((sum, s) => sum + s.score * s.weight, 0)
  const totalWeight = scores.reduce((sum, s) => sum + s.weight, 0)
  if (totalWeight === 0) return 0
  return totalWeighted / totalWeight
}

export function classifyInnovationLevel(magnitudeIndex: number): InnovationLevel {
  if (magnitudeIndex >= 4.0) return 'systemic'
  if (magnitudeIndex >= 3.0) return 'occasional'
  return 'little'
}

export function getInnovationLevelLabel(level: InnovationLevel): string {
  switch (level) {
    case 'systemic':
      return 'Systematische Innovator'
    case 'occasional':
      return 'Incidentele Innovator'
    case 'little':
      return 'Weinig tot Geen Innovatie'
  }
}

export function getInnovationLevelColor(level: InnovationLevel): string {
  switch (level) {
    case 'systemic':
      return 'text-success'
    case 'occasional':
      return 'text-warning'
    case 'little':
      return 'text-danger'
  }
}

export function getInnovationLevelBg(level: InnovationLevel): string {
  switch (level) {
    case 'systemic':
      return 'bg-success-light'
    case 'occasional':
      return 'bg-warning-light'
    case 'little':
      return 'bg-danger-light'
  }
}

export function analyzeProfileShape(scores: DimensionScore[]): {
  shape: ProfileShape
  standardDeviation: number
  interpretation: string
} {
  const values = scores.map((s) => s.score)
  const mean = values.reduce((a, b) => a + b, 0) / values.length
  const variance = values.reduce((sum, v) => sum + Math.pow(v - mean, 2), 0) / values.length
  const sd = Math.sqrt(variance)

  let shape: ProfileShape
  let interpretation: string

  const level = classifyInnovationLevel(mean)

  if (sd < 0.8) {
    shape = 'balanced'
    if (level === 'systemic') {
      interpretation =
        'Het innovatieprofiel is relatief rond en op hoog niveau, wat wijst op een ' +
        'evenwichtige, holistische benadering van innovatie over alle dimensies. ' +
        'Het bedrijf behandelt innovatie als een samenhangend geheel — een kenmerk ' +
        'van wereldklasse-innovators.'
    } else if (level === 'occasional') {
      interpretation =
        'Het innovatieprofiel is relatief rond, maar op een gemiddeld niveau. ' +
        'De organisatie scoort consistent, maar nog niet hoog genoeg voor ' +
        'systematische innovatie. Er liggen kansen om over de hele linie naar ' +
        'een hoger niveau te groeien.'
    } else {
      interpretation =
        'Het innovatieprofiel is weliswaar rond, maar op een laag niveau. ' +
        'De organisatie scoort consistent laag over vrijwel alle dimensies, ' +
        'wat wijst op een breed gebrek aan innovatie-activiteit. ' +
        'Een structurele aanpak is nodig om de innovatiekracht op te bouwen.'
    }
  } else if (sd >= 1.3) {
    shape = 'focused'
    interpretation =
      'Het innovatieprofiel toont uitgesproken pieken, wat wijst op een ' +
      'sterk gefocuste strategie die zich concentreert op specifieke dimensies ' +
      'terwijl andere worden verwaarloosd. Dit kan een bewuste strategische ' +
      'keuze zijn, maar kan ook blinde vlekken signaleren die concurrenten ' +
      'kunnen benutten. Overweeg of verwaarloosde dimensies onbenutte ' +
      '"Blue Ocean" kansen vertegenwoordigen.'
  } else {
    shape = 'mixed'
    if (level === 'little') {
      interpretation =
        'Het innovatieprofiel toont enige variatie over de dimensies, maar ' +
        'het algehele niveau is laag. Er zijn enkele lichtpunten, maar de ' +
        'meeste dimensies vragen om substantiële verbetering.'
    } else {
      interpretation =
        'Het innovatieprofiel toont matige variatie over de dimensies, wat ' +
        'wijst op sterke gebieden naast ontwikkelpunten. Dit is gebruikelijk ' +
        'voor bedrijven die zijn begonnen met innoveren maar nog geen volledig ' +
        'systematische aanpak hebben geadopteerd.'
    }
  }

  return { shape, standardDeviation: sd, interpretation }
}

export function identifyStrengthsAndWeaknesses(scores: DimensionScore[]): {
  strengths: DimensionScore[]
  weaknesses: DimensionScore[]
} {
  const sorted = [...scores].sort((a, b) => b.score * b.weight - a.score * a.weight)
  return {
    strengths: sorted.slice(0, 3),
    weaknesses: sorted.slice(-3).reverse(),
  }
}

export function analyzeAnchorVsBridge(scores: DimensionScore[]): {
  anchorAverage: number
  bridgeAverage: number
  interpretation: string
} {
  const anchors = scores.filter((s) => {
    const dim = DIMENSIONS.find((d) => d.key === s.dimensionKey)
    return dim?.category === 'anchor'
  })
  const bridges = scores.filter((s) => {
    const dim = DIMENSIONS.find((d) => d.key === s.dimensionKey)
    return dim?.category === 'bridge'
  })

  const anchorAvg = anchors.reduce((sum, s) => sum + s.score, 0) / (anchors.length || 1)
  const bridgeAvg = bridges.reduce((sum, s) => sum + s.score, 0) / (bridges.length || 1)
  const diff = Math.abs(anchorAvg - bridgeAvg)

  let interpretation: string
  if (diff < 0.5) {
    interpretation =
      'Het bedrijf toont vergelijkbare innovatiematuriteit over zowel de ' +
      'kernankers (Wat, Wie, Hoe, Waar) als de ondersteunende brugdimensies. ' +
      'Dit wijst op een consistente innovatiecultuur.'
  } else if (anchorAvg > bridgeAvg) {
    interpretation =
      'Het bedrijf innoveert meer op de kernankers (Aanbod, Klanten, ' +
      'Processen, Aanwezigheid) dan op ondersteunende dimensies. Overweeg ' +
      'om bruggebieden zoals Platform, Oplossingen of Klantbeleving te ' +
      'versterken om extra waarde te ontsluiten.'
  } else {
    interpretation =
      'Het bedrijf toont sterkere innovatie in ondersteunende brugdimensies ' +
      'dan in de kernankers. Hoewel dit gespecialiseerde sterktes kan ' +
      'weerspiegelen, zorg ervoor dat de fundamentele WAT, WIE, HOE en WAAR ' +
      'niet worden verwaarloosd.'
  }

  return { anchorAverage: anchorAvg, bridgeAverage: bridgeAvg, interpretation }
}

export function calculateResults(scores: DimensionScore[]): AssessmentResults {
  const magnitudeIndex = calculateMagnitudeIndex(scores)
  const innovationLevel = classifyInnovationLevel(magnitudeIndex)
  const { shape, standardDeviation, interpretation } = analyzeProfileShape(scores)
  const { strengths, weaknesses } = identifyStrengthsAndWeaknesses(scores)
  const { anchorAverage, bridgeAverage, interpretation: abInterpretation } =
    analyzeAnchorVsBridge(scores)

  return {
    magnitudeIndex,
    innovationLevel,
    profileShape: shape,
    standardDeviation,
    strengths,
    weaknesses,
    anchorAverage,
    bridgeAverage,
    interpretation,
    anchorBridgeInterpretation: abInterpretation,
  }
}
