import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV, crumbs } from '../lib/nav'
import { useProgress } from '../lib/progress'
import { SearchModal } from './Search'

function useTheme() {
  const [theme, setTheme] = useState<string | undefined>(() => document.documentElement.dataset.theme)
  const toggle = () => {
    const dark = theme ? theme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
    const next = dark ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('tfm-theme', next)
    } catch {
      /* ignore */
    }
    setTheme(next)
  }
  return toggle
}

function Sidebar({ onNavigate }: { onNavigate: () => void }) {
  const { pathname } = useLocation()
  const progress = useProgress()
  const current = pathname.split('/')[1]
  const [openSecs, setOpenSecs] = useState<Record<string, boolean>>({})
  let lastGroup = ''
  return (
    <nav className="sidebar" aria-label="Contents">
      {NAV.map((s) => {
        const isOpen = openSecs[s.id] ?? s.id === current
        const done = s.items.filter((i) => progress[i.path]).length
        const divider = s.group !== lastGroup && s.group !== 'learn'
        lastGroup = s.group
        return (
          <div key={s.id} className="nav-sec">
            {divider && <div className="nav-divider">{s.group === 'startup' ? 'Startup lens — kept separate' : 'Reference'}</div>}
            <button className={`nav-sec-head ${s.id === current ? 'current' : ''}`} onClick={() => setOpenSecs((o) => ({ ...o, [s.id]: !isOpen }))}>
              <span className="nav-caret">{isOpen ? '▾' : '▸'}</span>
              {s.num && <span className="nav-num">{s.num}</span>}
              <span className="nav-sec-title">{s.title}</span>
              {s.items.length > 1 && (
                <span className="nav-count">
                  {done}/{s.items.length}
                </span>
              )}
            </button>
            {isOpen && (
              <ul>
                {(() => {
                  let g = ''
                  return s.items.map((i) => {
                    const header = i.group && i.group !== g ? i.group : null
                    g = i.group ?? g
                    return (
                      <li key={i.path}>
                        {header && <div className="nav-group">{header}</div>}
                        <NavLink to={i.path} end onClick={onNavigate} className={({ isActive }) => (isActive ? 'active' : '')}>
                          <span className={`nav-dot ${progress[i.path] ? 'read' : ''}`} />
                          {i.title}
                        </NavLink>
                      </li>
                    )
                  })
                })()}
              </ul>
            )}
          </div>
        )
      })}
    </nav>
  )
}

function Toc() {
  const { pathname } = useLocation()
  const [heads, setHeads] = useState<{ id: string; text: string; level: number }[]>([])
  const [active, setActive] = useState('')
  useEffect(() => {
    const t = setTimeout(() => {
      const hs = Array.from(document.querySelectorAll('article.prose h2[id], article.prose h3[id]')) as HTMLElement[]
      setHeads(hs.map((h) => ({ id: h.id, text: h.textContent ?? '', level: h.tagName === 'H2' ? 2 : 3 })))
      const obs = new IntersectionObserver(
        (entries) => {
          const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          if (vis[0]) setActive(vis[0].target.id)
        },
        { rootMargin: '0px 0px -70% 0px' },
      )
      hs.forEach((h) => obs.observe(h))
      cleanup = () => obs.disconnect()
    }, 50)
    let cleanup = () => {}
    return () => {
      clearTimeout(t)
      cleanup()
    }
  }, [pathname])
  if (heads.length < 3) return <aside className="toc" />
  return (
    <aside className="toc">
      <div className="toc-title">On this page</div>
      <ul>
        {heads.map((h) => (
          <li key={h.id} className={`toc-l${h.level} ${active === h.id ? 'active' : ''}`}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const { pathname, hash } = useLocation()
  const [searchOpen, setSearchOpen] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
  const toggleTheme = useTheme()
  const cr = crumbs(pathname)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
      if (e.key === '/' && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  useEffect(() => {
    if (hash) setTimeout(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView(), 120)
    else window.scrollTo(0, 0)
  }, [pathname, hash])
  return (
    <div className={`app ${navOpen ? 'nav-open' : ''}`}>
      <header className="topbar">
        <button className="icon-btn nav-toggle" onClick={() => setNavOpen((o) => !o)} aria-label="Toggle navigation">
          ☰
        </button>
        <Link to="/" className="brand">
          <span className="brand-mark">TFM</span>
          <span className="brand-name">Treasury Field Manual</span>
        </Link>
        <button className="search-btn" onClick={() => setSearchOpen(true)}>
          <span>Search…</span>
          <kbd>⌘K</kbd>
        </button>
        <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle dark mode" title="Toggle dark mode">
          ◐
        </button>
      </header>
      <Sidebar onNavigate={() => setNavOpen(false)} />
      <main className="main">
        {cr.length > 0 && (
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Contents</Link>
            {cr.map((c, i) => (
              <span key={i}>
                <span className="crumb-sep">/</span>
                <Link to={c.path}>{c.title}</Link>
              </span>
            ))}
          </nav>
        )}
        {children}
      </main>
      <Toc />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
