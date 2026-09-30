import type { ComponentType } from 'react'
import type { Page, PageMeta, Workflow, Term, Source, Company, CompareTopic } from './types'

// ---------- Narrative pages (MDX) ----------
const mdxModules = import.meta.glob('/content/pages/**/*.mdx', { eager: true }) as Record<
  string,
  { default: ComponentType; frontmatter?: PageMeta }
>
import mdxRaw from 'virtual:mdx-raw'

export const pages: Page[] = Object.entries(mdxModules).map(([file, mod]) => {
  const rel = file.replace('/content/pages/', '').replace(/\.mdx$/, '')
  const [section, ...rest] = rel.split('/')
  const slug = rest.join('/')
  const path = slug === 'index' || slug === '' ? `/${section}` : `/${section}/${slug}`
  return {
    path,
    section,
    slug,
    meta: mod.frontmatter ?? { title: slug },
    Component: mod.default,
    raw: mdxRaw[file] ?? '',
  }
})

export const pageByPath = new Map(pages.map((p) => [p.path, p]))

export function sectionPages(section: string): Page[] {
  return pages
    .filter((p) => p.section === section && !p.meta.hidden)
    .sort((a, b) => (a.meta.order ?? 99) - (b.meta.order ?? 99) || a.meta.title.localeCompare(b.meta.title))
}

// ---------- Workflows (YAML) ----------
const wfModules = import.meta.glob('/content/workflows/*.yaml', { eager: true, import: 'default' }) as Record<string, Workflow>
export const workflows: Workflow[] = Object.values(wfModules).sort(
  (a, b) => (a.order ?? 99) - (b.order ?? 99) || a.title.localeCompare(b.title),
)
export const workflowById = new Map(workflows.map((w) => [w.id, w]))
export const WORKFLOW_GROUPS = [
  'Cash & liquidity',
  'Payments & banking',
  'FX & risk',
  'Debt & funding',
  'Controls & reporting',
  'Events & crises',
]

// ---------- Glossary ----------
const glossaryFiles = import.meta.glob('/content/glossary/*.yaml', { eager: true, import: 'default' }) as Record<string, Term[]>
export const terms: Term[] = Object.values(glossaryFiles)
  .flat()
  .sort((a, b) => a.term.localeCompare(b.term))
export const termById = new Map(terms.map((t) => [t.id, t]))

// ---------- Sources ----------
const sourceFiles = import.meta.glob('/content/sources/*.yaml', { eager: true, import: 'default' }) as Record<string, Source[]>
export const sources: Source[] = Object.values(sourceFiles).flat()
export const sourceById = new Map(sources.map((s) => [s.id, s]))

// ---------- Companies ----------
import companiesData from '../../content/companies.yaml'
export const companies: Company[] = (companiesData as { companies: Company[] }).companies
export const companyById = new Map(companies.map((c) => [c.id, c]))
const compareFiles = import.meta.glob('/content/compare/*.yaml', { eager: true, import: 'default' }) as Record<string, CompareTopic[]>
export const compareTopics: CompareTopic[] = Object.values(compareFiles).flat()
export const compareTopicById = new Map(compareTopics.map((t) => [t.id, t]))

// ---------- Generic structured data (systems, competitors, agent lens) ----------
const dataFiles = import.meta.glob('/content/data/*.yaml', { eager: true, import: 'default' }) as Record<string, unknown>
export function data<T>(name: string): T {
  return dataFiles[`/content/data/${name}.yaml`] as T
}

// ---------- Cross references ----------
const CITE_RE = /\(cite:([\w.,-]+)\)/g
export function citeIdsIn(text: string): string[] {
  const out: string[] = []
  for (const m of text.matchAll(CITE_RE)) for (const id of m[1].split(',')) if (!out.includes(id)) out.push(id)
  return out
}

const TERM_RE = /\(term:([\w-]+)\)/g
function termIdsIn(text: string): Set<string> {
  const s = new Set<string>()
  for (const m of text.matchAll(TERM_RE)) s.add(m[1])
  return s
}

// term id -> workflows / pages that reference it
export const termBacklinks = (() => {
  const wf = new Map<string, Workflow[]>()
  const pg = new Map<string, Page[]>()
  for (const w of workflows) {
    const ids = termIdsIn(JSON.stringify(w))
    for (const t of w.terms ?? []) ids.add(t)
    for (const id of ids) wf.set(id, [...(wf.get(id) ?? []), w])
  }
  for (const p of pages) {
    for (const id of termIdsIn(p.raw)) pg.set(id, [...(pg.get(id) ?? []), p])
  }
  return { wf, pg }
})()

export function plainText(md: string): string {
  return md
    .replace(/^---[\s\S]*?---/, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#*_>`|{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
