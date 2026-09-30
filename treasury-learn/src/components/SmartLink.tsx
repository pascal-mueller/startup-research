import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Term } from './Term'
import { Cite } from './Cite'
import { workflowById, companyById } from '../lib/content'

/**
 * Link syntax used throughout the content (Markdown and MDX):
 *   [value date](term:value-date)     glossary term with tooltip
 *   [](cite:pwc-gts-2025)             citation (comma-separate for several)
 *   [forecasting](wf:cash-forecasting) workflow
 *   [Alpine](co:alpine)                company scenario
 *   [text](/map/fx)                    internal page
 */
function hasText(c: ReactNode) {
  return c != null && c !== '' && !(Array.isArray(c) && c.length === 0)
}

export function SmartLink({ href = '', children }: { href?: string; children?: ReactNode }) {
  const [scheme, ...rest] = href.split(':')
  const target = rest.join(':')
  if (scheme === 'term') return <Term id={target}>{children}</Term>
  if (scheme === 'cite') return <Cite id={target} />
  if (scheme === 'wf') {
    const w = workflowById.get(target)
    return (
      <Link to={`/workflows/${target}`} className={w ? 'xref xref-wf' : 'xref term-missing'} title={w?.question}>
        {hasText(children) ? children : w?.title ?? target}
      </Link>
    )
  }
  if (scheme === 'co') {
    const c = companyById.get(target)
    return (
      <Link to={c?.path ?? '/companies'} className="xref xref-co" title={c?.tagline}>
        {hasText(children) ? children : c?.name}
      </Link>
    )
  }
  if (href.startsWith('/')) return <Link to={href}>{children}</Link>
  if (href.startsWith('#'))
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault()
          document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth' })
        }}
      >
        {children}
      </a>
    )
  return (
    <a href={href} target="_blank" rel="noreferrer" className="external">
      {children}
    </a>
  )
}
