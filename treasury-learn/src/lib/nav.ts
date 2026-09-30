import { SECTIONS } from './sections'
import { sectionPages, workflows, WORKFLOW_GROUPS, pageByPath, workflowById, termById } from './content'

export interface NavItem {
  path: string
  title: string
  group?: string
}

export interface NavSection {
  id: string
  title: string
  num?: number
  group: string
  items: NavItem[]
}

export const NAV: NavSection[] = SECTIONS.map((s) => {
  const items: NavItem[] = sectionPages(s.id).map((p) => ({
    path: p.path,
    title: p.slug === 'index' ? 'Overview' : p.meta.nav ?? p.meta.title,
  }))
  if (s.kind === 'workflows') {
    for (const g of WORKFLOW_GROUPS)
      for (const w of workflows.filter((w) => w.group === g)) items.push({ path: `/workflows/${w.id}`, title: w.title, group: g })
  }
  if (s.kind === 'glossary' && !items.length) items.push({ path: '/glossary', title: 'All terms' })
  return { id: s.id, title: s.title, num: s.num, group: s.group, items }
})

export const FLAT: NavItem[] = NAV.flatMap((s) => s.items)

export function neighbours(path: string) {
  const i = FLAT.findIndex((n) => n.path === path)
  return { prev: i > 0 ? FLAT[i - 1] : undefined, next: i >= 0 && i < FLAT.length - 1 ? FLAT[i + 1] : undefined }
}

export function crumbs(path: string): { path: string; title: string }[] {
  const parts = path.split('/').filter(Boolean)
  if (!parts.length) return []
  const sec = NAV.find((s) => s.id === parts[0])
  const out = [{ path: `/${parts[0]}`, title: sec?.title ?? parts[0] }]
  if (parts.length > 1) {
    const full = `/${parts.join('/')}`
    let title = pageByPath.get(full)?.meta.title
    if (parts[0] === 'workflows') {
      const w = workflowById.get(parts[1])
      if (w) out.push({ path: '/workflows', title: w.group })
      title = w?.title
    }
    if (parts[0] === 'glossary') title = termById.get(parts[1])?.term
    out.push({ path: full, title: title ?? parts[parts.length - 1] })
  }
  return out
}
