import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { termBacklinks, termById, terms } from '../lib/content'
import { Md } from './Md'
import { NotFound } from './NotFound'

export function GlossaryIndex() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('All')
  const cats = useMemo(() => ['All', ...Array.from(new Set(terms.map((t) => t.category))).sort()], [])
  const list = terms.filter((t) => {
    if (cat !== 'All' && t.category !== cat) return false
    if (!q) return true
    const s = q.toLowerCase()
    return t.term.toLowerCase().includes(s) || t.aka?.some((a) => a.toLowerCase().includes(s)) || t.plain.toLowerCase().includes(s)
  })
  const byLetter = new Map<string, typeof list>()
  for (const t of list) {
    const l = /[a-z]/i.test(t.term[0]) ? t.term[0].toUpperCase() : '#'
    byLetter.set(l, [...(byLetter.get(l) ?? []), t])
  }
  return (
    <div className="glossary">
      <div className="glossary-controls">
        <input
          className="input"
          placeholder={`Filter ${terms.length} terms…`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoFocus
        />
        <select className="input" value={cat} onChange={(e) => setCat(e.target.value)}>
          {cats.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      {[...byLetter.entries()].map(([l, ts]) => (
        <section key={l}>
          <h2 className="glossary-letter" id={`letter-${l}`}>
            {l}
          </h2>
          <dl className="glossary-list">
            {ts.map((t) => (
              <div key={t.id} className="glossary-row">
                <dt>
                  <Link to={`/glossary/${t.id}`}>{t.term}</Link>
                  {t.aka?.length ? <span className="muted"> · {t.aka.join(', ')}</span> : null}
                  <span className="tag">{t.category}</span>
                </dt>
                <dd>{t.plain}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
      {!list.length && <p className="muted">No terms match.</p>}
    </div>
  )
}

export function TermPage() {
  const { id = '' } = useParams()
  const t = termById.get(id)
  if (!t) return <NotFound what={`glossary term “${id}”`} />
  const wfs = termBacklinks.wf.get(t.id) ?? []
  const pgs = termBacklinks.pg.get(t.id) ?? []
  return (
    <article className="prose term-page">
      <div className="kicker">Glossary · {t.category}</div>
      <h1>{t.term}</h1>
      {t.aka?.length ? <p className="muted">Also: {t.aka.join(', ')}</p> : null}
      <dl className="term-fields">
        <div>
          <dt>Plain English</dt>
          <dd>
            <Md text={t.plain} />
          </dd>
        </div>
        <div>
          <dt>Professional definition</dt>
          <dd>
            <Md text={t.professional} />
          </dd>
        </div>
        <div>
          <dt>Example</dt>
          <dd>
            <Md text={t.example} />
          </dd>
        </div>
        {t.confusedWith && (
          <div>
            <dt>Don’t confuse with</dt>
            <dd>
              <Md text={t.confusedWith} />
            </dd>
          </div>
        )}
        {t.related?.length ? (
          <div>
            <dt>Related</dt>
            <dd className="chips">
              {t.related.map((r) => {
                const rt = termById.get(r)
                return (
                  <Link key={r} to={`/glossary/${r}`} className={rt ? 'chip' : 'chip term-missing'}>
                    {rt?.term ?? r}
                  </Link>
                )
              })}
            </dd>
          </div>
        ) : null}
        <div>
          <dt>Appears in workflows</dt>
          <dd className="chips">
            {wfs.length ? (
              wfs.map((w) => (
                <Link key={w.id} to={`/workflows/${w.id}`} className="chip chip-wf">
                  {w.title}
                </Link>
              ))
            ) : (
              <span className="muted">Not yet referenced by a workflow.</span>
            )}
          </dd>
        </div>
        {pgs.length ? (
          <div>
            <dt>Discussed on</dt>
            <dd className="chips">
              {pgs.map((p) => (
                <Link key={p.path} to={p.path} className="chip">
                  {p.meta.nav ?? p.meta.title}
                </Link>
              ))}
            </dd>
          </div>
        ) : null}
      </dl>
    </article>
  )
}
