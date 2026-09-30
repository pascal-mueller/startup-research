import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { termById } from '../lib/content'
import { Popover, useHoverPopover } from './Popover'

export function Term({ id, children }: { id: string; children?: ReactNode }) {
  const t = termById.get(id)
  const { open, anchor, show, hide } = useHoverPopover()
  if (!t) {
    return (
      <span className="term term-missing" title={`Missing glossary term: ${id}`}>
        {children ?? id}
      </span>
    )
  }
  return (
    <>
      <Link
        to={`/glossary/${t.id}`}
        className="term"
        ref={(el) => {
          anchor.current = el
        }}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children ?? t.term}
      </Link>
      <Popover anchor={anchor} open={open} onEnter={show} onLeave={hide}>
        <div className="popover-kicker">Glossary · {t.category}</div>
        <div className="popover-title">{t.term}</div>
        <p>{t.plain}</p>
        <Link to={`/glossary/${t.id}`} className="popover-more">
          Full entry →
        </Link>
      </Popover>
    </>
  )
}
