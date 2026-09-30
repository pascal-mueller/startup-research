import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { companies, companyById, compareTopicById, workflowById, workflows, WORKFLOW_GROUPS } from '../lib/content'
import { SIZE_LABELS } from '../lib/sections'
import { Md } from './Md'

const CALLOUT_LABEL: Record<string, string> = {
  concept: 'Concept',
  survey: 'Survey finding',
  field: 'Field note',
  synthesis: 'Synthesis',
  warning: 'Watch out',
  interview: 'In an interview',
  confusion: 'Commonly confused',
  actually: 'What the person actually does',
}

/** Evidence-typed callout. `type` controls the label so readers can tell established fact from synthesis. */
export function Callout({ type = 'concept', title, children }: { type?: string; title?: string; children: ReactNode }) {
  return (
    <aside className={`callout callout-${type}`}>
      <div className="callout-label">
        {CALLOUT_LABEL[type] ?? type}
        {title && <span className="callout-title"> — {title}</span>}
      </div>
      <div className="callout-body">{children}</div>
    </aside>
  )
}

/** Simple step diagram. steps: array of labels (optionally "Label|sub text"). */
export function Flow({ steps, direction = 'row', caption, loop }: { steps: string[]; direction?: 'row' | 'col'; caption?: string; loop?: string }) {
  return (
    <figure className={`flow flow-${direction}`}>
      <div className="flow-track">
        {steps.map((s, i) => {
          const [label, sub] = s.split('|')
          return (
            <div className="flow-item" key={i}>
              <div className="flow-node">
                <span className="flow-num">{i + 1}</span>
                <span className="flow-label">{label}</span>
                {sub && <span className="flow-sub">{sub}</span>}
              </div>
              {i < steps.length - 1 && <div className="flow-arrow" aria-hidden />}
            </div>
          )
        })}
      </div>
      {loop && <div className="flow-loop">↺ {loop}</div>}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}

/** Expandable worked example. */
export function Example({ title, company, children, open = false }: { title: string; company?: string; children: ReactNode; open?: boolean }) {
  const c = company ? companyById.get(company) : undefined
  return (
    <details className="example" open={open}>
      <summary>
        <span className="example-kicker">Worked example{c ? ` · ${c.name}` : ''}</span>
        <span className="example-title">{title}</span>
      </summary>
      <div className="example-body">{children}</div>
    </details>
  )
}

/** Same problem across the four reference companies. */
export function CompanyCompare({ topic }: { topic: string }) {
  const t = compareTopicById.get(topic)
  if (!t) return <div className="term-missing">Missing compare topic: {topic}</div>
  const cols = companies.filter((c) => t.cells[c.id])
  return (
    <figure className="compare">
      <div className="compare-head">
        <span className="compare-kicker">Same problem, four companies</span>
        <span className="compare-q">{t.question}</span>
      </div>
      <div className="compare-grid" style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))` }}>
        {cols.map((c) => (
          <div className="compare-col" key={c.id}>
            <div className="compare-co">
              <Link to={c.path ?? '/companies'}>{c.name}</Link>
              <span className="compare-size">{SIZE_LABELS[c.size]?.short}</span>
            </div>
            <Md text={t.cells[c.id]} />
          </div>
        ))}
      </div>
      {t.takeaway && (
        <figcaption>
          <Md text={t.takeaway} inline />
        </figcaption>
      )}
    </figure>
  )
}

export function WorkflowCard({ id }: { id: string }) {
  const w = workflowById.get(id)
  if (!w) return <div className="term-missing">Missing workflow: {id}</div>
  return (
    <Link to={`/workflows/${w.id}`} className="wf-card">
      <span className="wf-card-group">{w.group}</span>
      <span className="wf-card-title">{w.title}</span>
      <span className="wf-card-q">“{w.question}”</span>
    </Link>
  )
}

export function WorkflowIndex() {
  return (
    <div className="wf-index">
      {WORKFLOW_GROUPS.map((g) => {
        const list = workflows.filter((w) => w.group === g)
        if (!list.length) return null
        return (
          <section key={g}>
            <h2 id={g.toLowerCase().replace(/[^a-z]+/g, '-')}>{g}</h2>
            <table className="wf-table">
              <thead>
                <tr>
                  <th>Workflow</th>
                  <th>The question it answers</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {list.map((w) => (
                  <tr key={w.id}>
                    <td>
                      <Link to={`/workflows/${w.id}`}>{w.title}</Link>
                    </td>
                    <td>“{w.question}”</td>
                    <td className="muted">
                      <Md text={w.frequency.split(/[.;]/)[0]} inline />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )
      })}
    </div>
  )
}

export function Workflows({ ids }: { ids: string[] }) {
  return (
    <div className="wf-cards">
      {ids.map((id) => (
        <WorkflowCard key={id} id={id} />
      ))}
    </div>
  )
}

/** Tabs across size tiers for inline MDX comparisons. */
export function SizeTabs({ children, ...tabs }: Record<string, ReactNode> & { children?: ReactNode }) {
  const keys = Object.keys(SIZE_LABELS).filter((k) => tabs[k])
  const [active, setActive] = useState(keys[0])
  return (
    <div className="size-tabs">
      <div className="size-tabs-bar" role="tablist">
        {keys.map((k) => (
          <button key={k} role="tab" aria-selected={active === k} onClick={() => setActive(k)}>
            {SIZE_LABELS[k].label}
          </button>
        ))}
      </div>
      <div className="size-tabs-body">{typeof tabs[active] === 'string' ? <Md text={tabs[active] as string} /> : tabs[active]}</div>
      {children}
    </div>
  )
}

export function CompanyCards() {
  return (
    <div className="co-cards">
      {companies.map((c) => (
        <Link key={c.id} to={c.path ?? '/companies'} className="co-card">
          <div className="co-card-head">
            <span className="co-card-name">{c.name}</span>
            <span className="compare-size">{SIZE_LABELS[c.size]?.short}</span>
          </div>
          <div className="co-card-tag">{c.tagline}</div>
          <dl>
            {c.facts.slice(0, 5).map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </Link>
      ))}
    </div>
  )
}

export function CompanyFacts({ id }: { id: string }) {
  const c = companyById.get(id)
  if (!c) return null
  return (
    <div className="co-facts">
      <dl>
        {c.facts.map((f) => (
          <div key={f.label}>
            <dt>{f.label}</dt>
            <dd>
              <Md text={f.value} inline />
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
