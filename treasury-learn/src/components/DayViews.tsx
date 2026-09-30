// Day-in-the-Life views (stream "day"). Data: content/data/days.yaml.
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { data, companyById, workflowById } from '../lib/content'
import { Md } from './Md'
import '../styles/day.css'

/* ---------- types (local to this stream) ---------- */
interface DayEntry {
  time: string
  title: string
  kind: string
  systems?: string[]
  call?: string
  why: string
  input: string
  decision: string
  who: string
  next: string
  wf?: string[]
}
interface DayOfWeek {
  id: string
  label: string
  intro?: string
  entries: DayEntry[]
}
interface Persona {
  id: string
  name: string
  title: string
  company: string
  page: string
  rolePage?: string
  tier: string
  oneLiner: string
  reportsTo: string
  team: string
  treasuryShare: string
  firstCheck: string
  systems: string[]
  decides: string
  talksTo: string[]
  awake: string[]
  rhythm: { when: string; what: string }[]
  unusual: { title: string; body: string }
  days: DayOfWeek[]
}

const personas = (): Persona[] => data<{ personas: Persona[] }>('days')?.personas ?? []
const personaById = (id: string) => personas().find((p) => p.id === id)

const KIND_LABEL: Record<string, string> = {
  check: 'Check',
  analysis: 'Analysis / Excel',
  review: 'Review',
  meeting: 'Meeting',
  approval: 'Approval',
  exception: 'Exception',
  comms: 'Call / email',
  execution: 'Execution',
  decision: 'Decision',
  project: 'Project',
  recurring: 'Recurring',
  admin: 'Admin',
  unusual: 'Unusual',
}

const anchorFor = (day: string, time: string) => `${day}-${time.replace(':', '')}`

function Missing({ what }: { what: string }) {
  return <div className="term-missing">Missing day data: {what}</div>
}

/* ---------- persona header card ---------- */
export function PersonaCard({ id }: { id: string }) {
  const p = personaById(id)
  if (!p) return <Missing what={id} />
  const co = companyById.get(p.company)
  return (
    <section className="dl-card" aria-label={`${p.name}, ${p.title}`}>
      <div className="dl-card-head">
        <span className="dl-card-name">{p.name}</span>
        <span className="dl-card-role">
          {p.rolePage ? <Link to={p.rolePage}>{p.title}</Link> : p.title}
          {co && (
            <>
              {' · '}
              <Link to={co.path ?? '/companies'}>{co.name}</Link>
            </>
          )}
        </span>
      </div>
      <p className="dl-card-one">{p.oneLiner}</p>
      <dl className="dl-facts">
        <div>
          <dt>Reports to</dt>
          <dd>{p.reportsTo}</dd>
        </div>
        <div>
          <dt>Team</dt>
          <dd>{p.team}</dd>
        </div>
        <div>
          <dt>Time on treasury</dt>
          <dd>{p.treasuryShare}</dd>
        </div>
        <div>
          <dt>First check</dt>
          <dd>{p.firstCheck}</dd>
        </div>
        <div>
          <dt>Decides</dt>
          <dd>
            <Md text={p.decides} inline />
          </dd>
        </div>
        <div>
          <dt>Systems</dt>
          <dd className="dl-chips">
            {p.systems.map((s) => (
              <span key={s} className="dl-sys">
                {s}
              </span>
            ))}
          </dd>
        </div>
        <div>
          <dt>Talks to</dt>
          <dd>{p.talksTo.join(' · ')}</dd>
        </div>
      </dl>
    </section>
  )
}

/* ---------- the timeline ---------- */
function Row({ e, day, open, toggle }: { e: DayEntry; day: string; open: boolean; toggle: () => void }) {
  const id = anchorFor(day, e.time)
  return (
    <li className={`dt-row dt-k-${e.kind} ${open ? 'is-open' : ''}`} id={id}>
      <button className="dt-head" aria-expanded={open} aria-controls={`${id}-body`} onClick={toggle}>
        <span className="dt-time">{e.time}</span>
        <span className="dt-main">
          <span className="dt-title">{e.title}</span>
          <span className="dt-meta">
            <span className="dt-kind">{KIND_LABEL[e.kind] ?? e.kind}</span>
            {(e.systems ?? []).map((s) => (
              <span key={s} className="dl-sys">
                {s}
              </span>
            ))}
          </span>
          {e.call && (
            <span className="dt-call">
              <span className="dt-call-label">Decision</span>
              <span className="dt-call-text">{e.call}</span>
            </span>
          )}
        </span>
        <span className="dt-caret" aria-hidden>
          {open ? '▾' : '▸'}
        </span>
      </button>
      {open && (
        <div className="dt-body" id={`${id}-body`}>
          <dl className="dt-grid">
            <dt>Why</dt>
            <dd>
              <Md text={e.why} />
            </dd>
            <dt>Input</dt>
            <dd>
              <Md text={e.input} />
            </dd>
            <dt>System</dt>
            <dd>{e.systems?.length ? e.systems.join(' · ') : 'None — conversation'}</dd>
            <dt className="dt-dec">Decision</dt>
            <dd className="dt-dec">
              <Md text={e.decision} />
            </dd>
            <dt>With whom</dt>
            <dd>
              <Md text={e.who} />
            </dd>
            <dt>What next</dt>
            <dd>
              <Md text={e.next} />
            </dd>
          </dl>
          {e.wf?.length ? (
            <div className="dt-wf">
              <span className="dt-wf-label">Workflow</span>
              {e.wf.map((w) => (
                <Link key={w} to={`/workflows/${w}`} className={`chip chip-wf ${workflowById.has(w) ? '' : 'dt-wf-pending'}`}>
                  {workflowById.get(w)?.title ?? w.replace(/-/g, ' ')}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </li>
  )
}

export function DayTimeline({ persona, day }: { persona: string; day: string }) {
  const p = personaById(persona)
  const d = p?.days.find((x) => x.id === day)
  const { hash } = useLocation()
  const [open, setOpen] = useState<Set<string>>(new Set())
  useEffect(() => {
    const target = decodeURIComponent(hash.replace(/^#/, ''))
    if (target.startsWith(`${day}-`)) {
      setOpen((s) => new Set(s).add(target))
      setTimeout(() => document.getElementById(target)?.scrollIntoView({ block: 'start' }), 160)
    }
  }, [hash, day])
  if (!p || !d) return <Missing what={`${persona}/${day}`} />
  const ids = d.entries.map((e) => anchorFor(day, e.time))
  const allOpen = ids.every((i) => open.has(i))
  const toggle = (i: string) =>
    setOpen((s) => {
      const n = new Set(s)
      if (n.has(i)) n.delete(i)
      else n.add(i)
      return n
    })
  return (
    <figure className="dt">
      <div className="dt-top">
        <div>
          <span className="dt-kicker">
            {p.name} · {p.title}
          </span>
          <span className="dt-label">{d.label}</span>
        </div>
        <button className="dt-all" onClick={() => setOpen(allOpen ? new Set() : new Set(ids))}>
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>
      {d.intro && (
        <div className="dt-intro">
          <Md text={d.intro} />
        </div>
      )}
      <ol className="dt-list">
        {d.entries.map((e) => {
          const i = anchorFor(day, e.time)
          return <Row key={i} e={e} day={day} open={open.has(i)} toggle={() => toggle(i)} />
        })}
      </ol>
      <figcaption>Click a row for why, inputs, systems, the decision, who is involved and what happens next. Times and amounts are illustrative.</figcaption>
    </figure>
  )
}

/* ---------- rhythm, unusual event, worries ---------- */
export function DayRhythm({ persona }: { persona: string }) {
  const p = personaById(persona)
  if (!p) return <Missing what={persona} />
  return (
    <div className="table-wrap">
      <table className="dl-rhythm">
        <thead>
          <tr>
            <th>When</th>
            <th>What {p.name} does</th>
          </tr>
        </thead>
        <tbody>
          {p.rhythm.map((r) => (
            <tr key={r.when}>
              <td className="dl-when">{r.when}</td>
              <td>
                <Md text={r.what} inline />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DayUnusual({ persona }: { persona: string }) {
  const p = personaById(persona)
  if (!p) return <Missing what={persona} />
  return (
    <aside className="callout callout-warning dl-unusual">
      <div className="callout-label">
        Unusual event<span className="callout-title"> — {p.unusual.title}</span>
      </div>
      <div className="callout-body">
        <Md text={p.unusual.body} />
      </div>
    </aside>
  )
}

export function DayAwake({ persona }: { persona: string }) {
  const p = personaById(persona)
  if (!p) return <Missing what={persona} />
  return (
    <ul className="dl-awake">
      {p.awake.map((a, i) => (
        <li key={i}>
          <Md text={a} inline />
        </li>
      ))}
    </ul>
  )
}

/* ---------- index-page views ---------- */
const lead = (s: string) => (s.match(/\*\*(.+?)\*\*/)?.[1] ?? s).replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/\.$/, '')

export function DayPersonaIndex() {
  return (
    <div className="dl-index">
      {personas().map((p) => {
        const co = companyById.get(p.company)
        return (
          <Link key={p.id} to={p.page} className="dl-index-card">
            <span className="dl-index-name">
              {p.name} <span className="dl-index-title">{p.title}</span>
            </span>
            <span className="dl-index-co">{co?.name}</span>
            <span className="dl-index-one">{p.oneLiner}</span>
          </Link>
        )
      })}
    </div>
  )
}

export function DayCompare() {
  const ps = personas()
  return (
    <div className="table-wrap dl-compare">
      <table>
        <thead>
          <tr>
            <th>Person</th>
            <th>Treasury share</th>
            <th>First thing checked</th>
            <th>Main systems</th>
            <th>What keeps them awake</th>
          </tr>
        </thead>
        <tbody>
          {ps.map((p) => (
            <tr key={p.id}>
              <td>
                <Link to={p.page}>
                  <strong>{p.name}</strong>
                </Link>
                <div className="muted small">
                  {p.title}, {companyById.get(p.company)?.name}
                </div>
              </td>
              <td>{p.treasuryShare}</td>
              <td>{p.firstCheck}</td>
              <td>{p.systems.slice(0, 4).join('; ')}</td>
              <td>
                <ul className="dl-compare-awake">
                  {p.awake.map((a, i) => (
                    <li key={i}>{lead(a)}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
