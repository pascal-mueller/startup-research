import { Link, useNavigate } from 'react-router-dom'
import { sectionPages } from '../lib/content'
import '../styles/map.css'

// ---------------------------------------------------------------------------------------------
// Treasury Map. Two views:
//  - a flow diagram of how the ten areas feed each other (SVG, clickable nodes, optional focus)
//  - cluster cards generated from the /map/* page frontmatter (title, summary, subtopics)
// Usage in MDX: <TreasuryMap /> (index: diagram + cards), <TreasuryMap focus="fx" /> (area page:
// diagram with the area and its direct neighbours highlighted, plus a text list of the connections).
// ---------------------------------------------------------------------------------------------

type AreaId =
  | 'working-capital'
  | 'cash-forecasting'
  | 'cash-management'
  | 'investments'
  | 'debt'
  | 'fx'
  | 'risk'
  | 'payments'
  | 'banking'
  | 'technology'

interface NodeDef {
  id: AreaId
  label: string
  x: number
  y: number
  cluster: 'liquidity' | 'markets' | 'infra'
}

interface EdgeDef {
  from: AreaId
  to: AreaId
  label: string
  dashed?: boolean
  // optional control-point offset for curved edges
  bend?: number
  // position of the label along the edge (0 = start, 1 = end); default 0.5
  labelAt?: number
}

const W = 150
const H = 44

const NODES: NodeDef[] = [
  { id: 'working-capital', label: 'Working capital', x: 95, y: 70, cluster: 'liquidity' },
  { id: 'cash-forecasting', label: 'Cash forecasting', x: 335, y: 70, cluster: 'liquidity' },
  { id: 'cash-management', label: 'Cash management', x: 605, y: 70, cluster: 'liquidity' },
  { id: 'investments', label: 'Investments', x: 885, y: 70, cluster: 'liquidity' },
  { id: 'fx', label: 'FX', x: 335, y: 240, cluster: 'markets' },
  { id: 'risk', label: 'Risk', x: 655, y: 240, cluster: 'markets' },
  { id: 'debt', label: 'Debt & financing', x: 885, y: 240, cluster: 'markets' },
  { id: 'payments', label: 'Payments', x: 180, y: 408, cluster: 'infra' },
  { id: 'banking', label: 'Bank relationships', x: 470, y: 408, cluster: 'infra' },
  { id: 'technology', label: 'Treasury technology', x: 815, y: 408, cluster: 'infra' },
]

const EDGES: EdgeDef[] = [
  { from: 'working-capital', to: 'cash-forecasting', label: 'AR / AP timing' },
  { from: 'cash-forecasting', to: 'cash-management', label: 'expected flows' },
  { from: 'cash-management', to: 'investments', label: 'surplus' },
  { from: 'cash-management', to: 'debt', label: 'shortfall → draw' },
  { from: 'cash-forecasting', to: 'fx', label: 'forecast FX flows = exposure' },
  { from: 'risk', to: 'fx', label: 'policy, limits' },
  { from: 'debt', to: 'risk', label: 'covenants' },
  { from: 'working-capital', to: 'payments', label: 'AP payment runs' },
  { from: 'fx', to: 'payments', label: 'deal settlements' },
  { from: 'banking', to: 'cash-management', label: 'statements, balances', dashed: true, labelAt: 0.22 },
  { from: 'banking', to: 'debt', label: 'credit facilities', dashed: true },
  { from: 'technology', to: 'banking', label: 'connectivity', dashed: true },
  { from: 'payments', to: 'banking', label: 'payment files', dashed: true },
]

const nodeById = new Map(NODES.map((n) => [n.id, n]))

// Point on the border of node box n in the direction of (tx, ty)
function edgePoint(n: NodeDef, tx: number, ty: number) {
  const dx = tx - n.x
  const dy = ty - n.y
  if (dx === 0 && dy === 0) return { x: n.x, y: n.y }
  const sx = Math.abs(dx) / (W / 2 + 4)
  const sy = Math.abs(dy) / (H / 2 + 4)
  const s = Math.max(sx, sy)
  return { x: n.x + dx / s, y: n.y + dy / s }
}

function edgePath(e: EdgeDef) {
  const a = nodeById.get(e.from)!
  const b = nodeById.get(e.to)!
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  // perpendicular offset for a gentle curve
  const len = Math.hypot(b.x - a.x, b.y - a.y) || 1
  const bend = e.bend ?? 0
  const cx = mx + (-(b.y - a.y) / len) * bend
  const cy = my + ((b.x - a.x) / len) * bend
  const p1 = edgePoint(a, cx, cy)
  const p2 = edgePoint(b, cx, cy)
  // label at the curve midpoint (quadratic Bezier t = 0.5)
  const t = e.labelAt ?? 0.5
  const lx = (1 - t) * (1 - t) * p1.x + 2 * (1 - t) * t * cx + t * t * p2.x
  const ly = (1 - t) * (1 - t) * p1.y + 2 * (1 - t) * t * cy + t * t * p2.y
  return { d: `M${p1.x},${p1.y} Q${cx},${cy} ${p2.x},${p2.y}`, lx, ly }
}

function FlowDiagram({ focus }: { focus?: AreaId }) {
  const navigate = useNavigate()
  const near = new Set<AreaId>()
  if (focus) {
    near.add(focus)
    for (const e of EDGES) {
      if (e.from === focus) near.add(e.to)
      if (e.to === focus) near.add(e.from)
    }
  }
  const isOn = (e: EdgeDef) => !focus || e.from === focus || e.to === focus
  return (
    <figure className="tmap-flow">
      <svg viewBox="0 0 1000 440" role="img" aria-label="How the ten treasury areas feed each other">
        <defs>
          <marker id="tmap-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" className="tmap-arrowhead" />
          </marker>
        </defs>
        <rect x="14" y="356" width="972" height="80" rx="10" className="tmap-rail" />
        <text x="28" y="374" className="tmap-rail-label">
          EXECUTION RAILS — everything above runs on these
        </text>
        <text x="28" y="18" className="tmap-rail-label">
          LIQUIDITY CORE
        </text>
        <text x="440" y="206" className="tmap-rail-label">
          FINANCIAL RISK & CAPITAL
        </text>
        {EDGES.map((e) => {
          const { d, lx, ly } = edgePath(e)
          const on = isOn(e)
          return (
            <g key={`${e.from}-${e.to}`} className={`tmap-edge${on ? '' : ' dim'}${e.dashed ? ' dashed' : ''}${focus && on ? ' hot' : ''}`}>
              <path d={d} markerEnd="url(#tmap-arrow)" />
              <text x={lx} y={ly - 5} textAnchor="middle">
                {e.label}
              </text>
            </g>
          )
        })}
        {NODES.map((n) => {
          const path = `/map/${n.id}`
          const dim = focus && !near.has(n.id)
          return (
            <a
              key={n.id}
              href={path}
              className={`tmap-node tmap-node-${n.cluster}${dim ? ' dim' : ''}${focus === n.id ? ' current' : ''}`}
              onClick={(ev) => {
                ev.preventDefault()
                navigate(path)
              }}
            >
              <rect x={n.x - W / 2} y={n.y - H / 2} width={W} height={H} rx="8" />
              <text x={n.x} y={n.y + 5} textAnchor="middle">
                {n.label}
              </text>
            </a>
          )
        })}
      </svg>
      <figcaption className="muted">
        Solid arrows: information or money that one area hands to the next. Dashed: infrastructure that the area depends on.
        Click an area to open it.
      </figcaption>
    </figure>
  )
}

function Connections({ focus }: { focus: AreaId }) {
  const inbound = EDGES.filter((e) => e.to === focus)
  const outbound = EDGES.filter((e) => e.from === focus)
  const label = (id: AreaId) => nodeById.get(id)?.label ?? id
  return (
    <div className="tmap-conn">
      <div>
        <span className="tmap-conn-h">Receives from</span>
        <ul>
          {inbound.map((e) => (
            <li key={e.from}>
              <Link to={`/map/${e.from}`}>{label(e.from)}</Link> <span className="muted">— {e.label}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <span className="tmap-conn-h">Feeds into</span>
        <ul>
          {outbound.map((e) => (
            <li key={e.to}>
              <Link to={`/map/${e.to}`}>{label(e.to)}</Link> <span className="muted">— {e.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const CLUSTERS = [
  { id: 'liquidity', title: 'Liquidity core', note: 'Know the cash, predict the cash, place or fund the cash' },
  { id: 'markets', title: 'Financial risk & capital', note: 'Currencies, rates, borrowing, the risk framework' },
  { id: 'infra', title: 'Infrastructure & control', note: 'Payments, banks and systems that everything runs on' },
]

function ClusterCards() {
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

export function TreasuryMap({ focus, view }: { focus?: string; view?: 'flow' | 'cards' | 'both' }) {
  const f = focus && nodeById.has(focus as AreaId) ? (focus as AreaId) : undefined
  const v = view ?? (f ? 'flow' : 'both')
  return (
    <div className="tmap-wrap">
      {(v === 'flow' || v === 'both') && <FlowDiagram focus={f} />}
      {f && <Connections focus={f} />}
      {(v === 'cards' || v === 'both') && <ClusterCards />}
    </div>
  )
}
