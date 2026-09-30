// Data-driven views (systems, competitors, agent lens, sources). Filled in as those sections are built.
import { sources } from '../lib/content'
import { SOURCE_TYPE_LABEL } from './Cite'

export function SourcesIndex() {
  const byType = new Map<string, typeof sources>()
  for (const s of sources) byType.set(s.type, [...(byType.get(s.type) ?? []), s])
  return (
    <div>
      {[...byType.entries()].map(([type, list]) => (
        <section key={type}>
          <h2 id={type}>{SOURCE_TYPE_LABEL[type as keyof typeof SOURCE_TYPE_LABEL]}</h2>
          <ul className="source-list">
            {list
              .sort((a, b) => a.title.localeCompare(b.title))
              .map((s) => (
                <li key={s.id} id={`ref-${s.id}`}>
                  {s.url ? (
                    <a href={s.url} target="_blank" rel="noreferrer">
                      {s.title}
                    </a>
                  ) : (
                    s.title
                  )}{' '}
                  <span className="muted">
                    — {s.publisher}
                    {s.year ? `, ${s.year}` : ''}
                  </span>
                  {s.note && <div className="ref-note">{s.note}</div>}
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
