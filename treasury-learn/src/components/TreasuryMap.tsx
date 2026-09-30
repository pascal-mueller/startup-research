import { Link } from 'react-router-dom'
import { sectionPages } from '../lib/content'

const CLUSTERS = [
  { id: 'liquidity', title: 'Liquidity core', note: 'Know the cash, predict the cash, move the cash' },
  { id: 'markets', title: 'Financial risk & capital', note: 'Currencies, rates, borrowing, investing' },
  { id: 'infra', title: 'Infrastructure & control', note: 'Banks, systems, controls that everything runs on' },
]

export function TreasuryMap() {
  const areas = sectionPages('map').filter((p) => p.slug !== 'index')
  return (
    <div className="tmap">
      {CLUSTERS.map((c) => {
        const list = areas.filter((a) => a.meta.cluster === c.id)
        if (!list.length) return null
        return (
          <section key={c.id} className={`tmap-cluster tmap-${c.id}`}>
            <header>
              <span className="tmap-cluster-title">{c.title}</span>
              <span className="muted">{c.note}</span>
            </header>
            <div className="tmap-areas">
              {list.map((a) => (
                <Link key={a.path} to={a.path} className="tmap-area">
                  <span className="tmap-area-title">{a.meta.nav ?? a.meta.title}</span>
                  <span className="tmap-area-sum">{a.meta.summary}</span>
                  {a.meta.subtopics && (
                    <span className="tmap-subs">
                      {a.meta.subtopics.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
