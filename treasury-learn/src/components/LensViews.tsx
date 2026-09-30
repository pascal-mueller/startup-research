// Agentic Treasury / Startup Lens views. Owned by the "lens" stream. Data: content/data/lens.yaml.
import { Fragment, useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { citeIdsIn, companyById, data, sourceById, workflowById } from '../lib/content'
import { Md } from './Md'
import '../styles/lens.css'

/* ---------------- Types (component-local by convention) ---------------- */
type LensClass = 'good' | 'possible' | 'hard'
type Favours = 'high' | 'low' | 'neutral'

interface Criterion {
  key: string
  label: string
  short: string
  favours: Favours
  question: string
  scale: string
}

interface LensEntry {
  id: string
  class: LensClass
  assignment: string
  headline: string
  scores: Record<string, number>
  notes: Record<string, string>
  already_automated?: string
  agent_does?: string
  human_keeps?: string
  narrow_start?: string
  expansion?: string
  must_be_true?: string[]
  startup_view?: string
  ai_note_view?: string
  evidence?: string
  dw?: string
}

type Access = 'read' | 'draft' | 'none'
interface DigitalWorkerDef {
  id: string
  path: string
  title: string
  workflow: string
  company?: string
  assignment: string
  assigned_by: string
  performed_today_by: string
  cadence: string
  inputs: { name: string; source: string; arrives?: string; quality?: string }[]
  reasoning: string[]
  tools: { name: string; access: Access; use: string }[]
  output: string
  verification: { check: string; how: string }[]
  execution: string
  feedback: { signal: string; becomes: string }[]
  failure_modes: { mode: string; guardrail: string }[]
  autonomy: { level: number; label: string; scope: string; gate: string }[]
  metrics?: string[]
}

interface LensData {
  criteria: Criterion[]
  classes: Record<LensClass, { label: string; meaning: string }>
  workflows: LensEntry[]
  digital_workers: DigitalWorkerDef[]
}

/* ---------------- Data access ---------------- */
const EMPTY: LensData = {
  criteria: [],
  classes: {
    good: { label: 'Good agent candidate', meaning: '' },
    possible: { label: 'Possible', meaning: '' },
    hard: { label: 'Hard / dangerous', meaning: '' },
  },
  workflows: [],
  digital_workers: [],
}
const lens = (): LensData => data<LensData>('lens') ?? EMPTY

/** Canonical workflow ids → fallback title and group (used until the workflow file exists). */
const CANON: Record<string, [string, string]> = {
  'daily-cash-positioning': ['Daily cash positioning', 'Cash & liquidity'],
  'cash-forecasting': ['Cash forecasting (13-week)', 'Cash & liquidity'],
  'liquidity-planning': ['Liquidity planning', 'Cash & liquidity'],
  'surplus-cash-investment': ['Surplus cash investment', 'Cash & liquidity'],
  'funding-subsidiary': ['Funding a subsidiary', 'Cash & liquidity'],
  'payment-processing': ['Payment processing', 'Payments & banking'],
  'large-payment-approval': ['Large / unusual payment approval', 'Payments & banking'],
  'bank-reconciliation': ['Bank reconciliation', 'Payments & banking'],
  'bank-account-management': ['Opening / closing bank accounts', 'Payments & banking'],
  'bank-fee-analysis': ['Bank fee analysis', 'Payments & banking'],
  'fx-exposure-management': ['FX exposure management', 'FX & risk'],
  'fx-hedging': ['FX hedging', 'FX & risk'],
  'credit-facility-management': ['Managing credit facilities', 'Debt & funding'],
  'covenant-monitoring': ['Debt covenant monitoring', 'Debt & funding'],
  'month-end-reporting': ['Month-end treasury reporting', 'Controls & reporting'],
  'fraud-investigation': ['Fraud investigation', 'Controls & reporting'],
  'policy-compliance': ['Treasury policy compliance', 'Controls & reporting'],
  'acquisition-integration': ['Acquisition integration', 'Events & crises'],
  'currency-shock': ['Currency shock', 'Events & crises'],
  'liquidity-crisis': ['Liquidity crisis', 'Events & crises'],
}
const CANON_ORDER = Object.keys(CANON)
const GROUPS = ['Cash & liquidity', 'Payments & banking', 'FX & risk', 'Debt & funding', 'Controls & reporting', 'Events & crises']
const CLASS_ORDER: LensClass[] = ['good', 'possible', 'hard']

function wfTitle(id: string) {
  return workflowById.get(id)?.title ?? CANON[id]?.[0] ?? id
}
function wfGroup(id: string) {
  return workflowById.get(id)?.group ?? CANON[id]?.[1] ?? ''
}

/** 1 (unfavourable for an agent) … 5 (favourable), or 0 for neutral/context criteria. */
function favourability(c: Criterion, score: number) {
  if (c.favours === 'neutral') return 0
  return c.favours === 'high' ? score : 6 - score
}

/* ---------------- Small pieces ---------------- */
export function LensBadge({ cls }: { cls: LensClass }) {
  const label = lens().classes[cls]?.label ?? cls
  return <span className={`rating rating-${cls}`}>{label}</span>
}

function ScoreCell({ c, v }: { c: Criterion; v?: number }) {
  if (v == null) return <td className="lens-sc lens-f0">–</td>
  const f = favourability(c, v)
  return (
    <td className={`lens-sc lens-f${f}`} title={`${c.label}: ${v}/5`}>
      {v}
    </td>
  )
}

function Pips({ v, f }: { v: number; f: number }) {
  return (
    <span className={`lens-pips lens-pf${f}`} aria-label={`${v} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= v ? 'on' : ''} />
      ))}
    </span>
  )
}

function SourceList({ text }: { text?: string }) {
  const ids = text ? citeIdsIn(text) : []
  if (!ids.length) return null
  return (
    <ul className="lens-srcs">
      {ids.map((id) => {
        const s = sourceById.get(id)
        if (!s) return <li key={id} className="term-missing">Missing source {id}</li>
        return (
          <li key={id}>
            <a href={s.url} target="_blank" rel="noreferrer">
              {s.title}
            </a>{' '}
            <span className="muted">
              — {s.publisher}
              {s.year ? `, ${s.year}` : ''} · {s.type}
            </span>
          </li>
        )
      })}
    </ul>
  )
}

/* ---------------- Card / detail ---------------- */
export function LensCard({ id, compact = false }: { id: string; compact?: boolean }) {
  const L = lens()
  const e = L.workflows.find((w) => w.id === id)
  if (!e) return <div className="term-missing">No lens entry for {id}</div>
  const wf = workflowById.get(id)
  const dw = e.dw ? L.digital_workers.find((d) => d.id === e.dw) : undefined
  return (
    <section className="lens-card" aria-label={`Lens assessment: ${wfTitle(id)}`}>
      <header className="lens-card-head">
        <div>
          <div className="lens-kicker">
            {wfGroup(id)} · <Link to={`/workflows/${id}`}>workflow page</Link> ·{' '}
            <Link to={`/lens/matrix#${id}`}>matrix row</Link>
          </div>
          <h3 className="lens-card-title">{wfTitle(id)}</h3>
        </div>
        <LensBadge cls={e.class} />
      </header>
      <p className="lens-assignment">
        <span className="lens-label">Assignment</span> “{e.assignment}”
      </p>
      <div className="lens-headline">
        <Md text={e.headline} />
      </div>

      {!compact && (
        <>
          <div className="lens-crit-grid">
            {L.criteria.map((c) => {
              const v = e.scores[c.key]
              return (
                <div key={c.key} className="lens-crit">
                  <div className="lens-crit-top">
                    <span className="lens-crit-label" title={c.question}>
                      {c.label}
                    </span>
                    {v != null && <Pips v={v} f={favourability(c, v)} />}
                  </div>
                  <div className="lens-crit-note">{e.notes[c.key]}</div>
                </div>
              )
            })}
          </div>

          <dl className="lens-dl">
            {e.already_automated && (
              <>
                <dt>Already automated</dt>
                <dd>
                  <Md text={e.already_automated} />
                </dd>
              </>
            )}
            {e.agent_does && (
              <>
                <dt>What an AI system could do</dt>
                <dd>
                  <Md text={e.agent_does} />
                </dd>
              </>
            )}
            {e.human_keeps && (
              <>
                <dt>What stays with the human</dt>
                <dd>
                  <Md text={e.human_keeps} />
                </dd>
              </>
            )}
            {e.narrow_start && (
              <>
                <dt>Start narrow</dt>
                <dd>
                  <Md text={e.narrow_start} />
                </dd>
              </>
            )}
            {e.expansion && (
              <>
                <dt>Expand into the job</dt>
                <dd>
                  <Md text={e.expansion} />
                </dd>
              </>
            )}
            {e.must_be_true?.length ? (
              <>
                <dt>What would have to be true</dt>
                <dd>
                  <ul>
                    {e.must_be_true.map((m, i) => (
                      <li key={i}>
                        <Md text={m} inline />
                      </li>
                    ))}
                  </ul>
                </dd>
              </>
            ) : null}
            {e.startup_view && (
              <>
                <dt>As a startup opportunity</dt>
                <dd>
                  <Md text={e.startup_view} />
                </dd>
              </>
            )}
          </dl>

          {(wf?.ai_note || e.ai_note_view) && (
            <div className="lens-ainote">
              <div className="lens-label">Workflow author's neutral AI note</div>
              {wf?.ai_note ? <Md text={wf.ai_note} /> : <p className="muted">Workflow not yet written.</p>}
              {e.ai_note_view && (
                <p className="lens-ainote-view">
                  <span className="lens-label">Lens view</span> {e.ai_note_view}
                </p>
              )}
            </div>
          )}

          {e.evidence && (
            <div className="lens-evidence">
              <div className="lens-label">Evidence</div>
              <Md text={e.evidence} />
              <SourceList text={e.evidence} />
            </div>
          )}
          {dw && (
            <p className="lens-dwlink">
              Modelled as a digital worker: <Link to={dw.path}>{dw.title} →</Link>
            </p>
          )}
        </>
      )}
    </section>
  )
}

/* ---------------- Matrix ---------------- */
type SortKey = 'order' | 'title' | 'class' | string

export function LensMatrix() {
  const L = lens()
  const loc = useLocation()
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({ key: 'order', dir: 1 })
  const [cls, setCls] = useState<'all' | LensClass>('all')
  const [group, setGroup] = useState<string>('all')
  const [q, setQ] = useState('')
  const [sel, setSel] = useState<string | null>(null)

  // Select the row named in the URL hash (anchors = workflow ids).
  useEffect(() => {
    const h = decodeURIComponent(loc.hash.replace('#', ''))
    if (h && L.workflows.some((w) => w.id === h)) {
      setSel(h)
      requestAnimationFrame(() => document.getElementById(h)?.scrollIntoView({ block: 'center' }))
    }
  }, [loc.hash, L.workflows])

  const rows = useMemo(() => {
    const ql = q.trim().toLowerCase()
    const list = L.workflows.filter(
      (w) =>
        (cls === 'all' || w.class === cls) &&
        (group === 'all' || wfGroup(w.id) === group) &&
        (!ql || `${wfTitle(w.id)} ${w.assignment} ${w.headline}`.toLowerCase().includes(ql)),
    )
    const val = (w: LensEntry): number | string => {
      if (sort.key === 'order') return CANON_ORDER.indexOf(w.id)
      if (sort.key === 'title') return wfTitle(w.id)
      if (sort.key === 'class') return CLASS_ORDER.indexOf(w.class)
      return w.scores[sort.key] ?? 0
    }
    return [...list].sort((a, b) => {
      const va = val(a)
      const vb = val(b)
      const d = typeof va === 'string' ? va.localeCompare(vb as string) : (va as number) - (vb as number)
      return d * sort.dir || CANON_ORDER.indexOf(a.id) - CANON_ORDER.indexOf(b.id)
    })
  }, [L.workflows, cls, group, q, sort])

  const clickSort = (key: SortKey) =>
    setSort((s) => (s.key === key ? { key, dir: (s.dir * -1) as 1 | -1 } : { key, dir: key === 'title' || key === 'order' || key === 'class' ? 1 : -1 }))
  const arrow = (key: SortKey) => (sort.key === key ? (sort.dir === 1 ? ' ▲' : ' ▼') : '')
  const pick = (id: string) => {
    setSel((s) => (s === id ? null : id))
    history.replaceState(null, '', `#${id}`)
  }
  const cols = L.criteria.length + 2

  return (
    <div className="lens-matrix">
      <div className="lens-controls">
        <div className="lens-seg" role="group" aria-label="Filter by classification">
          {(['all', ...CLASS_ORDER] as const).map((c) => (
            <button key={c} className={cls === c ? 'on' : ''} onClick={() => setCls(c)}>
              {c === 'all' ? `All (${L.workflows.length})` : `${L.classes[c].label} (${L.workflows.filter((w) => w.class === c).length})`}
            </button>
          ))}
        </div>
        <select className="input lens-select" value={group} onChange={(e) => setGroup(e.target.value)} aria-label="Filter by workflow group">
          <option value="all">All groups</option>
          {GROUPS.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <input className="input lens-q" placeholder="Filter…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Text filter" />
      </div>
      <div className="lens-legend">
        <span>Cell colour = how that score affects agent suitability:</span>
        <span className="lens-sc lens-f5">favourable</span>
        <span className="lens-sc lens-f3">mixed</span>
        <span className="lens-sc lens-f1">obstacle</span>
        <span className="lens-sc lens-f0">context only</span>
        <span className="muted">Click a header to sort, a row for the assessment.</span>
      </div>
      <div className="lens-scroll">
        <table className="lens-table">
          <thead>
            <tr>
              <th className="lens-th-wf">
                <button onClick={() => clickSort('title')}>Workflow{arrow('title')}</button>
                <button className="lens-th-reset" onClick={() => clickSort('order')} title="Canonical order">
                  #{arrow('order')}
                </button>
              </th>
              <th>
                <button onClick={() => clickSort('class')}>Class{arrow('class')}</button>
              </th>
              {L.criteria.map((c) => (
                <th key={c.key} className={`lens-th-c lens-fav-${c.favours}`} title={`${c.label} — ${c.question} (${c.scale})`}>
                  <button onClick={() => clickSort(c.key)}>
                    {c.short}
                    {arrow(c.key)}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((w) => (
              <Fragment key={w.id}>
                <tr id={w.id} className={`lens-row ${sel === w.id ? 'sel' : ''}`} onClick={() => pick(w.id)} aria-expanded={sel === w.id}>
                  <th scope="row" className="lens-td-wf">
                    <span className="lens-wf-title">{wfTitle(w.id)}</span>
                    <span className="lens-wf-group">{wfGroup(w.id)}</span>
                  </th>
                  <td>
                    <span className={`lens-dot lens-dot-${w.class}`} title={L.classes[w.class].label}>
                      {w.class === 'good' ? 'Good' : w.class === 'possible' ? 'Possible' : 'Hard'}
                    </span>
                  </td>
                  {L.criteria.map((c) => (
                    <ScoreCell key={c.key} c={c} v={w.scores[c.key]} />
                  ))}
                </tr>
                {sel === w.id && (
                  <tr className="lens-detail-row">
                    <td colSpan={cols}>
                      <div className="lens-detail">
                        <LensCard id={w.id} />
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            {!rows.length && (
              <tr>
                <td colSpan={cols} className="muted">
                  No workflows match the filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ---------------- Criteria table (method page) ---------------- */
export function LensCriteria() {
  const L = lens()
  const fav: Record<Favours, string> = { high: 'Higher = better for agents', low: 'Higher = obstacle', neutral: 'Context — read the note' }
  return (
    <div className="table-wrap">
      <table className="lens-crit-table">
        <thead>
          <tr>
            <th>Criterion</th>
            <th>Question asked</th>
            <th>Scale anchors</th>
            <th>Direction</th>
          </tr>
        </thead>
        <tbody>
          {L.criteria.map((c) => (
            <tr key={c.key}>
              <td>
                <strong>{c.label}</strong> <span className="muted">({c.short})</span>
              </td>
              <td>{c.question}</td>
              <td className="small">{c.scale}</td>
              <td className={`small lens-fav-${c.favours}`}>{fav[c.favours]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ---------------- Groups (candidates page) ---------------- */
export function LensGroup({ cls, detail = false }: { cls: LensClass; detail?: boolean }) {
  const L = lens()
  const list = L.workflows.filter((w) => w.class === cls).sort((a, b) => CANON_ORDER.indexOf(a.id) - CANON_ORDER.indexOf(b.id))
  return (
    <div className="lens-group">
      <p className="lens-group-meaning">
        <LensBadge cls={cls} /> {L.classes[cls].meaning}
      </p>
      {list.map((w) => (
        <div key={w.id} className="lens-group-item" id={`c-${w.id}`}>
          <div className="lens-group-head">
            <Link to={`/lens/matrix#${w.id}`} className="lens-group-title">
              {wfTitle(w.id)}
            </Link>
            <span className="muted small">{wfGroup(w.id)}</span>
          </div>
          <Md text={w.headline} />
          {detail && (
            <dl className="lens-dl lens-dl-tight">
              {w.narrow_start && (
                <>
                  <dt>Start narrow</dt>
                  <dd>
                    <Md text={w.narrow_start} />
                  </dd>
                </>
              )}
              {w.expansion && (
                <>
                  <dt>Expand</dt>
                  <dd>
                    <Md text={w.expansion} />
                  </dd>
                </>
              )}
              {w.startup_view && (
                <>
                  <dt>Business view</dt>
                  <dd>
                    <Md text={w.startup_view} />
                  </dd>
                </>
              )}
            </dl>
          )}
        </div>
      ))}
    </div>
  )
}

/** Compact overview: all 20 workflows as chips in three columns. */
export function LensSummary() {
  const L = lens()
  return (
    <div className="lens-summary">
      {CLASS_ORDER.map((c) => (
        <div key={c} className={`lens-summary-col lens-summary-${c}`}>
          <div className="lens-summary-head">
            <LensBadge cls={c} /> <span className="muted">{L.workflows.filter((w) => w.class === c).length}</span>
          </div>
          <ul>
            {L.workflows
              .filter((w) => w.class === c)
              .sort((a, b) => CANON_ORDER.indexOf(a.id) - CANON_ORDER.indexOf(b.id))
              .map((w) => (
                <li key={w.id}>
                  <Link to={`/lens/matrix#${w.id}`}>{wfTitle(w.id)}</Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/* ---------------- Digital worker ---------------- */
const ACCESS_LABEL: Record<Access, string> = { read: 'Read only', draft: 'Drafts only', none: 'No access' }

export function DigitalWorker({ id }: { id: string }) {
  const d = lens().digital_workers.find((x) => x.id === id)
  if (!d) return <div className="term-missing">No digital worker {id}</div>
  const co = d.company ? companyById.get(d.company) : undefined
  return (
    <div className="dw">
      <div className="dw-assign">
        <div className="lens-label">The human assignment</div>
        <blockquote>“{d.assignment}”</blockquote>
        <div className="dw-meta">
          <span>
            <b>Assigned by</b> {d.assigned_by}
          </span>
          <span>
            <b>Done today by</b> {d.performed_today_by}
          </span>
          <span>
            <b>Cadence</b> {d.cadence}
          </span>
          <span>
            <b>Workflow</b> <Link to={`/workflows/${d.workflow}`}>{wfTitle(d.workflow)}</Link> ·{' '}
            <Link to={`/lens/matrix#${d.workflow}`}>lens rating</Link>
          </span>
          {co && (
            <span>
              <b>Company</b> <Link to={co.path ?? `/companies/${co.id}`}>{co.name}</Link>
            </span>
          )}
        </div>
      </div>

      <h3 className="dw-h">1 · Inputs</h3>
      <div className="table-wrap">
        <table className="dw-table">
          <thead>
            <tr>
              <th>Input</th>
              <th>Source</th>
              <th>Arrives</th>
              <th>Quality in practice</th>
            </tr>
          </thead>
          <tbody>
            {d.inputs.map((i, k) => (
              <tr key={k}>
                <td>{i.name}</td>
                <td>{i.source}</td>
                <td className="small">{i.arrives}</td>
                <td className="small">{i.quality}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="dw-h">2 · Human reasoning — what the treasurer actually weighs</h3>
      <ol className="dw-reason">
        {d.reasoning.map((r, k) => (
          <li key={k}>{r}</li>
        ))}
      </ol>

      <h3 className="dw-h">3 · Tools and systems — and the access the system gets</h3>
      <ul className="dw-tools">
        {d.tools.map((t, k) => (
          <li key={k}>
            <span className={`dw-access dw-access-${t.access}`}>{ACCESS_LABEL[t.access]}</span>
            <span className="dw-tool-name">{t.name}</span>
            <span className="muted"> — {t.use}</span>
          </li>
        ))}
      </ul>

      <h3 className="dw-h">4 · Output</h3>
      <Md text={d.output} />

      <h3 className="dw-h">5 · Verification — how an expert judges it</h3>
      <div className="table-wrap">
        <table className="dw-table">
          <thead>
            <tr>
              <th>Check</th>
              <th>How</th>
            </tr>
          </thead>
          <tbody>
            {d.verification.map((v, k) => (
              <tr key={k}>
                <td>{v.check}</td>
                <td>{v.how}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="dw-h">6 · Execution — who acts</h3>
      <Md text={d.execution} />

      <h3 className="dw-h">7 · Feedback loop — how corrections become data</h3>
      <div className="dw-feedback">
        {d.feedback.map((f, k) => (
          <div key={k} className="dw-fb">
            <div className="dw-fb-signal">{f.signal}</div>
            <div className="dw-fb-arrow" aria-hidden>
              →
            </div>
            <div className="dw-fb-becomes">{f.becomes}</div>
          </div>
        ))}
      </div>

      <h3 className="dw-h">8 · Failure modes and guardrails</h3>
      <div className="table-wrap">
        <table className="dw-table">
          <thead>
            <tr>
              <th>Failure mode</th>
              <th>Guardrail</th>
            </tr>
          </thead>
          <tbody>
            {d.failure_modes.map((f, k) => (
              <tr key={k}>
                <td>{f.mode}</td>
                <td>{f.guardrail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="dw-h">9 · Autonomy ladder — start narrow, earn the next step</h3>
      <ol className="dw-ladder">
        {d.autonomy.map((a) => (
          <li key={a.level}>
            <span className="dw-lvl">L{a.level}</span>
            <div>
              <div className="dw-lvl-label">{a.label}</div>
              <div>{a.scope}</div>
              <div className="small muted">Gate to reach it: {a.gate}</div>
            </div>
          </li>
        ))}
      </ol>

      {d.metrics?.length ? (
        <>
          <h3 className="dw-h">Metrics to track</h3>
          <ul>
            {d.metrics.map((m, k) => (
              <li key={k}>{m}</li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  )
}

export function DigitalWorkerIndex() {
  const L = lens()
  return (
    <div className="dw-index">
      {L.digital_workers.map((d) => {
        const e = L.workflows.find((w) => w.id === d.workflow)
        return (
          <Link key={d.id} to={d.path} className="dw-card">
            <span className="dw-card-kicker">
              {wfTitle(d.workflow)}
              {e && (
                <>
                  {' · '}
                  <span className={`rating rating-${e.class}`}>{L.classes[e.class].label}</span>
                </>
              )}
            </span>
            <span className="dw-card-title">{d.title}</span>
            <span className="dw-card-q">“{d.assignment}”</span>
          </Link>
        )
      })}
    </div>
  )
}
