import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { whyById } from '../lib/content'
import { Md } from './Md'
import { Popover, useHoverPopover } from './Popover'

/**
 * Inline "why" annotation with hover popover: explains the reasoning behind a
 * number or decision. Link syntax: [CHF 12m](why:alpine-credit-line) — or use
 * this component directly: <Why id="alpine-credit-line">CHF 12m</Why>.
 */
export function Why({ id, children }: { id: string; children?: ReactNode }) {
  const w = whyById.get(id)
  const { open, anchor, show, hide } = useHoverPopover()
  if (!w) {
    return (
      <span className="why why-missing" title={`Missing why note: ${id}`}>
        {children ?? id}
      </span>
    )
  }
  return (
    <>
      <button
        type="button"
        className="why"
        ref={(el) => {
          anchor.current = el
        }}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children ?? w.claim}
      </button>
      <Popover anchor={anchor} open={open} onEnter={show} onLeave={hide}>
        <div className="popover-kicker">Why</div>
        <div className="popover-title">{w.claim}</div>
        <Md text={w.short} />
        {w.detail && (
          <div className="popover-detail">
            <Md text={w.detail} />
          </div>
        )}
        {w.check && (
          <div className="popover-check">
            <strong>What would make it wrong:</strong> <Md text={w.check} inline />
          </div>
        )}
      </Popover>
    </>
  )
}
