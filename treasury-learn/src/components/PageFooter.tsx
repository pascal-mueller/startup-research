import { Link } from 'react-router-dom'
import { neighbours } from '../lib/nav'
import { setRead, useProgress } from '../lib/progress'

export function PageFooter({ path }: { path: string }) {
  const progress = useProgress()
  const read = !!progress[path]
  const { prev, next } = neighbours(path)
  return (
    <footer className="page-footer">
      <label className="read-toggle">
        <input type="checkbox" checked={read} onChange={(e) => setRead(path, e.target.checked)} />
        {read ? 'Marked as read' : 'Mark as read'}
      </label>
      <nav className="prev-next">
        {prev ? (
          <Link to={prev.path} className="pn pn-prev">
            <span className="pn-dir">← Previous</span>
            <span>{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link to={next.path} className="pn pn-next">
            <span className="pn-dir">Next →</span>
            <span>{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </footer>
  )
}
