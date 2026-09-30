import { Link, useParams } from 'react-router-dom'
import { citeIdsIn, companyById, termById, workflowById } from '../lib/content'
import { SIZE_LABELS } from '../lib/sections'
import { CiteContext, References } from './Cite'
import { Md } from './Md'
import { NotFound } from './NotFound'
import { SizeTabs } from './Blocks'
import { PageFooter } from './PageFooter'
import { HandoffChain } from './OrgViews'

export function WorkflowPage() {
  const { id = '' } = useParams()
  const w = workflowById.get(id)
  if (!w) return <NotFound what={`workflow “${id}”`} />
  const cites = [...new Set([...citeIdsIn(JSON.stringify(w)), ...(w.sources ?? [])])]
  const sizeTabs = Object.fromEntries(Object.entries(w.by_size).filter(([, v]) => v)) as Record<string, string>
  return (
    <CiteContext.Provider value={cites}>
      <article className="prose workflow">
        <div className="kicker">
          Workflow · {w.group}
        </div>
        <h1>{w.title}</h1>
        <p className="wf-question">“{w.question}”</p>
        <div className="lede">
          <Md text={w.summary} />
        </div>

        <dl className="wf-facts">
          <div>
            <dt>Objective</dt>
            <dd>
              <Md text={w.objective} />
            </dd>
          </div>
          <div>
            <dt>Trigger</dt>
            <dd>
              <Md text={w.trigger} />
            </dd>
          </div>
          <div>
            <dt>Frequency</dt>
            <dd>
              <Md text={w.frequency} />
            </dd>
          </div>
        </dl>

        <div className="wf-two">
          <section>
            <h2 id="people">People involved</h2>
            <table className="kv">
              <tbody>
                {w.people.map((p) => (
                  <tr key={p.role}>
                    <th>{p.role}</th>
                    <td>
                      <Md text={p.does} inline />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section>
            <h2 id="systems">Systems involved</h2>
            <table className="kv">
              <tbody>
                {w.systems.map((s) => (
                  <tr key={s.name}>
                    <th>
                      <Md text={s.name} inline />
                    </th>
                    <td>
                      <Md text={s.use} inline />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        {w.handoffs?.length ? (
          <>
            <h2 id="handoffs">Who hands what to whom</h2>
            <HandoffChain w={w} />
          </>
        ) : null}

        <h2 id="data">Data required</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Comes from</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {w.data.map((d) => (
                <tr key={d.name}>
                  <td>
                    <Md text={d.name} inline />
                  </td>
                  <td>
                    <Md text={d.source} inline />
                  </td>
                  <td>
                    <Md text={d.notes} inline />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="steps">Step by step</h2>
        <p className="muted small">
          <span className="flag flag-judgment">Judgment</span> marks a point where a person decides rather than follows a rule.{' '}
          <span className="flag flag-manual">Manual</span> marks where spreadsheets, e-mail or re-keying typically appear.
        </p>
        <ol className="steps">
          {w.steps.map((s, i) => (
            <li key={i} className="step">
              <div className="step-head">
                <span className="step-num">{i + 1}</span>
                <span className="step-title">{s.title}</span>
                <span className="step-meta">
                  {s.when && <span className="step-when">{s.when}</span>}
                  {s.who && <span className="step-who">{s.who}</span>}
                  {s.where && (
                    <span className="step-where">
                      <Md text={s.where} inline />
                    </span>
                  )}
                </span>
              </div>
              <div className="step-body">
                <Md text={s.detail} />
                {s.judgment && (
                  <div className="step-flag flag-judgment-box">
                    <span className="flag flag-judgment">Judgment</span>
                    <Md text={s.judgment} />
                  </div>
                )}
                {s.manual && (
                  <div className="step-flag flag-manual-box">
                    <span className="flag flag-manual">Manual</span>
                    <Md text={s.manual} />
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>

        {w.example && (
          <details className="example" open>
            <summary>
              <span className="example-kicker">Worked example</span>
              <span className="example-title">{w.example.title}</span>
            </summary>
            <div className="example-body">
              <Md text={w.example.body} />
            </div>
          </details>
        )}

        <h2 id="judgment">Decisions that need human judgment</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th style={{ width: '38%' }}>Decision</th>
                <th>Why it is not a mechanical rule</th>
              </tr>
            </thead>
            <tbody>
              {w.judgment.map((j) => (
                <tr key={j.decision}>
                  <td>
                    <Md text={j.decision} inline />
                  </td>
                  <td>
                    <Md text={j.why} inline />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="failure-modes">What goes wrong</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Failure mode</th>
                <th>Consequence</th>
                <th>How it is usually caught</th>
              </tr>
            </thead>
            <tbody>
              {w.failure_modes.map((f) => (
                <tr key={f.mode}>
                  <td>
                    <Md text={f.mode} inline />
                  </td>
                  <td>
                    <Md text={f.consequence} inline />
                  </td>
                  <td>
                    <Md text={f.detection} inline />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="software">Software used today</h2>
        <Md text={w.software} />

        <h2 id="manual">Where spreadsheets and manual work appear</h2>
        <ul>
          {w.manual_work.map((m, i) => (
            <li key={i}>
              <Md text={m} inline />
            </li>
          ))}
        </ul>

        <h2 id="by-size">How it changes with company size</h2>
        <SizeTabs {...sizeTabs} />

        {w.companies && (
          <>
            <h2 id="companies">In the reference companies</h2>
            <div className="wf-companies">
              {Object.entries(w.companies).map(([cid, text]) => {
                const c = companyById.get(cid)
                return (
                  <div key={cid} className="wf-company">
                    <div className="wf-company-name">
                      <Link to={c?.path ?? '/companies'}>{c?.name ?? cid}</Link>
                      {c && <span className="compare-size">{SIZE_LABELS[c.size]?.short}</span>}
                    </div>
                    <Md text={text} />
                  </div>
                )
              })}
            </div>
          </>
        )}

        {w.evidence_note && (
          <aside className="callout callout-synthesis">
            <div className="callout-label">How solid is this page?</div>
            <div className="callout-body">
              <Md text={w.evidence_note} />
            </div>
          </aside>
        )}

        {w.interview && (
          <aside className="callout callout-interview">
            <div className="callout-label">Interviewing about this workflow</div>
            <div className="callout-body">
              <Md text={w.interview} />
            </div>
          </aside>
        )}

        {w.ai_note && (
          <details className="lens-note">
            <summary>Startup lens: where software or agents could plausibly help (kept separate — expand to read)</summary>
            <Md text={w.ai_note} />
            <p className="small">
              Full, skeptical assessment: <Link to={`/lens/matrix#${w.id}`}>Agentic Treasury matrix</Link>.
            </p>
          </details>
        )}

        {(w.related?.length || w.terms?.length) && (
          <section className="related">
            <h2 id="related">Related</h2>
            {w.related?.length ? (
              <div className="chips">
                {w.related.map((r) => (
                  <Link key={r} to={`/workflows/${r}`} className={workflowById.has(r) ? 'chip chip-wf' : 'chip term-missing'}>
                    {workflowById.get(r)?.title ?? r}
                  </Link>
                ))}
              </div>
            ) : null}
            {w.terms?.length ? (
              <div className="chips" style={{ marginTop: 8 }}>
                {w.terms.map((t) => (
                  <Link key={t} to={`/glossary/${t}`} className={termById.has(t) ? 'chip' : 'chip term-missing'}>
                    {termById.get(t)?.term ?? t}
                  </Link>
                ))}
              </div>
            ) : null}
          </section>
        )}
        <References ids={cites} />
        <PageFooter path={`/workflows/${w.id}`} />
      </article>
    </CiteContext.Provider>
  )
}
