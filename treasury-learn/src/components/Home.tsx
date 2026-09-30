import { Link } from 'react-router-dom'
import { NAV } from '../lib/nav'
import { useProgress, resetProgress } from '../lib/progress'
import { pageByPath, workflows, terms } from '../lib/content'

const BLURB: Record<string, string> = {
  start: 'What treasury is, how it differs from accounting, FP&A and the CFO, and how it grows with the company.',
  map: 'The ten areas of treasury on one page, each with a deeper explainer.',
  org: 'Who actually does which treasury work, reporting lines, hand-offs, a responsibility matrix by company size, and who to interview.',
  workflows: 'The spine of the manual: step-by-step, who does what in which system, and where judgment sits.',
  day: 'Three realistic Mondays: a CFO without a treasurer, a one-person-plus treasury, a full department.',
  companies: 'Four fictional companies used throughout, from a 30-person startup to a CHF 7bn group.',
  glossary: 'Plain-English and professional definitions, with examples and where each term shows up.',
  systems: 'How ERP, banks, TMS, market data and spreadsheets fit together — and what each vendor category is for.',
  size: 'Team, systems, banks, currencies and pain points at each size tier, using ranges not fake precision.',
  interview: 'Who owns what, what to ask, what not to ask, and the vocabulary to have ready.',
  lens: 'Skeptical assessment of which workflows suit software agents — separated from the learning material.',
  competitors: 'Who sells what to whom, by category, with evidence-backed notes only.',
  reference: 'Sources, how to read this manual, and open questions.',
}

export function Home() {
  const progress = useProgress()
  const total = NAV.reduce((n, s) => n + s.items.length, 0)
  const done = NAV.reduce((n, s) => n + s.items.filter((i) => progress[i.path]).length, 0)
  const guide = pageByPath.get('/reference/how-to-use')
  return (
    <article className="prose home">
      <div className="kicker">A working reference for founders who need to talk to treasurers</div>
      <h1>Treasury Field Manual</h1>
      <p className="lede">
        What corporate treasury actually does — the workflows, systems, banks, vocabulary and judgment calls — from a 30-person
        startup to a 50,000-person multinational. Every concept ends in the question: <em>what does the person actually do?</em>
      </p>
      <div className="home-stats">
        <span>
          <b>{workflows.length}</b> workflows
        </span>
        <span>
          <b>{terms.length}</b> glossary terms
        </span>
        <span>
          <b>
            {done}/{total}
          </b>{' '}
          pages read
        </span>
        {done > 0 && (
          <button className="link-btn" onClick={() => confirm('Reset reading progress?') && resetProgress()}>
            reset
          </button>
        )}
      </div>
      <div className="home-path">
        <b>Suggested path:</b> <Link to="/start">Start Here</Link> → <Link to="/map">Treasury Map</Link> → <Link to="/org">Organization & Roles</Link> →{' '}
        <Link to="/workflows/daily-cash-positioning">Daily cash positioning</Link> →{' '}
        <Link to="/workflows/cash-forecasting">Cash forecasting</Link> → <Link to="/day">Day in the Life</Link> →{' '}
        <Link to="/interview">Interview Prep</Link>. {guide && <Link to="/reference/how-to-use">How to use this manual</Link>}
      </div>
      <div className="home-grid">
        {NAV.map((s) => {
          const d = s.items.filter((i) => progress[i.path]).length
          return (
            <Link key={s.id} to={s.items[0]?.path ?? `/${s.id}`} className={`home-sec home-${s.group}`}>
              <span className="home-sec-head">
                {s.num && <span className="nav-num">{s.num}</span>}
                <span className="home-sec-title">{s.title}</span>
                <span className="nav-count">
                  {d}/{s.items.length}
                </span>
              </span>
              <span className="home-sec-blurb">{BLURB[s.id]}</span>
              {s.group === 'startup' && <span className="tag">Startup lens</span>}
            </Link>
          )
        })}
      </div>
    </article>
  )
}
