import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { SmartLink } from './SmartLink'

/** Renders Markdown strings from YAML content with the same link conventions as MDX. */
export function Md({ text, inline = false }: { text?: string; inline?: boolean }) {
  if (!text) return null
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      urlTransform={(u) => u}
      components={{
        a: ({ href, children }) => <SmartLink href={href}>{children}</SmartLink>,
        table: ({ children }) => (
          <div className="table-wrap">
            <table>{children}</table>
          </div>
        ),
      }}
      disallowedElements={inline ? ['p'] : undefined}
      unwrapDisallowed={inline}
    >
      {text}
    </ReactMarkdown>
  )
}
