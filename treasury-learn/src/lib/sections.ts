export interface SectionDef {
  id: string
  title: string
  kind?: 'pages' | 'workflows' | 'glossary'
  group: 'learn' | 'startup' | 'meta'
  num?: number
}

export const SECTIONS: SectionDef[] = [
  { id: 'start', title: 'Start Here', group: 'learn', num: 1 },
  { id: 'map', title: 'Treasury Map', group: 'learn', num: 2 },
  { id: 'org', title: 'Organization & Roles', group: 'learn', num: 3 },
  { id: 'workflows', title: 'Workflows', kind: 'workflows', group: 'learn', num: 4 },
  { id: 'day', title: 'Day in the Life', group: 'learn', num: 5 },
  { id: 'companies', title: 'Company Scenarios', group: 'learn', num: 6 },
  { id: 'size', title: 'Treasury by Size', group: 'learn', num: 7 },
  { id: 'systems', title: 'Systems & Data', group: 'learn', num: 8 },
  { id: 'glossary', title: 'Glossary', kind: 'glossary', group: 'learn', num: 9 },
  { id: 'interview', title: 'Interview Prep', group: 'learn', num: 10 },
  { id: 'lens', title: 'Agentic Treasury', group: 'startup', num: 11 },
  { id: 'competitors', title: 'Competitor Landscape', group: 'startup', num: 12 },
  { id: 'reference', title: 'Reference', group: 'meta' },
]

export const sectionById = new Map(SECTIONS.map((s) => [s.id, s]))

export const SIZE_LABELS: Record<string, { label: string; short: string }> = {
  startup: { label: 'Very small / startup', short: 'Startup' },
  sme: { label: 'SME', short: 'SME' },
  midmarket: { label: 'International mid-market', short: 'Mid-market' },
  multinational: { label: 'Large multinational', short: 'Multinational' },
}
