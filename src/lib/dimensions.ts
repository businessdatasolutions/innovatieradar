import type { DimensionDefinition } from './types'

export const DIMENSIONS: DimensionDefinition[] = [
  {
    key: 'offerings',
    label: 'Aanbod',
    category: 'anchor',
    anchorLabel: 'WAT',
    focus: 'De kernproducten en -diensten van het bedrijf.',
    diagnosticQuestion:
      'Introduceert het bedrijf nieuwe producten of diensten die door klanten worden gewaardeerd?',
    scoringGuide: {
      low: 'Productlijn is al jaren ongewijzigd; geen significante nieuwe producten of diensten.',
      medium:
        'Af en toe wordt een nieuw product gelanceerd (eens per 3 jaar), maar zonder consistente pijplijn.',
      high: 'Continue stroom van nieuwe producten/diensten die de markt leiden en standaarden zetten.',
    },
    examples: ['Apple iPod', 'Dyson stofzuigers'],
  },
  {
    key: 'platform',
    label: 'Platform',
    category: 'bridge',
    focus: 'Gemeenschappelijke componenten of bouwstenen voor het creëren van afgeleide producten.',
    diagnosticQuestion:
      'Gebruikt het bedrijf modulaire componenten om efficiënt diverse producten te maken?',
    scoringGuide: {
      low: 'Elk product wordt apart ontwikkeld zonder gedeelde componenten of platformen.',
      medium:
        'Sommige gedeelde componenten, maar geen bewuste platformstrategie.',
      high: 'Systematisch gebruik van modulaire componenten voor diverse productvarianten.',
    },
    examples: ['Nissan motorblok voor meerdere modellen', 'General Motors platformstrategie'],
  },
  {
    key: 'solutions',
    label: 'Oplossingen',
    category: 'bridge',
    focus: 'Geïntegreerde combinaties van producten, diensten en informatie.',
    diagnosticQuestion:
      'Biedt het bedrijf op maat gemaakte, geïntegreerde pakketten die complete klantproblemen oplossen?',
    scoringGuide: {
      low: 'Verkoopt losse producten/diensten; geen bundeling of integratie.',
      medium:
        'Enkele gebundelde aanbiedingen, maar niet systematisch of op maat.',
      high: 'Op maat gemaakte, geïntegreerde oplossingen die end-to-end klantproblemen oplossen.',
    },
    examples: ['UPS logistiek + financiering + verzendmanagement'],
  },
  {
    key: 'customers',
    label: 'Klanten',
    category: 'anchor',
    anchorLabel: 'WIE',
    focus: 'De individuen en organisaties die het aanbod afnemen.',
    diagnosticQuestion:
      'Hoe effectief ontdekt het bedrijf onvervulde behoeften of identificeert het nieuwe klantsegmenten?',
    scoringGuide: {
      low: 'Bedient alleen bestaande klanten; geen zoektocht naar nieuwe segmenten.',
      medium:
        'Onderzoekt nieuwe behoeften alleen wanneer de verkoop daalt; ad-hoc onderzoek.',
      high: 'Identificeert en betreedt systematisch nieuwe klantsegmenten; leidt de markt.',
    },
    examples: ['Virgin Mobile richt zich op jongeren', 'IKEA democratisering van design'],
  },
  {
    key: 'customerExperience',
    label: 'Klantbeleving',
    category: 'bridge',
    focus: 'Herontwerp van klantinteracties over alle contactpunten.',
    diagnosticQuestion:
      'Hoeveel innovatie wordt er besteed aan de manier waarop klanten het merk ervaren?',
    scoringGuide: {
      low: 'Standaard klantinteractie; geen bewuste beleving-strategie.',
      medium:
        'Enkele verbeteringen aan contactpunten, maar niet samenhangend.',
      high: 'Alle contactpunten zijn zorgvuldig ontworpen voor een unieke, memorabele klantbeleving.',
    },
    examples: ['Starbucks "derde plek" concept', 'Apple Store winkelbeleving'],
  },
  {
    key: 'valueCapture',
    label: 'Waardecreatie',
    category: 'bridge',
    focus: 'Inkomstenstromen en prijsmechanismen.',
    diagnosticQuestion:
      'Heeft het bedrijf onbenutte inkomstenstromen ontdekt of vernieuwende prijsmodellen ontwikkeld?',
    scoringGuide: {
      low: 'Traditioneel prijsmodel; geen verkenning van alternatieve inkomstenstromen.',
      medium:
        'Heeft geëxperimenteerd met nieuwe prijsmodellen, maar niet structureel.',
      high: 'Meerdere innovatieve inkomstenstromen en prijsmechanismen die de industrie veranderen.',
    },
    examples: ['Google betaald zoeken', 'SaaS-abonnementsmodellen'],
  },
  {
    key: 'processes',
    label: 'Processen',
    category: 'anchor',
    anchorLabel: 'HOE',
    focus: 'Configuraties van bedrijfsactiviteiten voor interne operaties.',
    diagnosticQuestion:
      'Herontwerpt het bedrijf kernprocessen om efficiëntie, kwaliteit of snelheid te verbeteren?',
    scoringGuide: {
      low: 'Gebruikt standaard industrieprocessen; gericht op onderhoud in plaats van verbetering.',
      medium:
        'Werkt processen af en toe bij om problemen op te lossen.',
      high: 'Gebruikt eigen, zeer efficiënte processen (Lean/Six Sigma) als concurrentievoordeel.',
    },
    examples: ['Toyota Production System', 'Outsourcing van niet-kernactiviteiten'],
  },
  {
    key: 'organization',
    label: 'Organisatie',
    category: 'bridge',
    focus: 'Structuur, rollen en prikkels binnen het bedrijf.',
    diagnosticQuestion:
      'Heeft het bedrijf rollen, verantwoordelijkheden of structuren herdefinieert om innovatie te bevorderen?',
    scoringGuide: {
      low: 'Traditionele hiërarchische structuur; geen focus op innovatiebevorderende organisatie.',
      medium:
        'Cross-functionele teams worden alleen ingezet bij problemen en daarna opgeheven.',
      high: 'Organisatiestructuur is ontworpen om innovatie te faciliteren; duidelijke innovatierollen.',
    },
    examples: ['Procter & Gamble Connect + Develop', 'Spotify squadmodel'],
  },
  {
    key: 'supplyChain',
    label: 'Toeleveringsketen',
    category: 'bridge',
    focus: 'Inkoop en levering — het verplaatsen van informatie en goederen.',
    diagnosticQuestion:
      'Innoveert het bedrijf in de manier waarop het informatie en goederen verplaatst?',
    scoringGuide: {
      low: 'Standaard toeleveringsketen; geen differentiatie.',
      medium:
        'Enkele verbeteringen in logistiek, maar geen strategisch voordeel.',
      high: 'Innovatieve toeleveringsketen die snelheid, kosten of flexibiliteit als concurrentievoordeel benut.',
    },
    examples: ['Zara fast fashion toeleveringsketen', 'Dell direct-to-consumer'],
  },
  {
    key: 'presence',
    label: 'Aanwezigheid',
    category: 'anchor',
    anchorLabel: 'WAAR',
    focus: 'Kanalen en plaatsen waar het aanbod gekocht of gebruikt kan worden.',
    diagnosticQuestion:
      'Heeft het bedrijf nieuwe distributiekanalen of innovatieve verkooppunten gecreëerd?',
    scoringGuide: {
      low: 'Verkoopt via traditionele, gevestigde kanalen.',
      medium:
        'Heeft recent met een nieuw kanaal geëxperimenteerd (bijv. website).',
      high: 'Heeft geheel nieuwe distributiekanalen gecreëerd die concurrenten niet hebben.',
    },
    examples: ['Bankkiosken in supermarkten', 'Dell direct-to-consumer model'],
  },
  {
    key: 'networking',
    label: 'Netwerken',
    category: 'bridge',
    focus: 'Onderlinge verbondenheid en intelligente netwerken.',
    diagnosticQuestion:
      'Verhoogt het bedrijf de waarde van zijn aanbod door middel van netwerkverbindingen?',
    scoringGuide: {
      low: 'Producten/diensten staan op zichzelf; geen netwerkeffecten.',
      medium:
        'Enkele connectiviteit, maar niet als kernstrategie.',
      high: 'Netwerkeffecten zijn centraal in de waardepropositie; producten worden waardevoller naarmate het netwerk groeit.',
    },
    examples: ['OTIS remote monitoring voor liften', 'CEMEX satelliettracking voor cement'],
  },
  {
    key: 'brand',
    label: 'Merk',
    category: 'bridge',
    focus: 'Het benutten van symbolen en beloften in nieuwe domeinen.',
    diagnosticQuestion:
      'Benut het bedrijf zijn merk creatief in nieuwe domeinen of categorieën?',
    scoringGuide: {
      low: 'Merk is slechts een naam/logo; geen merkextensie of -leverage.',
      medium:
        'Merk wordt gebruikt voor enkele eenvoudige extensies.',
      high: 'Merk is een krachtig bezit dat wordt ingezet in geheel nieuwe categorieën.',
    },
    examples: ['Virgin: van muziek naar luchtvaart en mobiel', 'Apple: van computers naar muziek en telefoons'],
  },
]

export const SCORE_LABELS: Record<number, string> = {
  1: 'Statisch',
  2: 'Ondergemiddeld',
  3: 'Incidenteel',
  4: 'Bovengemiddeld',
  5: 'Systematisch',
}

export function getDimension(key: string): DimensionDefinition | undefined {
  return DIMENSIONS.find((d) => d.key === key)
}
