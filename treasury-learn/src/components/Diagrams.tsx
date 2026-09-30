// Bespoke diagrams used by MDX pages (Systems & Data stream).
// All diagrams are HTML/CSS (not fixed-size SVG) so text stays legible at 390px and follows the theme tokens.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { companies, data } from '../lib/content'
import '../styles/systems.css'

// ---------- types for content/data/systems.yaml (layers + stacks) ----------
interface StackBox {
  id: string
  name: string
  detail: string
  href?: string
}
interface StackLayer {
  id: string
  name: string
  note?: string
  boxes: StackBox[]
}
export interface SystemsStackData {
  layers: StackLayer[]
  stacks: Record<string, Record<string, string | null>>
}

function stackData(): SystemsStackData {
  return data<SystemsStackData>('systems') ?? { layers: [], stacks: {} }
}

const COMPANY_ORDER = ['kleio', 'alpine', 'helvetic', 'globalchem']

/**
 * Layered treasury technology stack. Without a company it explains each box;
 * with `company` (or via the tabs) it shows what that reference company actually runs in each box.
 */
export function StackDiagram({ company, tabs = true, caption }: { company?: string; tabs?: boolean; caption?: string }) {
  const { layers, stacks } = stackData()
  const [sel, setSel] = useState<string>(company ?? 'generic')
  const stack = sel === 'generic' ? undefined : stacks[sel]
  const coName = (id: string) => companies.find((c) => c.id === id)?.name.split(' ')[0] ?? id
  return (
    <figure className="sys-fig sys-stack">
      {tabs && (
        <div className="sys-tabs" role="tablist" aria-label="Show stack for">
          {['generic', ...COMPANY_ORDER].map((id) => (
            <button
              key={id}
              role="tab"
              aria-selected={sel === id}
              className={sel === id ? 'sys-tab on' : 'sys-tab'}
              onClick={() => setSel(id)}
            >
              {id === 'generic' ? 'What each layer does' : coName(id)}
            </button>
          ))}
        </div>
      )}
      <div className="sys-stack-layers">
        {layers.map((layer, i) => (
          <div key={layer.id}>
            <div className={`sys-layer sys-layer-${layer.id}`}>
              <div className="sys-layer-label">
                <span className="sys-layer-name">{layer.name}</span>
                {layer.note && <span className="sys-layer-note">{layer.note}</span>}
              </div>
              <div className="sys-layer-boxes">
                {layer.boxes.map((b) => {
                  const val = stack ? stack[b.id] : undefined
                  const absent = stack && (val === null || val === undefined)
                  return (
                    <div key={b.id} className={absent ? 'sys-box absent' : 'sys-box'}>
                      <div className="sys-box-name">{b.href ? <Link to={b.href}>{b.name}</Link> : b.name}</div>
                      <div className="sys-box-detail">{stack ? (absent ? 'Not a separate system here' : val) : b.detail}</div>
                    </div>
                  )
                })}
              </div>
            </div>
            {i < layers.length - 1 && <div className="sys-layer-join" aria-hidden />}
          </div>
        ))}
      </div>
      <figcaption>
        {caption ??
          'Data flows up from sources through connectivity into treasury tools; instructions (payments, deals) flow back down to the banks. Greyed boxes do not exist as a separate system at that company.'}
      </figcaption>
    </figure>
  )
}

// ---------- Data flow: who supplies what to treasury, and what treasury sends out ----------
interface FlowNode {
  name: string
  owner: string
  items: string[]
  href?: string
  timing?: string
}

const FLOW_IN: FlowNode[] = [
  {
    name: 'Banks',
    owner: 'the banks; channel run by treasury / IT',
    items: ['Prior-day statements (camt.053 / MT940 / BAI2)', 'Intraday reports (camt.052 / MT942)', 'Payment status (pain.002), notifications (camt.054)', 'Deal and facility confirmations, fee statements'],
    href: '/systems/bank-connectivity',
    timing: 'overnight to ~08:00; intraday',
  },
  {
    name: 'ERP (AP / AR / GL)',
    owner: 'accounting, AP, AR',
    items: ['Open payables and the payment-run calendar', 'Open receivables by due date', 'Intercompany balances, GL cash accounts', 'Vendor master data (bank details)'],
    href: '/systems/erp',
    timing: 'daily extract or on demand',
  },
  {
    name: 'Business units & FP&A',
    owner: 'subsidiary finance, FP&A, project managers',
    items: ['Forecast submissions (template or tool)', 'Budget, capex plan, big deals', '"The customer will pay late" — by email'],
    href: '/systems/data-quality',
    timing: 'weekly / monthly, often late',
  },
  {
    name: 'Market data',
    owner: 'data vendors, banks, central banks',
    items: ['FX spot and forward points', 'Interest-rate curves and fixings (SARON, €STR, SOFR)', 'Month-end accounting rates'],
    href: '/systems/market-data',
    timing: 'real time or daily',
  },
  {
    name: 'Treasury’s own records',
    owner: 'treasury',
    items: ['FX forwards and swaps, deposits, loans', 'Facility terms, covenants', 'Bank accounts, signatories, limits'],
    href: '/systems/tms',
    timing: 'as deals are done',
  },
]

const FLOW_OUT: FlowNode[] = [
  { name: 'To banks', owner: 'treasury / payments', items: ['Payment files (pain.001 / MT101)', 'FX and money-market deals', 'Account and mandate changes'] },
  { name: 'To accounting (ERP)', owner: 'treasury → accounting', items: ['Deal and hedge postings, interest accruals', 'In-house bank / intercompany entries', 'Rates for revaluation'] },
  { name: 'To CFO, board, lenders', owner: 'treasury', items: ['Cash position and 13-week forecast', 'Liquidity and covenant reports', 'Hedging and counterparty reports'] },
  { name: 'To subsidiaries', owner: 'treasury', items: ['Funding and cash-concentration instructions', 'Hedge confirmations, internal rates', 'Forecast accuracy feedback'] },
]

function FlowCard({ n, side }: { n: FlowNode; side: 'in' | 'out' }) {
  return (
    <div className={`sys-df-card sys-df-${side}`}>
      <div className="sys-df-name">{n.href ? <Link to={n.href}>{n.name}</Link> : n.name}</div>
      <div className="sys-df-owner">{n.owner}</div>
      <ul>
        {n.items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
      {n.timing && <div className="sys-df-timing">{n.timing}</div>}
    </div>
  )
}

/** Where treasury's data comes from, what treasury does with it, and where the results go. */
export function DataFlowDiagram({ caption }: { caption?: string }) {
  return (
    <figure className="sys-fig sys-df">
      <div className="sys-df-grid">
        <div className="sys-df-col">
          <div className="sys-df-colhead">Comes in (owned by others)</div>
          {FLOW_IN.map((n) => (
            <FlowCard key={n.name} n={n} side="in" />
          ))}
        </div>
        <div className="sys-df-arrow" aria-hidden>
          <span>→</span>
        </div>
        <div className="sys-df-col sys-df-center-col">
          <div className="sys-df-colhead">Treasury combines</div>
          <div className="sys-df-hub">
            <div className="sys-df-hub-title">TMS, cash tool or spreadsheet</div>
            <ol>
              <li>Import and check completeness (every account, every bank)</li>
              <li>Classify flows into cash-flow categories</li>
              <li>Build today’s position by entity, bank and currency</li>
              <li>Roll the forecast; compare actual vs forecast</li>
              <li>Value deals, measure exposures against policy</li>
              <li>Decide: fund, sweep, invest, hedge, draw, pay</li>
            </ol>
            <div className="sys-df-hub-note">Steps 1–5 are data work; step 6 is judgment by people with authority.</div>
          </div>
        </div>
        <div className="sys-df-arrow" aria-hidden>
          <span>→</span>
        </div>
        <div className="sys-df-col">
          <div className="sys-df-colhead">Goes out</div>
          {FLOW_OUT.map((n) => (
            <FlowCard key={n.name} n={n} side="out" />
          ))}
        </div>
      </div>
      <figcaption>
        {caption ??
          'Treasury owns very little of its input data. Most of the effort sits in step 1–2 (is everything here, and is it classified?) before any decision is made.'}
      </figcaption>
    </figure>
  )
}

// ---------- Bank connectivity channels ----------
interface Channel {
  name: string
  href?: string
  how: string
  out: string
  in: string
  fits: string
}
const CHANNELS: Channel[] = [
  { name: 'E-banking portal', href: '/glossary/bank-connectivity', how: 'A person logs in per bank (token / app), keys or uploads payments, downloads statements.', out: 'manual entry or pain.001 upload', in: 'PDF / camt.053 download', fits: 'Startups, SMEs, the odd foreign account everywhere' },
  { name: 'EBICS', href: '/glossary/ebics', how: 'Client software (ERP add-on, connectivity tool, TMS) exchanges files with each bank using keys initialised per bank.', out: 'pain.001 with distributed signatures', in: 'camt.052/053/054, pain.002', fits: 'DACH and France: SMEs to multinationals' },
  { name: 'Swift', href: '/glossary/swift', how: 'One channel to many banks via a service bureau, Alliance Lite2 or own infrastructure; SCORE or bank MA-CUG.', out: 'MT101 (FIN), pain.001 (FileAct)', in: 'MT940/942, camt.05x', fits: 'Multinationals with many banks in many countries' },
  { name: 'Host-to-host', href: '/glossary/host-to-host', how: 'Dedicated SFTP-type link to one bank, bank-specific formats and PGP/certificates.', out: 'bulk payment files, payroll', in: 'statements, acknowledgements', fits: 'High volumes with one bank; US and Asian banks' },
  { name: 'Bank API', href: '/glossary/api-banking', how: 'The system calls the bank’s REST endpoints; coverage and standards differ per bank.', out: 'single payments, status queries', in: 'balances and transactions on demand', fits: 'Intraday visibility; newer platforms; still a complement to files' },
]

/** Company systems ↔ channels ↔ banks, with what flows each way. */
export function ConnectivityDiagram({ caption }: { caption?: string }) {
  return (
    <figure className="sys-fig sys-conn">
      <div className="sys-conn-grid">
        <div className="sys-conn-end">
          <div className="sys-conn-end-title">Company side</div>
          <div className="sys-conn-end-body">ERP payment run · TMS · connectivity tool · a person at a browser</div>
        </div>
        <div className="sys-conn-lanes">
          {CHANNELS.map((c) => (
            <div className="sys-conn-lane" key={c.name}>
              <div className="sys-conn-name">{c.href ? <Link to={c.href}>{c.name}</Link> : c.name}</div>
              <div className="sys-conn-flows">
                <span className="sys-conn-out">→ {c.out}</span>
                <span className="sys-conn-in">← {c.in}</span>
              </div>
              <div className="sys-conn-how">{c.how}</div>
              <div className="sys-conn-fits">Typical: {c.fits}</div>
            </div>
          ))}
        </div>
        <div className="sys-conn-end">
          <div className="sys-conn-end-title">Bank side</div>
          <div className="sys-conn-end-body">Each bank’s channel gateway, format validation, mandate and signature checks, then execution</div>
        </div>
      </div>
      <figcaption>{caption ?? 'Most companies use several channels at once: e.g. EBICS for the home banks, Swift for the rest, a portal for the one account nobody has connected.'}</figcaption>
    </figure>
  )
}
