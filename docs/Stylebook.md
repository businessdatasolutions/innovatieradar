# Innovatieradar — Stylebook

Dit document beschrijft het visuele ontwerpsysteem van de Innovatieradar-applicatie. Gebruik het als referentie bij het bouwen van nieuwe componenten of het aanpassen van bestaande.

---

## 1. Ontwerpfilosofie

- **Modern minimalistisch** — wit-dominant, veel witruimte, clean lijnen
- **Subtiele randen en zachte schaduwen** — geen zware borders of dropshadows
- **Diepblauw als enige accentkleur** — `#1e3a5f` is de visuele rode draad
- **Professioneel en zakelijk** — geschikt voor consultancy-context
- **Taal:** Nederlands (UI en PDF)

---

## 2. Kleurenpalet

Alle kleuren zijn gedefinieerd als design tokens in `src/index.css` via de Tailwind v4 `@theme` directive.

| Token | Hex | Tailwind class | Gebruik |
|-------|-----|----------------|---------|
| `primary` | `#1e3a5f` | `bg-primary`, `text-primary` | Knoppen, accenten, radar vulling, headings |
| `primary-light` | `#2d5a8e` | `bg-primary-light` | Hover states |
| `primary-dark` | `#152a45` | `bg-primary-dark` | Donkere variant |
| `primary-50` | `#f0f5fa` | `bg-primary-50` | Lichte achtergrond actieve elementen |
| `primary-100` | `#dae5f2` | `bg-primary-100` | Voltooide stappen, badges |
| `primary-200` | `#b5cce6` | `bg-primary-200` | Subtiele accenten |
| `primary-foreground` | `#ffffff` | `text-primary-foreground` | Tekst op primaire achtergrond |
| `surface` | `#f8fafc` | `bg-surface` | Kaarten, secties, infoboxen |
| `border` | `#e2e8f0` | `border-border` | Randen, scheidingslijnen |
| `success` | `#16a34a` | `text-success`, `bg-success` | Systematische innovator, sterke punten |
| `success-light` | `#dcfce7` | `bg-success-light` | Achtergrond succes-elementen |
| `warning` | `#d97706` | `text-warning`, `bg-warning` | Incidentele innovator, kansen |
| `warning-light` | `#fef3c7` | `bg-warning-light` | Achtergrond waarschuwingselementen |
| `danger` | `#dc2626` | `text-danger`, `bg-danger` | Weinig innovatie, fouten |
| `danger-light` | `#fee2e2` | `bg-danger-light` | Achtergrond fout-elementen |

### Aanvullende Tailwind-kleuren (Slate-schaal)

| Rol | Hex | Tailwind class | Gebruik |
|-----|-----|----------------|---------|
| Tekst primair | `#1a202c` | — (body default) | Body tekst |
| Tekst secundair | `#64748b` | `text-slate-500` | Labels, subtekst |
| Tekst tertiair | `#94a3b8` | `text-slate-400` | Hints, gridlijnen |
| Tekst donker | `#1e293b` | `text-slate-800` | Componenttitels |
| Rand subtiel | `#cbd5e1` | `border-slate-300` | Formuliervelden |
| Rand licht | `#e2e8f0` | `border-slate-200` | Inactieve elementen |
| Achtergrond licht | `#f1f5f9` | `bg-slate-100` | Inactieve cirkels |

---

## 3. Typografie

- **Font:** Inter (geladen via Google Fonts), fallback: `ui-sans-serif, system-ui, sans-serif`
- **Antialiasing:** `-webkit-font-smoothing: antialiased`

### Gewichten

| Gewicht | Tailwind class | Gebruik |
|---------|----------------|---------|
| 400 | `font-normal` | Body tekst |
| 500 | `font-medium` | Labels, knoppen, badges |
| 600 | `font-semibold` | Sectietitels, componentheadings |
| 700 | `font-bold` | Paginatitels, grote getallen |

### Groottes

| Grootte | Tailwind class | Gebruik |
|---------|----------------|---------|
| 12px | `text-xs` | Labels, hints, badges |
| 14px | `text-sm` | Body tekst, formuliervelden |
| 18px | `text-lg` | Introductietekst |
| 20px | `text-xl` | Kleine headings |
| 24px | `text-2xl` | Sectietitels |
| 30px | `text-3xl` | Paginatitels |
| 48px | `text-5xl` | Magnitude Index (groot getal) |

---

## 4. Spacing & Layout

### Max-width

| Tailwind class | Pixels | Gebruik |
|----------------|--------|---------|
| `max-w-5xl` | 1024px | Pagina's (resultaten, geschiedenis) |
| `max-w-3xl` | 768px | Assessment stappen |
| `max-w-lg` | 512px | Formulieren (bedrijfsgegevens) |

### Padding

| Context | Classes |
|---------|---------|
| Pagina (assessment) | `px-4 py-8` |
| Pagina (landing/hero) | `px-4 py-16` |
| Kaart | `p-5` of `p-6` |
| Infobox | `p-4` |

### Grid

| Context | Classes |
|---------|---------|
| Resultaten (2 kolommen) | `grid md:grid-cols-2 gap-6` |
| Radar + gauge (3 kolommen) | `grid md:grid-cols-3 gap-6` |
| Score-selector | `flex justify-between gap-2` |

### Gaps

| Grootte | Gebruik |
|---------|---------|
| `gap-2` | Compacte elementen (score-cirkels) |
| `gap-3` | Elementen binnen een sectie |
| `gap-4` | Navigatie-items |
| `gap-6` | Secties onderling |
| `gap-12` | Hero-elementen |

---

## 5. Componentpatronen

### Knoppen

**Primair:**
```
bg-primary text-white px-6 py-3 rounded-lg font-medium
hover:bg-primary-light transition-colors
```

**Secundair:**
```
bg-white text-primary border border-primary px-6 py-3 rounded-lg font-medium
hover:bg-primary-50 transition-colors
```

**Ghost (navigatie):**
```
text-slate-600 hover:text-primary transition-colors
```

**Disabled state:**
```
disabled:opacity-50 disabled:cursor-not-allowed
```

**Met icoon:**
```
inline-flex items-center gap-1.5   (klein icoon)
inline-flex items-center gap-2     (normaal icoon)
```

### Kaarten

**Standaard kaart:**
```
bg-white rounded-xl border border-border p-5
```

**Infobox:**
```
bg-surface rounded-lg p-4
```

### Formuliervelden

**Input:**
```
w-full px-3 py-2 border border-slate-300 rounded-lg text-sm
```

**Focus state:**
```
focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
```

**Foutmelding:**
```
text-danger text-xs mt-1
```

### Badges

**Klein:**
```
text-xs px-2 py-0.5 rounded-full bg-primary-50 text-primary font-medium
```

**Normaal:**
```
text-sm font-medium px-3 py-1 rounded-full bg-primary-50 text-primary
```

### Score-selector

5 klikbare kaarten in een rij (`flex justify-between gap-2`):

**Actief:**
```
border-2 border-primary bg-primary-50 text-primary
```
Cirkel: `bg-primary text-white`

**Inactief:**
```
border-2 border-slate-200 bg-white text-slate-500
```
Cirkel: `bg-slate-100`

### Scoringsgids (tricolor)

| Niveau | Achtergrond | Header-kleur |
|--------|-------------|--------------|
| Laag (1) | `bg-danger-light` | `text-danger` |
| Midden (3) | `bg-warning-light` | `text-warning` |
| Hoog (5) | `bg-success-light` | `text-success` |

### Tabellen

| Element | Stijl |
|---------|-------|
| Header | `border-b border-border` + `text-slate-500 font-medium text-left py-2` |
| Rij | `border-b border-border/50` |
| Groepstitel | `text-sm font-semibold text-slate-500 uppercase tracking-wide` |

### Radardiagram (Recharts)

| Element | Waarde |
|---------|--------|
| Grid stroke | `#e2e8f0` |
| Labels | `fontSize: 11, fill: "#64748b"` |
| Radius ticks | `fontSize: 10, fill: "#94a3b8"` |
| Data stroke | `#1e3a5f` |
| Data fill | `#1e3a5f`, `fillOpacity: 0.15` |
| Stroke width | `2` |
| Dots | `r: 4, fill: "#1e3a5f"` |

---

## 6. Progress Stepper

| State | Cirkel | Label |
|-------|--------|-------|
| Actief / Voltooid | `bg-primary text-white` | `text-primary font-medium` |
| Toekomstig | `bg-slate-200 text-slate-500` | `text-slate-400` |

Verbindingslijn:
- Voltooid: `bg-primary`
- Toekomstig: `bg-slate-200`

---

## 7. PDF-rapport stijl

> **Let op:** PDF-componenten gebruiken inline `style={{}}` in plaats van Tailwind classes, voor compatibiliteit met html2canvas.

### Formaat

- **Afmetingen:** 794px × 1123px (A4 bij 96dpi)
- **Padding:** `60px 70px`

### Voorblad

- **Gradient:** `linear-gradient(135deg, #1e3a5f 0%, #2d5a8e 50%, #1e3a5f 100%)`
- **Decoratieve cirkels:** `border: 2px solid rgba(255,255,255,0.1)`

### Typografie (PDF)

| Element | Stijl |
|---------|-------|
| Sectietitel | `fontSize: 28px, fontWeight: 700, color: #1e3a5f` |
| Koptekst per pagina | `fontSize: 11px, color: #64748b, uppercase, letterSpacing: 3px` |
| Body tekst | `fontSize: 14px, color: #475569, lineHeight: 1.7` |
| Subtekst | `fontSize: 12px, color: #64748b` |

### Staafdiagram (PDF)

- **Balk:** `background: linear-gradient(90deg, #1e3a5f, #2d5a8e)`
- **Achtergrond:** `#f1f5f9`

### Sterke punten / Kansen (PDF)

| Type | Achtergrond | Rand | Tekstkleur |
|------|-------------|------|------------|
| Sterk punt | `#f0fdf4` | `#bbf7d0` | `#16a34a` |
| Kans | `#fef3c7` | `#fde68a` | `#d97706` |

---

## 8. Iconografie

- **Set:** [Lucide React](https://lucide.dev/)
- **Kleur:** erft van parent via `currentColor`

| Grootte | Tailwind class | Gebruik |
|---------|----------------|---------|
| 16px | `w-4 h-4` | Inline iconen, navigatie |
| 20px | `w-5 h-5` | Sectie-iconen |
| 24px | `w-6 h-6` | Header logo |
| 28px | `w-7 h-7` | Hero-elementen |
| 48px | `w-12 h-12` | Empty state illustraties |

---

## 9. Animatie

| Type | Waarde |
|------|--------|
| Hover/focus transitie | `transition-colors` (Tailwind default: 150ms) |
| Stap-animatie (Framer Motion) | `initial: { opacity: 0, x: 50 }` → `animate: { opacity: 1, x: 0 }` met `duration: 0.2` |

Alle interactieve elementen hebben `transition-colors` voor vloeiende kleurwisselingen bij hover en focus.
