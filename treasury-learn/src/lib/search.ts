import MiniSearch from 'minisearch'
import { pages, workflows, terms, companies, plainText } from './content'
import { sectionById } from './sections'

export interface Doc {
  id: string
  kind: 'Page' | 'Workflow' | 'Term' | 'Company'
  title: string
  where: string
  path: string
  text: string
}

const docs: Doc[] = [
  ...pages
    .filter((p) => !p.meta.hidden)
    .map((p) => ({
      id: `p:${p.path}`,
      kind: 'Page' as const,
      title: p.meta.title,
      where: sectionById.get(p.section)?.title ?? p.section,
      path: p.path,
      text: `${p.meta.summary ?? ''} ${plainText(p.raw)}`,
    })),
  ...workflows.map((w) => ({
    id: `w:${w.id}`,
    kind: 'Workflow' as const,
    title: w.title,
    where: `Workflows · ${w.group}`,
    path: `/workflows/${w.id}`,
    text: plainText(`${w.question} ${w.summary} ${JSON.stringify(w)}`),
  })),
  ...terms.map((t) => ({
    id: `t:${t.id}`,
    kind: 'Term' as const,
    title: t.term,
    where: `Glossary · ${t.category}`,
    path: `/glossary/${t.id}`,
    text: `${(t.aka ?? []).join(' ')} ${t.plain} ${t.professional}`,
  })),
  ...companies.map((c) => ({
    id: `c:${c.id}`,
    kind: 'Company' as const,
    title: c.name,
    where: 'Company scenarios',
    path: c.path ?? '/companies',
    text: `${c.tagline} ${c.profile}`,
  })),
]

const index = new MiniSearch<Doc>({
  fields: ['title', 'text'],
  storeFields: ['kind', 'title', 'where', 'path', 'text'],
  searchOptions: { boost: { title: 4 }, prefix: true, fuzzy: 0.15 },
})
index.addAll(docs)

export function search(q: string) {
  if (!q.trim()) return []
  return index.search(q).slice(0, 30) as unknown as (Doc & { score: number; terms: string[] })[]
}

export function snippet(text: string, words: string[]): string {
  const lower = text.toLowerCase()
  let at = -1
  for (const w of words) {
    at = lower.indexOf(w.toLowerCase())
    if (at >= 0) break
  }
  if (at < 0) return text.slice(0, 150)
  const start = Math.max(0, at - 60)
  return (start > 0 ? '…' : '') + text.slice(start, start + 170) + '…'
}
