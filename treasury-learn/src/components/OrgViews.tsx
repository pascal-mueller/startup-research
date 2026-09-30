import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { data, workflowById, companyById } from '../lib/content'
import { SIZE_LABELS } from '../lib/sections'
import type { InterviewTopic, OrgExample, OrgNode, RaciMatrix, Role, Workflow } from '../lib/types'
import { Md } from './Md'
import '../styles/org.css'

const roles = () => data<Role[]>('roles') ?? []
const roleById = () => new Map(roles().map((r) => [r.id, r]))

export function RoleLink({ id, children }: { id: string; children?: React.ReactNode }) {
  const r = roleById().get(id)
  if (!r) return <span className="term-missing">{children ?? id}</span>
  return (
    <Link to={r.page ?? `/org/roles#${r.id}`} className="xref xref-role" title={r.oneLiner}>
      {children ?? r.title}
    </Link>
  )
}

/* ---------------- Org charts ---------------- */
// Local extension of OrgNode (lib/types is shared; stream-specific fields live here).
type OrgNodeX = OrgNode & {
  /** Functional ("dotted-line") reporting target, e.g. "Group Treasurer". Rendered under the node. */
  dottedTo?: string
  /** Headcount or size hint, e.g. "3 FTE". */
  fte?: string
  /** Render children as a vertical column instead of side by side (keeps wide charts readable). */
  stack?: boolean
  children?: OrgNodeX[]
}
type OrgExampleX = Omit<OrgExample, 'tree'> & { tree: OrgNodeX; variantOf?: string; typical?: string }

function Node({ n }: { n: OrgNodeX }) {
  return (
    <li>
      <div className={`org-node org-${n.kind ?? 'finance'} ${n.dotted ? 'org-dotted' : ''}`}>
        <span className="org-title">{n.title}</span>
        {n.who && <span className="org-who">{n.who}</span>}
        {n.fte && <span className="org-fte">{n.fte}</span>}
        {n.note && <span className="org-note">{n.note}</span>}
        {n.dottedTo && <span className="org-dotted-to">┄ dotted line to {n.dottedTo}</span>}
      </div>
      {n.children?.length ? (
        <ul className={n.stack ? 'org-stack' : undefined}>
          {n.children.map((c, i) => (
            <Node key={i} n={c} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

function OutlineNode({ n }: { n: OrgNodeX }) {
  return (
    <li>
      <div className={`org-line org-${n.kind ?? 'finance'} ${n.dotted ? 'org-dotted' : ''}`}>
        <span className="org-title">{n.title}</span>
        {n.who && <span className="org-who"> · {n.who}</span>}
        {n.fte && <span className="org-fte"> · {n.fte}</span>}
        {n.note && <div className="org-note">{n.note}</div>}
        {n.dottedTo && <div className="org-dotted-to">┄ dotted line to {n.dottedTo}</div>}
      </div>
      {n.children?.length ? (
        <ul>
          {n.children.map((c, i) => (
            <OutlineNode key={i} n={c} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

const narrow = () => typeof window !== 'undefined' && !!window.matchMedia?.('(max-width: 700px)').matches

export function OrgChart({ id, compact }: { id: string; compact?: boolean }) {
  const ex = (data<OrgExampleX[]>('orgs') ?? []).find((o) => o.id === id)
  const [mode, setMode] = useState<'tree' | 'outline'>(() => (narrow() ? 'outline' : 'tree'))
  if (!ex) return <div className="term-missing">Missing org example: {id}</div>
  const co = ex.company ? companyById.get(ex.company) : undefined
  return (
    <figure className="org-figure" id={`org-${ex.id}`}>
      <div className="org-head">
        <div className="org-head-row">
          <span className="compare-kicker">{SIZE_LABELS[ex.size]?.label}{ex.variantOf ? ` · variant: ${ex.variantOf}` : ''}</span>
          <span className="org-mode" role="tablist" aria-label="Chart layout">
            <button aria-selected={mode === 'tree'} onClick={() => setMode('tree')}>Chart</button>
            <button aria-selected={mode === 'outline'} onClick={() => setMode('outline')}>Outline</button>
          </span>
        </div>
        <span className="compare-q">
          {ex.title}
          {co && (
            <>
              {' '}
              · <Link to={co.path ?? '/companies'}>{co.name}</Link>
            </>
          )}
        </span>
        <span className="org-summary">
          <Md text={ex.summary} inline />
        </span>
        {ex.typical && (
          <span className="org-typical">
            <b>Typical when:</b> <Md text={ex.typical} inline />
          </span>
        )}
      </div>
      {mode === 'tree' ? (
        <div className="org-scroll">
          <ul className="org-tree">
            <Node n={ex.tree} />
          </ul>
        </div>
      ) : (
        <ul className="org-outline">
          <OutlineNode n={ex.tree} />
        </ul>
      )}
      <div className="org-legend">
        <span className="org-key org-exec">Executive / governance</span>
        <span className="org-key org-treasury">Does treasury work</span>
        <span className="org-key org-finance">Other finance</span>
        <span className="org-key org-business">Business / subsidiary</span>
        <span className="org-key org-external">External</span>
        <span className="org-key org-dotted">Dashed = functional (dotted-line) or part-time link</span>
      </div>
      {!compact && ex.whoDoesWhat?.length ? (
        <div className="table-wrap org-wdw">
          <table>
            <thead>
              <tr>
                <th style={{ width: '28%' }}>Treasury task</th>
                <th>Who actually does it here</th>
              </tr>
            </thead>
            <tbody>
              {ex.whoDoesWhat.map((w) => (
                <tr key={w.task}>
                  <td>{w.task}</td>
                  <td>
                    <Md text={w.who} inline />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
      {!compact && ex.notes?.length ? (
        <ul className="org-notes">
          {ex.notes.map((n, i) => (
            <li key={i}>
              <Md text={n} inline />
            </li>
          ))}
        </ul>
      ) : null}
    </figure>
  )
}

/* ---------------- Responsibility matrix ---------------- */
// Codes (spec §5): Owner, Performs, contributes Data, Approves, Reviews, Informed; empty = usually not involved.
// 'R' is REVIEWS here — not the "Responsible" of classic RACI.
const CODE_ORDER = ['O', 'P', 'D', 'A', 'R', 'I'] as const
const CODE_LABEL: Record<string, string> = {
  O: 'Owner — accountable for the outcome',
  P: 'Performs — does the hands-on work',
  D: 'Contributes data / input',
  A: 'Approves / authorises',
  R: 'Reviews — checks the output, challenges it',
  I: 'Informed — receives the result',
}
const CODE_SHORT: Record<string, string> = { O: 'Owns', P: 'Performs', D: 'Contributes data', A: 'Approves', R: 'Reviews', I: 'Informed' }

type RaciRowX = RaciMatrix['rows'][number]
type RaciMatrixX = Omit<RaciMatrix, 'columns' | 'rows'> & {
  intro?: string
  columns: { id: string; label: string; role?: string }[]
  rows: RaciRowX[]
}
const codesOf = (v?: string) =>
  (v ?? '')
    .trim()
    .split(/[,/ ]+/)
    .filter(Boolean)
    .sort((a, b) => CODE_ORDER.indexOf(a as never) - CODE_ORDER.indexOf(b as never))

function Codes({ v }: { v?: string }) {
  const cs = codesOf(v)
  if (!cs.length) return <span className="raci-none" title="Usually not involved">·</span>
  return (
    <>
      {cs.map((code) => (
        <span key={code} className={`raci-code raci-${code}`} title={CODE_LABEL[code] ?? code}>
          {code}
        </span>
      ))}
    </>
  )
}

function TaskLabel({ r }: { r: RaciRowX }) {
  return r.workflow && workflowById.has(r.workflow) ? (
    <Link to={`/workflows/${r.workflow}`} onClick={(e) => e.stopPropagation()}>
      {r.task}
    </Link>
  ) : (
    <>{r.task}</>
  )
}

export function RaciMatrixView({ initial = 'midmarket' }: { initial?: string }) {
  const mats = data<RaciMatrixX[]>('raci') ?? []
  const [size, setSize] = useState(mats.find((x) => x.size === initial)?.size ?? mats[0]?.size)
  const [view, setView] = useState<'matrix' | 'role' | 'across'>(() => (narrow() ? 'role' : 'matrix'))
  const [focus, setFocus] = useState<string | null>(null)
  const [openRow, setOpenRow] = useState<number | null>(null)
  const [allNotes, setAllNotes] = useState(false)
  const [roleSel, setRoleSel] = useState<string | null>(null)
  const [taskSel, setTaskSel] = useState<string>(mats[0]?.rows[0]?.task ?? '')
  const m = mats.find((x) => x.size === size)
  if (!m) return null
  const co = m.company ? companyById.get(m.company) : undefined
  const role = roleSel && m.columns.some((c) => c.id === roleSel) ? roleSel : m.columns.find((c) => m.rows.some((r) => codesOf(r.cells[c.id]).includes('O')))?.id ?? m.columns[0].id
  const tasks = mats[0]?.rows.map((r) => r.task) ?? []

  return (
    <div className="raci">
      <div className="raci-toolbar">
        <div className="raci-views" role="tablist" aria-label="Matrix view">
          <button role="tab" aria-selected={view === 'matrix'} onClick={() => setView('matrix')}>Matrix</button>
          <button role="tab" aria-selected={view === 'role'} onClick={() => setView('role')}>One role</button>
          <button role="tab" aria-selected={view === 'across'} onClick={() => setView('across')}>One workflow across sizes</button>
        </div>
      </div>

      {view !== 'across' && (
        <>
          <div className="size-tabs-bar raci-tabs" role="tablist" aria-label="Company size">
            {mats.map((x) => (
              <button key={x.size} role="tab" aria-selected={x.size === size} onClick={() => { setSize(x.size); setFocus(null); setOpenRow(null) }}>
                {x.label}
              </button>
            ))}
          </div>
          <div className="raci-context small">
            {co ? (
              <>
                Modelled on <Link to={co.path ?? '/companies'}>{co.name}</Link> — {co.tagline}{' '}
              </>
            ) : null}
            {m.intro && <Md text={m.intro} inline />}
          </div>
        </>
      )}

      {view === 'matrix' && (
        <>
          <div className="raci-hint muted small">
            Click a column header to highlight one role; click a row (ⓘ) for how this varies.{' '}
            <label className="raci-allnotes">
              <input type="checkbox" checked={allNotes} onChange={(e) => setAllNotes(e.target.checked)} /> show all notes
            </label>
          </div>
          <div className="table-wrap raci-wrap">
            <table className="raci-table">
              <thead>
                <tr>
                  <th className="raci-task">Workflow</th>
                  {m.columns.map((c) => (
                    <th key={c.id} className={`raci-col ${focus === c.id ? 'focus' : ''}`} onClick={() => setFocus(focus === c.id ? null : c.id)} title="Highlight this role">
                      <span>{c.label}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {m.rows.map((r, i) => {
                  const show = allNotes || openRow === i
                  return (
                    <Fragment key={r.task}>
                      <tr className={`raci-row ${openRow === i ? 'open' : ''}`} onClick={() => setOpenRow(openRow === i ? null : i)}>
                        <td className="raci-task">
                          <TaskLabel r={r} />
                          {r.note && <span className="raci-has-note">ⓘ</span>}
                        </td>
                        {m.columns.map((c) => (
                          <td key={c.id} className={`raci-cell ${focus === c.id ? 'focus' : ''} ${focus && focus !== c.id ? 'dim' : ''}`}>
                            <Codes v={r.cells[c.id]} />
                          </td>
                        ))}
                      </tr>
                      {show && r.note && (
                        <tr className="raci-note-row">
                          <td colSpan={m.columns.length + 1}>
                            <Md text={r.note} inline />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {view === 'role' && (
        <div className="raci-role">
          <label className="raci-select">
            Role:{' '}
            <select value={role} onChange={(e) => setRoleSel(e.target.value)}>
              {m.columns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>
          {(() => {
            const rid = m.columns.find((c) => c.id === role)?.role
            return rid && roleById().has(rid) ? (
              <span className="small muted">
                {' '}
                Role profile: <RoleLink id={rid} />
              </span>
            ) : null
          })()}
          {CODE_ORDER.map((code) => {
            const rows = m.rows.filter((r) => codesOf(r.cells[role]).includes(code))
            if (!rows.length) return null
            return (
              <div key={code} className="raci-role-group">
                <div className="raci-role-h">
                  <span className={`raci-code raci-${code}`}>{code}</span> {CODE_SHORT[code]}
                </div>
                <ul>
                  {rows.map((r) => (
                    <li key={r.task}>
                      <span className="raci-role-task">
                        <TaskLabel r={r} />
                      </span>
                      {r.note && (
                        <span className="raci-role-note">
                          <Md text={r.note} inline />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
          {(() => {
            const none = m.rows.filter((r) => !codesOf(r.cells[role]).length)
            return none.length ? (
              <div className="raci-role-group raci-role-none">
                <div className="raci-role-h">
                  <span className="raci-none">·</span> Usually not involved
                </div>
                <div className="small muted">{none.map((r) => r.task).join(' · ')}</div>
              </div>
            ) : null
          })()}
        </div>
      )}

      {view === 'across' && (
        <div className="raci-across">
          <label className="raci-select">
            Workflow:{' '}
            <select value={taskSel} onChange={(e) => setTaskSel(e.target.value)}>
              {tasks.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <div className="table-wrap">
            <table className="raci-across-table">
              <thead>
                <tr>
                  <th style={{ width: '17%' }}>Size</th>
                  <th>Owns</th>
                  <th>Performs</th>
                  <th>Approves</th>
                  <th>Data from / reviewed by</th>
                </tr>
              </thead>
              <tbody>
                {mats.map((mx) => {
                  const r = mx.rows.find((x) => x.task === taskSel)
                  if (!r) return null
                  const who = (code: string) =>
                    mx.columns.filter((c) => codesOf(r.cells[c.id]).includes(code)).map((c) => c.label)
                  const list = (xs: string[]) => (xs.length ? xs.join(', ') : '—')
                  const d = who('D')
                  const rv = who('R')
                  return (
                    <Fragment key={mx.size}>
                      <tr>
                        <td className="raci-across-size">{mx.label}</td>
                        <td>{list(who('O'))}</td>
                        <td>{list(who('P'))}</td>
                        <td>{list(who('A'))}</td>
                        <td className="small">
                          {d.length ? <>Data: {d.join(', ')}. </> : null}
                          {rv.length ? <>Reviews: {rv.join(', ')}.</> : null}
                          {!d.length && !rv.length ? '—' : null}
                        </td>
                      </tr>
                      {r.note && (
                        <tr className="raci-note-row">
                          <td colSpan={5}>
                            <Md text={r.note} inline />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="raci-legend">
        {CODE_ORDER.map((k) => (
          <span key={k}>
            <span className={`raci-code raci-${k}`}>{k}</span> {CODE_LABEL[k]}
          </span>
        ))}
        <span>
          <span className="raci-none">·</span> usually not involved
        </span>
      </div>
    </div>
  )
}

/* ---------------- Who should I interview? ---------------- */
export function InterviewFinder() {
  const topics = data<InterviewTopic[]>('interview-topics') ?? []
  const [id, setId] = useState(topics[0]?.id)
  const t = topics.find((x) => x.id === id)
  const rb = useMemo(roleById, [])
  const RoleRow = ({ role, why, tone }: { role: string; why: string; tone: string }) => {
    const r = rb.get(role)
    return (
      <li className={`finder-role finder-${tone}`}>
        <div className="finder-role-name">{r ? <RoleLink id={role} /> : role}</div>
        <div className="finder-why">
          <Md text={why} inline />
        </div>
      </li>
    )
  }
  return (
    <div className="finder">
      <div className="finder-topics" role="tablist">
        {topics.map((x) => (
          <button key={x.id} aria-selected={x.id === id} onClick={() => setId(x.id)}>
            {x.title}
          </button>
        ))}
      </div>
      {t && (
        <div className="finder-body">
          {t.workflows?.length ? (
            <div className="finder-wfs small">
              Related workflows:{' '}
              {t.workflows.map((w, i) => (
                <span key={w}>
                  {i > 0 && ' · '}
                  <Link to={`/workflows/${w}`}>{workflowById.get(w)?.title ?? w}</Link>
                </span>
              ))}
            </div>
          ) : null}
          <h3>Best people to interview</h3>
          <ul className="finder-list">
            {t.best.map((b) => (
              <RoleRow key={b.role} {...b} tone="best" />
            ))}
          </ul>
          {t.also?.length ? (
            <>
              <h3>Also worth talking to</h3>
              <ul className="finder-list">
                {t.also.map((b) => (
                  <RoleRow key={b.role} {...b} tone="also" />
                ))}
              </ul>
            </>
          ) : null}
          <h3>Less useful at first</h3>
          <ul className="finder-list">
            {t.less.map((b) => (
              <RoleRow key={b.role} {...b} tone="less" />
            ))}
          </ul>
          {t.sizeNote && (
            <aside className="callout callout-synthesis">
              <div className="callout-label">Depends on company size</div>
              <div className="callout-body">
                <Md text={t.sizeNote} />
              </div>
            </aside>
          )}
          {t.openers?.length ? (
            <>
              <h3>Good openers for this topic</h3>
              <ul>
                {t.openers.map((o, i) => (
                  <li key={i}>
                    <Md text={o} inline />
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      )}
    </div>
  )
}

/* ---------------- Roles ---------------- */
export function RoleKnows({ id }: { id: string }) {
  const r = roleById().get(id)
  if (!r) return <div className="term-missing">Missing role {id}</div>
  return (
    <div className="knows">
      <div className="knows-col knows-best">
        <div className="knows-h">Best source for</div>
        <ul>{r.knows.best.map((x, i) => <li key={i}><Md text={x} inline /></li>)}</ul>
      </div>
      <div className="knows-col knows-some">
        <div className="knows-h">May know something about</div>
        <ul>{r.knows.some.map((x, i) => <li key={i}><Md text={x} inline /></li>)}</ul>
      </div>
      <div className="knows-col knows-not">
        <div className="knows-h">Probably won’t know the details of</div>
        <ul>{r.knows.not.map((x, i) => <li key={i}><Md text={x} inline /></li>)}</ul>
      </div>
    </div>
  )
}

export function RoleExists({ id }: { id: string }) {
  const r = roleById().get(id)
  if (!r) return null
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th style={{ width: '24%' }}>Company size</th>
            <th>Does this role exist, and who does the work?</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(SIZE_LABELS).map(([k, v]) =>
            r.exists[k as keyof typeof r.exists] ? (
              <tr key={k}>
                <td>{v.label}</td>
                <td>
                  <Md text={r.exists[k as keyof typeof r.exists]} inline />
                </td>
              </tr>
            ) : null,
          )}
        </tbody>
      </table>
    </div>
  )
}

export function RoleCalendar({ id, index = 0 }: { id: string; index?: number }) {
  const r = roleById().get(id)
  const cal = r?.calendars?.[index]
  const [open, setOpen] = useState<number | null>(null)
  if (!cal) return <div className="term-missing">Missing calendar {id}/{index}</div>
  return (
    <figure className="cal">
      <div className="org-head">
        <span className="compare-kicker">Example calendar · {r!.title}</span>
        <span className="compare-q">{cal.title}</span>
        <span className="org-summary">
          <Md text={cal.context} inline />
        </span>
      </div>
      <ol className="cal-list">
        {cal.entries.map((e, i) => (
          <li key={i} className={open === i ? 'open' : ''}>
            <button className="cal-row" onClick={() => setOpen(open === i ? null : i)}>
              <span className="cal-time">{e.time}</span>
              <span className="cal-act">{e.activity}</span>
              <span className="cal-caret">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <dl className="cal-detail">
                <div><dt>Why</dt><dd><Md text={e.why} inline /></dd></div>
                {e.system && <div><dt>System</dt><dd><Md text={e.system} inline /></dd></div>}
                {e.info && <div><dt>Information needed</dt><dd><Md text={e.info} inline /></dd></div>}
                {e.decision && <div><dt>Decision</dt><dd><Md text={e.decision} inline /></dd></div>}
                {e.with && <div><dt>Interacts with</dt><dd><Md text={e.with} inline /></dd></div>}
              </dl>
            )}
          </li>
        ))}
      </ol>
      <figcaption>Click any entry for why, system, information, decision and counterpart.</figcaption>
    </figure>
  )
}

export function RoleIndex({ family }: { family?: string }) {
  const list = roles().filter((r) => !family || r.family === family)
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>In one line</th>
            <th>Usually reports to</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r.id} id={r.id}>
              <td style={{ fontWeight: 600 }}>
                <RoleLink id={r.id} />
                {r.aka?.length ? <div className="muted small">{r.aka.join(' · ')}</div> : null}
              </td>
              <td>
                <Md text={r.oneLiner} inline />
              </td>
              <td className="muted">
                <Md text={r.reportsTo} inline />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ---------------- Workflow hand-offs ---------------- */
export function HandoffChain({ w }: { w: Workflow }) {
  if (!w.handoffs?.length) return null
  return (
    <ol className="handoffs">
      {w.handoffs.map((h, i) => (
        <li key={i}>
          <span className="ho-from">{h.from}</span>
          <span className="ho-arrow">→</span>
          <span className="ho-gives">
            <Md text={h.gives} inline />
          </span>
          <span className="ho-arrow">→</span>
          <span className="ho-to">{h.to}</span>
          {h.note && (
            <span className="ho-note">
              <Md text={h.note} inline />
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}

export function Handoffs({ workflow }: { workflow: string }) {
  const w = workflowById.get(workflow)
  if (!w) return <div className="term-missing">Missing workflow {workflow}</div>
  return (
    <div className="handoff-block">
      <div className="handoff-title">
        <Link to={`/workflows/${w.id}`}>{w.title}</Link> <span className="muted">— “{w.question}”</span>
      </div>
      <HandoffChain w={w} />
    </div>
  )
}

export function AllHandoffs() {
  const all = [...workflowById.values()].filter((w) => w.handoffs?.length)
  const [q, setQ] = useState('')
  const needle = q.trim().toLowerCase()
  const shown = needle
    ? all.filter((w) => w.handoffs!.some((h) => `${h.from} ${h.to} ${h.gives}`.toLowerCase().includes(needle)))
    : all
  return (
    <div className="all-handoffs">
      <div className="ho-filter">
        <input type="search" placeholder="Filter by party, e.g. “accounts payable”, “subsidiary”, “CFO”" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filter hand-offs" />
        <span className="muted small">
          {shown.length} of {all.length} written workflows with hand-offs
        </span>
      </div>
      {shown.map((w) => (
        <Handoffs key={w.id} workflow={w.id} />
      ))}
    </div>
  )
}
