// Data-driven views (systems, competitors, agent lens, sources). Filled in as those sections are built.
import { useState } from 'react'
import { companies, data, sources } from '../lib/content'
import { SIZE_LABELS } from '../lib/sections'
import { SOURCE_TYPE_LABEL } from './Cite'
import { Md } from './Md'
import '../styles/systems.css'

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

// ---------- Systems & Data (content/data/systems.yaml) ----------
interface SystemsCategory {
  id: string
  name: string
  what: string
  sizes: string[]
}
interface SystemsProduct {
  id: string
  name: string
  vendor: string
  category: string
  segment: string
  current: string
  why: string
  flows: string
  users: string
  not: string
  sizes: string[]
  companies?: string[]
  sources?: string[]
  checked: 'search' | 'knowledge'
}
interface SystemsData {
  categories: SystemsCategory[]
  products: SystemsProduct[]
  layers: { id: string; name: string; boxes: { id: string; name: string }[] }[]
  stacks: Record<string, Record<string, string | null>>
}

function sys(): SystemsData {
  return data<SystemsData>('systems') ?? { categories: [], products: [], layers: [], stacks: {} }
}

const SIZE_ORDER = ['startup', 'sme', 'midmarket', 'multinational']

function SizeDots({ sizes }: { sizes: string[] }) {
  return (
    <span className="sys-sizes" aria-label={`Typical size: ${sizes.map((s) => SIZE_LABELS[s]?.short ?? s).join(', ')}`}>
      {SIZE_ORDER.map((s) => (
        <span key={s} className={sizes.includes(s) ? 'sys-size on' : 'sys-size'} title={SIZE_LABELS[s]?.label}>
          {SIZE_LABELS[s]?.short ?? s}
        </span>
      ))}
    </span>
  )
}

const CHECKED_LABEL: Record<string, string> = {
  search: 'Ownership/product facts checked against vendor or press pages, Sept 2026',
  knowledge: 'Long-established description; not re-verified in Sept 2026 — check the vendor site',
}

/** Compact overview table of products by category. `category` filters to one category id. */
export function SystemsTable({ category }: { category?: string }) {
  const { categories, products } = sys()
  const cats = categories.filter((c) => !category || c.id === category)
  return (
    <div className="table-wrap sys-table-wrap">
      <table className="sys-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Typical company size</th>
            <th>Why companies use it</th>
          </tr>
        </thead>
        <tbody>
          {cats.flatMap((c) =>
            products
              .filter((p) => p.category === c.id)
              .map((p) => (
                <tr key={p.id}>
                  <td>
                    <a href={`#${p.id}`} className="sys-prod-link">
                      {p.name}
                    </a>
                  </td>
                  <td>{c.name}</td>
                  <td>
                    <SizeDots sizes={p.sizes} />
                  </td>
                  <td>{p.why}</td>
                </tr>
              )),
          )}
        </tbody>
      </table>
    </div>
  )
}

/** The category definitions, with the sizes where each category typically appears. */
export function SystemCategories() {
  const { categories } = sys()
  return (
    <dl className="sys-cats">
      {categories.map((c) => (
        <div key={c.id} className="sys-cat">
          <dt>
            {c.name} <SizeDots sizes={c.sizes} />
          </dt>
          <dd>{c.what}</dd>
        </div>
      ))}
    </dl>
  )
}

/** Per-product profiles: category, why used, data flows, users, what it does NOT solve, currentness. */
export function VendorProfiles({ category, ids }: { category?: string; ids?: string[] }) {
  const { categories, products } = sys()
  const list = products.filter((p) => (!category || p.category === category) && (!ids || ids.includes(p.id)))
  const catName = (id: string) => categories.find((c) => c.id === id)?.name ?? id
  return (
    <div className="sys-profiles">
      {list.map((p) => (
        <section key={p.id} id={p.id} className="sys-profile">
          <header>
            <h3 className="sys-profile-title">{p.name}</h3>
            <div className="sys-profile-meta">
              <span className="sys-chip">{catName(p.category)}</span>
              <SizeDots sizes={p.sizes} />
            </div>
            <div className="sys-profile-vendor">
              {p.vendor} · {p.segment}
            </div>
          </header>
          <dl className="sys-profile-dl">
            <dt>Current state</dt>
            <dd>
              <Md text={p.current} inline />
            </dd>
            <dt>Why used</dt>
            <dd>
              <Md text={p.why} inline />
            </dd>
            <dt>Data flows</dt>
            <dd>
              <Md text={p.flows} inline />
            </dd>
            <dt>Who uses it</dt>
            <dd>
              <Md text={p.users} inline />
            </dd>
            <dt className="sys-not">Does not solve</dt>
            <dd>
              <Md text={p.not} inline />
            </dd>
            {p.companies && p.companies.length > 0 && (
              <>
                <dt>Reference companies</dt>
                <dd>
                  {p.companies
                    .map((id) => companies.find((c) => c.id === id)?.name ?? id)
                    .join(', ')}
                </dd>
              </>
            )}
          </dl>
          <div className={`sys-checked sys-checked-${p.checked}`}>{CHECKED_LABEL[p.checked]}</div>
        </section>
      ))}
    </div>
  )
}

/** Side-by-side table: what each reference company runs in each layer of the stack. */
export function CompanyStacks() {
  const { layers, stacks } = sys()
  const cos = ['kleio', 'alpine', 'helvetic', 'globalchem'].map((id) => companies.find((c) => c.id === id)).filter(Boolean)
  const [mode, setMode] = useState<'table' | 'list'>('table')
  const rows = layers.flatMap((l) => l.boxes.map((b) => ({ layer: l.name, id: b.id, name: b.name })))
  return (
    <div className="sys-costacks">
      <div className="sys-tabs sys-tabs-small">
        <button className={mode === 'table' ? 'sys-tab on' : 'sys-tab'} onClick={() => setMode('table')}>
          Table
        </button>
        <button className={mode === 'list' ? 'sys-tab on' : 'sys-tab'} onClick={() => setMode('list')}>
          By company
        </button>
      </div>
      {mode === 'table' ? (
        <div className="table-wrap">
          <table className="sys-table sys-costack-table">
            <thead>
              <tr>
                <th>Layer</th>
                {cos.map((c) => (
                  <th key={c!.id}>
                    {c!.name.split(' ')[0]}
                    <span className="sys-th-sub">{SIZE_LABELS[c!.size]?.short}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <th scope="row">{r.name}</th>
                  {cos.map((c) => {
                    const v = stacks[c!.id]?.[r.id]
                    return (
                      <td key={c!.id} className={v ? '' : 'sys-absent'}>
                        {v ?? '—'}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="sys-costack-list">
          {cos.map((c) => (
            <section key={c!.id} className="sys-costack-co">
              <h4>
                {c!.name} <span className="muted">· {SIZE_LABELS[c!.size]?.label}</span>
              </h4>
              <dl>
                {rows.map((r) => (
                  <div key={r.id} className={stacks[c!.id]?.[r.id] ? '' : 'sys-absent'}>
                    <dt>{r.name}</dt>
                    <dd>{stacks[c!.id]?.[r.id] ?? '—'}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
