// Validates content cross-references. Run: npm run check
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { load } from 'js-yaml'

const walk = (d, ext) =>
  existsSync(d)
    ? readdirSync(d).flatMap((f) => {
        const p = join(d, f)
        return statSync(p).isDirectory() ? walk(p, ext) : p.endsWith(ext) ? [p] : []
      })
    : []
const errors = []
const warn = []
const y = (f) => {
  try {
    return load(readFileSync(f, 'utf8'))
  } catch (e) {
    errors.push(`YAML parse error in ${f}: ${e.message.split('\n')[0]}`)
    return null
  }
}

// registries
const terms = new Map()
for (const f of walk('content/glossary', '.yaml'))
  for (const t of y(f) ?? []) {
    if (terms.has(t.id)) errors.push(`Duplicate glossary id "${t.id}" in ${f} (also ${terms.get(t.id)})`)
    terms.set(t.id, f)
    for (const k of ['term', 'category', 'plain', 'professional', 'example']) if (!t[k]) errors.push(`Term ${t.id} missing ${k}`)
  }
const sources = new Map()
for (const f of walk('content/sources', '.yaml'))
  for (const s of y(f) ?? []) {
    if (sources.has(s.id)) errors.push(`Duplicate source id "${s.id}" in ${f}`)
    sources.set(s.id, f)
    if (!s.url) warn.push(`Source ${s.id} has no url`)
  }
const whyNotes = new Map()
for (const f of walk('content/why', '.yaml'))
  for (const w of y(f) ?? []) {
    if (whyNotes.has(w.id)) errors.push(`Duplicate why id "${w.id}" in ${f} (also ${whyNotes.get(w.id)})`)
    whyNotes.set(w.id, f)
    for (const k of ['claim', 'short', 'detail']) if (!w[k]) errors.push(`Why note ${w.id} missing ${k}`)
    if (w.short && w.short.length > 400) warn.push(`Why note ${w.id}: short is long for a tooltip (${w.short.length} chars)`)
    for (const t of w.terms ?? []) if (!terms.has(t)) errors.push(`Why note ${w.id}: unknown term "${t}"`)
    for (const c of w.sources ?? []) if (!sources.has(c)) errors.push(`Why note ${w.id}: unknown source "${c}"`)
  }
const workflows = new Map()
const WF_REQ = ['id', 'title', 'question', 'group', 'summary', 'objective', 'trigger', 'frequency', 'people', 'systems', 'data', 'steps', 'judgment', 'failure_modes', 'software', 'manual_work', 'by_size']
const GROUPS = ['Cash & liquidity', 'Payments & banking', 'FX & risk', 'Debt & funding', 'Controls & reporting', 'Events & crises']
for (const f of walk('content/workflows', '.yaml')) {
  const w = y(f)
  if (!w) continue
  workflows.set(w.id, w)
  for (const k of WF_REQ) if (!w[k]) errors.push(`Workflow ${f} missing ${k}`)
  if (w.group && !GROUPS.includes(w.group)) errors.push(`Workflow ${w.id} has unknown group "${w.group}"`)
}
const companies = new Set((y('content/companies.yaml')?.companies ?? []).map((c) => c.id))
const compare = new Set(walk('content/compare', '.yaml').flatMap((f) => (y(f) ?? []).map((t) => t.id)))
const roles = new Set((existsSync('content/data/roles.yaml') ? y('content/data/roles.yaml') ?? [] : []).map((r) => r.id))
const orgs = new Set((existsSync('content/data/orgs.yaml') ? y('content/data/orgs.yaml') ?? [] : []).map((r) => r.id))
const pages = new Set(
  walk('content/pages', '.mdx').map((f) => {
    const rel = f.replace('content/pages/', '').replace(/\.mdx$/, '')
    return '/' + rel.replace(/\/index$/, '')
  }),
)

// scan all text
const files = [...walk('content', '.yaml'), ...walk('content', '.mdx')]
for (const f of files) {
  const s = readFileSync(f, 'utf8')
  for (const m of s.matchAll(/\]\((term|cite|wf|co|why):([^)]*)\)/g)) {
    const [, kind, id] = m
    if (kind === 'term' && !terms.has(id)) errors.push(`${f}: unknown term "${id}"`)
    if (kind === 'cite') for (const c of id.split(',')) if (!sources.has(c.trim())) errors.push(`${f}: unknown source "${c}"`)
    if (kind === 'wf' && !workflows.has(id)) warn.push(`${f}: workflow not (yet) written "${id}"`)
    if (kind === 'co' && !companies.has(id)) errors.push(`${f}: unknown company "${id}"`)
    if (kind === 'why' && !whyNotes.has(id)) errors.push(`${f}: unknown why note "${id}"`)
  }
  for (const m of s.matchAll(/\]\((\/[a-z0-9\-/]+)(#[^)]*)?\)/g)) {
    const p = m[1].replace(/\/$/, '')
    if (p.startsWith('/workflows/')) {
      if (!workflows.has(p.split('/')[2])) warn.push(`${f}: link to unwritten workflow ${p}`)
    } else if (p.startsWith('/glossary/')) {
      if (!terms.has(p.split('/')[2])) errors.push(`${f}: link to unknown term ${p}`)
    } else if (!pages.has(p)) warn.push(`${f}: link to missing page ${p}`)
  }
  for (const m of s.matchAll(/<CompanyCompare topic="([^"]+)"/g)) if (!compare.has(m[1])) errors.push(`${f}: unknown compare topic ${m[1]}`)
  for (const m of s.matchAll(/<(?:RoleKnows|RoleExists|RoleCalendar|RoleLink) id="([^"]+)"/g)) if (!roles.has(m[1])) errors.push(`${f}: unknown role ${m[1]}`)
  for (const m of s.matchAll(/<OrgChart id="([^"]+)"/g)) if (!orgs.has(m[1])) errors.push(`${f}: unknown org chart ${m[1]}`)
  for (const m of s.matchAll(/<(?:WorkflowCard|Handoffs) (?:id|workflow)="([^"]+)"/g)) if (!workflows.has(m[1])) warn.push(`${f}: workflow not yet written ${m[1]}`)
  if (/ \[\]\(cite:/.test(s)) warn.push(`${f}: space before citation — write "text[](cite:x)"`)
}
// structured data files: must parse; role ids must exist
for (const f of walk('content/data', '.yaml')) y(f)
if (roles.size) {
  const topics = existsSync('content/data/interview-topics.yaml') ? y('content/data/interview-topics.yaml') ?? [] : []
  for (const t of topics)
    for (const k of ['best', 'also', 'less'])
      for (const r of t[k] ?? []) if (!roles.has(r.role)) errors.push(`interview-topics ${t.id}: unknown role "${r.role}"`)
  for (const t of topics) for (const w of t.workflows ?? []) if (!workflows.has(w)) warn.push(`interview-topics ${t.id}: workflow not yet written "${w}"`)
  const raci = existsSync('content/data/raci.yaml') ? y('content/data/raci.yaml') ?? [] : []
  for (const m of raci) for (const r of m.rows ?? []) if (r.workflow && !workflows.has(r.workflow)) warn.push(`raci ${m.size}: workflow not yet written "${r.workflow}"`)
}
// yaml related/terms lists
for (const w of workflows.values()) {
  for (const t of w.terms ?? []) if (!terms.has(t)) errors.push(`workflow ${w.id}: terms lists unknown "${t}"`)
  for (const r of w.related ?? []) if (!workflows.has(r)) warn.push(`workflow ${w.id}: related not yet written "${r}"`)
  for (const s of w.sources ?? []) if (!sources.has(s)) errors.push(`workflow ${w.id}: unknown source "${s}"`)
  for (const c of Object.keys(w.companies ?? {})) if (!companies.has(c)) errors.push(`workflow ${w.id}: unknown company ${c}`)
}
for (const f of walk('content/glossary', '.yaml'))
  for (const t of y(f) ?? []) for (const r of t.related ?? []) if (!terms.has(r)) errors.push(`term ${t.id}: related unknown "${r}"`)

const only = process.argv[2]
const filt = (l) => (only ? l.filter((x) => x.includes(only)) : l)
for (const w of filt(warn)) console.log('warn ', w)
for (const e of filt(errors)) console.log('ERROR', e)
console.log(`\n${terms.size} terms, ${sources.size} sources, ${workflows.size} workflows, ${pages.size} pages, ${roles.size} roles, ${whyNotes.size} why notes. ${errors.length} errors, ${warn.length} warnings.`)
process.exit(errors.length ? 1 : 0)
