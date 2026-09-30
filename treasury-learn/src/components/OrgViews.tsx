import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { data, workflowById, companyById } from '../lib/content'
import { SIZE_LABELS } from '../lib/sections'
import type { InterviewTopic, OrgExample, OrgNode, RaciMatrix, Role, Workflow } from '../lib/types'
import { Md } from './Md'

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
function Node({ n }: { n: OrgNode }) {
  return (
    <li>
      <div className={`org-node org-${n.kind ?? 'finance'} ${n.dotted ? 'org-dotted' : ''}`}>
        <span className="org-title">{n.title}</span>
        {n.who && <span className="org-who">{n.who}</span>}
        {n.note && <span className="org-note">{n.note}</span>}
      </div>
      {n.children?.length ? (
        <ul>
          {n.children.map((c, i) => (
            <Node key={i} n={c} />
          ))}
        </ul>
      ) : null}
    </li>
  )
}

export function OrgChart({ id }: { id: string }) {
  const ex = (data<OrgExample[]>('orgs') ?? []).find((o) => o.id === id)
  if (!ex) return <div className="term-missing">Missing org example: {id}</div>
  const co = ex.company ? companyById.get(ex.company) : undefined
  return (
    <figure className="org-figure">
      <div className="org-head">
        <span className="compare-kicker">{SIZE_LABELS[ex.size]?.label}</span>
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
      </div>
      <div className="org-scroll">
        <ul className="org-tree">
          <Node n={ex.tree} />
        </ul>
      </div>
      <div className="org-legend">
        <span className="org-key org-exec">Executive</span>
        <span className="org-key org-treasury">Treasury work</span>
        <span className="org-key org-finance">Other finance</span>
        <span className="org-key org-business">Business / subsidiary</span>
        <span className="org-key org-external">External</span>
        <span className="org-key org-dotted">Dotted = functional / part-time link</span>
      </div>
      {ex.whoDoesWhat?.length ? (
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
      {ex.notes?.length ? (
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
const CODE_LABEL: Record<string, string> = {
  O: 'Owner — accountable for the outcome',
  P: 'Performs — does the hands-on work',
  D: 'Contributes data / input',
  A: 'Approves / authorises',
  I: 'Reviewed / informed',
}

export function RaciMatrixView() {
  const mats = data<RaciMatrix[]>('raci') ?? []
  const [size, setSize] = useState(mats[1]?.size ?? mats[0]?.size)
  const [focus, setFocus] = useState<string | null>(null)
  const [openRow, setOpenRow] = useState<number | null>(null)
  const m = mats.find((x) => x.size === size)
  if (!m) return null
  const co = m.company ? companyById.get(m.company) : undefined
  return (
    <div className="raci">
      <div className="size-tabs-bar raci-tabs" role="tablist">
        {mats.map((x) => (
          <button key={x.size} role="tab" aria-selected={x.size === size} onClick={() => { setSize(x.size); setFocus(null); setOpenRow(null) }}>
            {x.label}
          </button>
        ))}
      </div>
      <div className="raci-context muted small">
        {co ? (
          <>
            Modelled on <Link to={co.path ?? '/companies'}>{co.name}</Link> — {co.tagline}{' '}
          </>
        ) : null}
        Click a column header to highlight one role; click a row for the caveat.
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
            {m.rows.map((r, i) => (
              <Fragment key={r.task}>
                <tr className={`raci-row ${openRow === i ? 'open' : ''}`} onClick={() => setOpenRow(openRow === i ? null : i)}>
                  <td className="raci-task">
                    {r.workflow && workflowById.has(r.workflow) ? (
                      <Link to={`/workflows/${r.workflow}`} onClick={(e) => e.stopPropagation()}>
                        {r.task}
                      </Link>
                    ) : (
                      r.task
                    )}
                    {r.note && <span className="raci-has-note">ⓘ</span>}
                  </td>
                  {m.columns.map((c) => {
                    const v = (r.cells[c.id] ?? '').trim()
                    return (
                      <td key={c.id} className={`raci-cell ${focus === c.id ? 'focus' : ''} ${focus && focus !== c.id ? 'dim' : ''}`}>
                        {v
                          ? v.split(/[,/ ]+/).filter(Boolean).map((code) => (
                              <span key={code} className={`raci-code raci-${code}`} title={CODE_LABEL[code] ?? code}>
                                {code}
                              </span>
                            ))
                          : <span className="raci-none">·</span>}
                      </td>
                    )
                  })}
                </tr>
                {openRow === i && r.note && (
                  <tr key={r.task + '-note'} className="raci-note-row">
                    <td colSpan={m.columns.length + 1}>
                      <Md text={r.note} inline />
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="raci-legend">
        {Object.entries(CODE_LABEL).map(([k, v]) => (
          <span key={k}>
            <span className={`raci-code raci-${k}`}>{k}</span> {v}
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
  return (
    <>
      {all.map((w) => (
        <Handoffs key={w.id} workflow={w.id} />
      ))}
    </>
  )
}
