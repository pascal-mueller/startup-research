import { useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

/** Hover/focus popover positioned against the viewport so it never clips. */
export function useHoverPopover() {
  const [open, setOpen] = useState(false)
  const anchor = useRef<HTMLElement | null>(null)
  const timer = useRef<number | undefined>(undefined)
  const show = () => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(true), 180)
  }
  const hide = () => {
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOpen(false), 120)
  }
  return { open, anchor, show, hide }
}

export function Popover({ anchor, open, onEnter, onLeave, children }: {
  anchor: React.RefObject<HTMLElement | null>
  open: boolean
  onEnter: () => void
  onLeave: () => void
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null)
  useLayoutEffect(() => {
    if (!open || !anchor.current || !ref.current) return
    const a = anchor.current.getBoundingClientRect()
    const p = ref.current.getBoundingClientRect()
    let left = a.left
    if (left + p.width > window.innerWidth - 12) left = window.innerWidth - p.width - 12
    left = Math.max(12, left)
    let top = a.bottom + 6
    if (top + p.height > window.innerHeight - 12) top = a.top - p.height - 6
    top = Math.max(12, Math.min(top, window.innerHeight - p.height - 12))
    setPos({ top, left })
  }, [open, anchor])
  if (!open) return null
  return createPortal(
    <div
      ref={ref}
      className="popover"
      style={{ top: pos?.top ?? -9999, left: pos?.left ?? -9999 }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {children}
    </div>,
    document.body,
  )
}
