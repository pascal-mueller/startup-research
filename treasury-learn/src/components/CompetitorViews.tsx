// Owned by the competitors stream. Renders content/data/competitors.yaml.
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { data, sourceById, workflowById } from '../lib/content'
import { SIZE_LABELS } from '../lib/sections'
import { CiteContext, SOURCE_TYPE_LABEL } from './Cite'
import { Md } from './Md'
import '../styles/competitors.css'

type CompType = 'sor' | 'workflow' | 'analytics' | 'execution'
type Size = 'startup' | 'sme' | 'midmarket' | 'multinational'
type Verify = 'snippet' | 'background' | 'watchlist'

interface TypeDef {
  id: CompType
  label: string
  short: string
  blurb: string
}
interface CategoryDef {
  id: string
  label: string
  short: string
  types: CompType[]
  workflows: string[]
  page?: string
  summary: string
}
interface Gap {
  basis: 'scope' | 'question'
  text: string
}
interface Vendor {
  id: string
  name: string
  short?: string
  category: string
  also?: string[]
  types: CompType[]
  verify: Verify
  sizes: Size[]
  region: string
  hq: string
  ownership: string
  sells: string
  workflow: string
  positioning: string
  strengths: string[]
  gaps: Gap[]
  notes?: string
  workflows?: string[]
  sources?: string[]
}
interface CompetitorData {
  asOf: string
  types: TypeDef[]
  categories: CategoryDef[]
  vendors: Vendor[]
}

const EMPTY: CompetitorData = { asOf: '', types: [], categories: [], vendors: [] }
const load = () => data<CompetitorData>('competitors') ?? EMPTY
const SIZES: Size[] = ['startup', 'sme', 'midmarket', 'multinational']
const LANDSCAPE = '/competitors/landscape'

const VERIFY_LABEL: Record<Verify, { label: string; title: string }> = {
  snippet: {
    label: 'Key facts sourced',
    title: 'Ownership/funding checked against a search-result snippet from the cited publisher (pages could not be opened in the authoring session).',
  },
  background: {
    label: 'Not re-verified',
    title: "Author's background knowledge (to mid-2026). Not re-verified in the authoring session — treat as a lead, re-check before quoting.",
  },
  watchlist: {
    label: 'Watchlist — unverified',
    title: 'Named in the research brief only. Product, funding and customers have NOT been verified. Do not repeat as fact.',
  },
}

function humanId(id: string) {
  return id.replace(/-/g, ' ').replace(/^./, (c) => c.toUpperCase())
}

function WfLink({ id }: { id: string }) {
  const w = workflowById.get(id)
  return (
    <Link to={`/workflows/${id}`} className={w ? 'xref xref-wf' : 'xref'} title={w?.question}>
      {w?.title ?? humanId(id)}
    </Link>
  )
}

function TypeBadge({ t, defs }: { t: CompType; defs: TypeDef[] }) {
  const d = defs.find((x) => x.id === t)
  return (
    <span className={`cmp-type cmp-type-${t}`} title={d?.blurb}>
      {d?.short ?? t}
    </span>
  )
}

function VerifyBadge({ v }: { v: Verify }) {
  return (
    <span className={`cmp-verify cmp-verify-${v}`} title={VERIFY_LABEL[v].title}>
      {VERIFY_LABEL[v].label}
    </span>
  )
}

function SizeDots({ sizes }: { sizes: Size[] }) {
  return (
    <span className="cmp-sizes" aria-label={`Target: ${sizes.map((s) => SIZE_LABELS[s]?.short).join(', ')}`}>
      {SIZES.map((s) => (
        <span key={s} className={`cmp-size ${sizes.includes(s) ? 'on' : ''}`} title={SIZE_LABELS[s]?.label}>
          {SIZE_LABELS[s]?.short}
        </span>
      ))}
    </span>
  )
}

function SourceList({ ids }: { ids: string[] }) {
  if (!ids.length)
    return (
      <p className="cmp-nosrc">
        No source could be opened for this entry in the authoring session. Treat every statement above as unverified.
      </p>
    )
  return (
    <ol className="cmp-sources">
      {ids.map((id) => {
        const s = sourceById.get(id)
        if (!s) return <li key={id} className="term-missing">Missing source “{id}”</li>
        return (
          <li key={id}>
            <span className={`src-type src-${s.type}`}>{SOURCE_TYPE_LABEL[s.type]}</span>{' '}
            {s.url ? (
              <a href={s.url} target="_blank" rel="noreferrer" className="external">
                {s.title}
              </a>
            ) : (
              s.title
            )}
            <span className="muted">
              {' '}
              — {s.publisher}
              {s.year ? `, ${s.year}` : ''}
            </span>
            {s.note && <div className="cmp-src-note">{s.note}</div>}
          </li>
        )
      })}
    </ol>
  )
}

function VendorRow({ v, d, open }: { v: Vendor; d: CompetitorData; open: boolean }) {
  const cat = d.categories.find((c) => c.id === v.category)
  const also = (v.also ?? []).map((a) => d.categories.find((c) => c.id === a)?.short ?? a)
  const sparse = v.verify === 'watchlist'
  return (
    <details className={`cmp-row cmp-row-${v.verify}`} id={`v-${v.id}`} open={open || undefined}>
      <summary>
        <span className="cmp-name">{v.name}</span>
        <span className="cmp-cat">{cat?.short ?? v.category}</span>
        <span className="cmp-types">
          {v.types.map((t) => (
            <TypeBadge key={t} t={t} defs={d.types} />
          ))}
        </span>
        <SizeDots sizes={v.sizes} />
        <VerifyBadge v={v.verify} />
      </summary>
      <CiteContext.Provider value={v.sources ?? []}>
      <div className="cmp-body">
        <dl className="cmp-facts">
          <dt>HQ</dt>
          <dd>{v.hq}</dd>
          <dt>Region</dt>
          <dd>{v.region}</dd>
          <dt>Ownership</dt>
          <dd>
            <Md text={v.ownership} inline />
          </dd>
          {also.length > 0 && (
            <>
              <dt>Also in</dt>
              <dd>{also.join(' · ')}</dd>
            </>
          )}
        </dl>
        <div className="cmp-grid">
          <section>
            <h4>What they sell</h4>
            <Md text={v.sells} />
          </section>
          {!sparse && (
            <section>
              <h4>Core workflow</h4>
              <Md text={v.workflow} />
            </section>
          )}
          {!sparse && (
            <section>
              <h4>Positioning</h4>
              <Md text={v.positioning} />
            </section>
          )}
          {v.strengths.length > 0 && (
            <section>
              <h4>Notable strengths</h4>
              <ul>
                {v.strengths.map((s, i) => (
                  <li key={i}>
                    <Md text={s} inline />
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="cmp-gaps">
            <h4>Apparent gaps / open questions</h4>
            <ul>
              {v.gaps.map((g, i) => (
                <li key={i}>
                  <span className={`cmp-basis cmp-basis-${g.basis}`}>
                    {g.basis === 'scope' ? 'From documented scope' : 'Open question'}
                  </span>{' '}
                  <Md text={g.text} inline />
                </li>
              ))}
            </ul>
          </section>
          {v.notes && (
            <section>
              <h4>Note</h4>
              <Md text={v.notes} />
            </section>
          )}
        </div>
        {v.workflows?.length ? (
          <p className="cmp-wfs">
            <span className="cmp-label">Workflows touched:</span>{' '}
            {v.workflows.map((w, i) => (
              <Fragment key={w}>
                {i > 0 && ', '}
                <WfLink id={w} />
              </Fragment>
            ))}
          </p>
        ) : null}
        <div className="cmp-src-block">
          <span className="cmp-label">Sources for this entry</span>
          <SourceList ids={v.sources ?? []} />
        </div>
      </div>
      </CiteContext.Provider>
    </details>
  )
}

/**
 * Filterable competitor list. `category` restricts to one or more category ids (comma-separated),
 * matching the primary category or `also`.
 */
export function CompetitorTable({ category, filters = true }: { category?: string; filters?: boolean }) {
  const d = load()
  const { hash } = useLocation()
  const fixedCats = category ? category.split(',').map((c) => c.trim()) : null
  const [cat, setCat] = useState<string>('all')
  const [sizes, setSizes] = useState<Size[]>([])
  const [types, setTypes] = useState<CompType[]>([])
  const [q, setQ] = useState('')
  const [hideWatch, setHideWatch] = useState(false)
  const [expandAll, setExpandAll] = useState(false)

  const openId = hash.startsWith('#v-') ? hash.slice(3) : ''
  useEffect(() => {
    if (!openId) return
    const el = document.getElementById(`v-${openId}`)
    if (el) setTimeout(() => el.scrollIntoView({ block: 'start' }), 50)
  }, [openId])

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return d.vendors.filter((v) => {
      const cats = [v.category, ...(v.also ?? [])]
      if (fixedCats && !fixedCats.some((c) => cats.includes(c))) return false
      if (!fixedCats && cat !== 'all' && !cats.includes(cat)) return false
      if (sizes.length && !sizes.some((s) => v.sizes.includes(s))) return false
      if (types.length && !types.some((t) => v.types.includes(t))) return false
      if (hideWatch && v.verify === 'watchlist') return false
      if (needle && !JSON.stringify(v).toLowerCase().includes(needle)) return false
      return true
    })
  }, [d, fixedCats?.join(','), cat, sizes, types, q, hideWatch])

  const toggle = <T,>(arr: T[], x: T, set: (v: T[]) => void) => set(arr.includes(x) ? arr.filter((y) => y !== x) : [...arr, x])

  return (
    <div className="cmp-table">
      {filters && (
        <div className="cmp-filters" role="group" aria-label="Filter competitors">
          {!fixedCats && (
            <label className="cmp-f">
              <span>Category</span>
              <select value={cat} onChange={(e) => setCat(e.target.value)}>
                <option value="all">All categories</option>
                {d.categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
          )}
          <div className="cmp-f">
            <span>Customer size</span>
            <div className="cmp-chips">
              {SIZES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`cmp-chip ${sizes.includes(s) ? 'on' : ''}`}
                  aria-pressed={sizes.includes(s)}
                  onClick={() => toggle(sizes, s, setSizes)}
                >
                  {SIZE_LABELS[s]?.short}
                </button>
              ))}
            </div>
          </div>
          <div className="cmp-f">
            <span>Type</span>
            <div className="cmp-chips">
              {d.types.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`cmp-chip ${types.includes(t.id) ? 'on' : ''}`}
                  aria-pressed={types.includes(t.id)}
                  title={t.blurb}
                  onClick={() => toggle(types, t.id, setTypes)}
                >
                  {t.short}
                </button>
              ))}
            </div>
          </div>
          <label className="cmp-f cmp-f-grow">
            <span>Search</span>
            <input type="search" value={q} placeholder="e.g. hedge accounting, SAP, stablecoin" onChange={(e) => setQ(e.target.value)} />
          </label>
          <div className="cmp-f cmp-f-row">
            <label className="cmp-check">
              <input type="checkbox" checked={hideWatch} onChange={(e) => setHideWatch(e.target.checked)} /> Hide unverified watchlist
            </label>
            <button type="button" className="cmp-chip" onClick={() => setExpandAll((x) => !x)}>
              {expandAll ? 'Collapse all' : 'Expand all'}
            </button>
          </div>
        </div>
      )}
      <div className="cmp-count">
        {list.length} {list.length === 1 ? 'entry' : 'entries'}
        {d.asOf && <> · status as of {d.asOf}</>} · click a row for detail
      </div>
      <div className="cmp-list" key={expandAll ? 'x' : 'c'}>
        {list.map((v) => (
          <VendorRow key={v.id} v={v} d={d} open={expandAll || v.id === openId} />
        ))}
        {!list.length && <p className="muted">No entries match these filters.</p>}
      </div>
    </div>
  )
}

/** Category × customer-size grid. Each cell lists vendors whose primary category is that row. */
export function CompetitorMap({ primaryOnly = false }: { primaryOnly?: boolean }) {
  const d = load()
  return (
    <figure className="cmp-map">
      <div className="cmp-map-scroll">
        <table>
          <thead>
            <tr>
              <th className="cmp-map-corner">Category</th>
              {SIZES.map((s) => (
                <th key={s}>{SIZE_LABELS[s]?.short}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {d.categories.map((c) => {
              const vs = d.vendors.filter((v) => v.category === c.id || (!primaryOnly && v.also?.includes(c.id)))
              return (
                <tr key={c.id}>
                  <th scope="row">
                    {c.page ? <Link to={c.page}>{c.short}</Link> : c.short}
                    <span className="cmp-map-types">
                      {c.types.map((t) => (
                        <TypeBadge key={t} t={t} defs={d.types} />
                      ))}
                    </span>
                  </th>
                  {SIZES.map((s) => {
                    const cell = vs.filter((v) => v.sizes.includes(s))
                    return (
                      <td key={s} className={cell.length ? '' : 'cmp-empty'}>
                        {cell.map((v) => (
                          <Link
                            key={v.id}
                            to={`${LANDSCAPE}#v-${v.id}`}
                            className={`cmp-pill cmp-pill-${v.verify} ${v.category === c.id ? '' : 'cmp-pill-also'}`}
                            title={`${v.name} — ${VERIFY_LABEL[v.verify].label}${v.category === c.id ? '' : ' (secondary category)'}`}
                          >
                            {v.short ?? v.name.replace(/\s*\(.*\)$/, '')}
                          </Link>
                        ))}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <figcaption>
        Size placement is the author's synthesis from each vendor's stated target market, not measured customer data.
        Solid pill = primary category; outlined = secondary. Dashed = unverified watchlist entry. Status as of {d.asOf}.
      </figcaption>
    </figure>
  )
}

/** Category reference table: what each category is, its type, and the canonical workflows it touches. */
export function CompetitorCategories() {
  const d = load()
  return (
    <div className="table-wrap cmp-cats">
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Mostly</th>
            <th>What it is</th>
            <th>Workflows touched</th>
          </tr>
        </thead>
        <tbody>
          {d.categories.map((c) => (
            <tr key={c.id}>
              <td>
                <strong>{c.page ? <Link to={c.page}>{c.label}</Link> : c.label}</strong>
                <div className="muted cmp-n">{d.vendors.filter((v) => v.category === c.id).length} entries</div>
              </td>
              <td>
                {c.types.map((t) => (
                  <TypeBadge key={t} t={t} defs={d.types} />
                ))}
              </td>
              <td>
                <Md text={c.summary} inline />
              </td>
              <td className="cmp-wf-cell">
                {c.workflows.map((w, i) => (
                  <Fragment key={w}>
                    {i > 0 && ', '}
                    <WfLink id={w} />
                  </Fragment>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** The four system types with definitions. */
export function CompetitorTypes() {
  const d = load()
  return (
    <dl className="cmp-typedefs">
      {d.types.map((t) => (
        <div key={t.id}>
          <dt>
            <TypeBadge t={t.id} defs={d.types} /> {t.label}
          </dt>
          <dd>{t.blurb}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Legend for verification badges. */
export function CompetitorVerifyLegend() {
  return (
    <ul className="cmp-legend">
      {(Object.keys(VERIFY_LABEL) as Verify[]).map((v) => (
        <li key={v}>
          <VerifyBadge v={v} /> {VERIFY_LABEL[v].title}
        </li>
      ))}
    </ul>
  )
}
