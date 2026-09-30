import { createContext, useContext } from 'react'
import { sourceById } from '../lib/content'
import { Popover, useHoverPopover } from './Popover'
import type { Source } from '../lib/types'

export const CiteContext = createContext<string[]>([])

export const SOURCE_TYPE_LABEL: Record<Source['type'], string> = {
  survey: 'Industry survey',
  official: 'Official / regulator',
  standard: 'Standard / scheme body',
  vendor: 'Vendor documentation',
  practitioner: 'Practitioner article',
  news: 'News / trade press',
  filing: 'Company filing',
  academic: 'Academic / textbook',
}

function One({ id }: { id: string }) {
  const order = useContext(CiteContext)
  const s = sourceById.get(id)
  const n = order.indexOf(id) + 1
  const { open, anchor, show, hide } = useHoverPopover()
  if (!s) return <sup className="cite cite-missing" title={`Missing source: ${id}`}>[?]</sup>
  return (
    <>
      <a
        href={`#ref-${id}`}
        className="cite"
        ref={(el) => {
          anchor.current = el
        }}
        onClick={(e) => {
          e.preventDefault()
          document.getElementById(`ref-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }}
        onMouseEnter={show}
        onMouseLeave={hide}
      >
        {n > 0 ? n : '•'}
      </a>
      <Popover anchor={anchor} open={open} onEnter={show} onLeave={hide}>
        <div className="popover-kicker">{SOURCE_TYPE_LABEL[s.type]}</div>
        <div className="popover-title">{s.title}</div>
        <p className="muted">
          {s.publisher}
          {s.year ? `, ${s.year}` : ''}
        </p>
        {s.note && <p>{s.note}</p>}
        {s.url && (
          <a href={s.url} target="_blank" rel="noreferrer" className="popover-more">
            Open source ↗
          </a>
        )}
      </Popover>
    </>
  )
}

export function Cite({ id }: { id: string }) {
  const ids = id.split(',').map((s) => s.trim())
  return (
    <sup className="cites">
      {ids.map((i, k) => (
        <One key={i + k} id={i} />
      ))}
    </sup>
  )
}

export function References({ ids }: { ids: string[] }) {
  if (!ids.length) return null
  return (
    <section className="references">
      <h2 id="references">Sources</h2>
      <ol>
        {ids.map((id) => {
          const s = sourceById.get(id)
          if (!s) return <li key={id} id={`ref-${id}`}>Missing source “{id}”</li>
          return (
            <li key={id} id={`ref-${id}`}>
              <span className={`src-type src-${s.type}`}>{SOURCE_TYPE_LABEL[s.type]}</span>{' '}
              {s.url ? (
                <a href={s.url} target="_blank" rel="noreferrer">
                  {s.title}
                </a>
              ) : (
                s.title
              )}
              <span className="muted">
                {' '}
                — {s.publisher}
                {s.year ? `, ${s.year}` : ''}
              </span>
              {s.note && <div className="ref-note">{s.note}</div>}
            </li>
          )
        })}
      </ol>
    </section>
  )
}
