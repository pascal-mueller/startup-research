import { Link } from 'react-router-dom'
export function NotFound({ what = 'page' }: { what?: string }) {
  return (
    <article className="prose">
      <h1>Not written yet</h1>
      <p>
        The {what} does not exist (yet). <Link to="/">Back to the contents</Link>.
      </p>
    </article>
  )
}
