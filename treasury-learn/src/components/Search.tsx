import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { search, snippet } from '../lib/search'

export function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('')
  const [sel, setSel] = useState(0)
  const nav = useNavigate()
  const input = useRef<HTMLInputElement>(null)
  const results = useMemo(() => search(q), [q])
  useEffect(() => {
    if (open) {
      setSel(0)
      setTimeout(() => input.current?.select(), 0)
    }
  }, [open])
  useEffect(() => setSel(0), [q])
  if (!open) return null
  const go = (path: string) => {
    onClose()
    nav(path)
  }
  return (
    <div className="search-backdrop" onMouseDown={onClose}>
      <div className="search-modal" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label="Search">
        <input
          ref={input}
          className="search-input"
          placeholder="Search pages, workflows, glossary…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setSel((s) => Math.min(s + 1, results.length - 1))
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault()
              setSel((s) => Math.max(s - 1, 0))
            }
            if (e.key === 'Enter' && results[sel]) go(results[sel].path)
          }}
        />
        <ul className="search-results">
          {results.map((r, i) => (
            <li key={r.id}>
              <button className={i === sel ? 'active' : ''} onMouseEnter={() => setSel(i)} onClick={() => go(r.path)}>
                <span className="sr-head">
                  <span className={`sr-kind sr-${r.kind}`}>{r.kind}</span>
                  <span className="sr-title">{r.title}</span>
                  <span className="sr-where">{r.where}</span>
                </span>
                <span className="sr-snip">{snippet(r.text, r.terms)}</span>
              </button>
            </li>
          ))}
          {q && !results.length && <li className="muted sr-empty">No results for “{q}”.</li>}
          {!q && <li className="muted sr-empty">Try “value date”, “13-week”, “covenant”, “EBICS”, “netting”…</li>}
        </ul>
      </div>
    </div>
  )
}
