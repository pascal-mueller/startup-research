import { MDXProvider } from '@mdx-js/react'
import type { ComponentProps } from 'react'
import { Link } from 'react-router-dom'
import { citeIdsIn, pageByPath } from '../lib/content'
import { CiteContext, Cite, References } from './Cite'
import { SmartLink } from './SmartLink'
import { Term } from './Term'
import { PageFooter } from './PageFooter'
import { NotFound } from './NotFound'
import * as Blocks from './Blocks'
import { TreasuryMap } from './TreasuryMap'
import { GlossaryIndex } from './Glossary'
import * as Data from './DataViews'
import * as Diagrams from './Diagrams'
import * as Org from './OrgViews'
import * as Lens from './LensViews'
import * as Comp from './CompetitorViews'
import * as Day from './DayViews'

function slugify(children: unknown): string {
  const text = Array.isArray(children) ? children.join('') : String(children ?? '')
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const mdxComponents = {
  a: (p: ComponentProps<'a'>) => <SmartLink href={p.href}>{p.children}</SmartLink>,
  h2: (p: ComponentProps<'h2'>) => <h2 id={slugify(p.children)}>{p.children}</h2>,
  h3: (p: ComponentProps<'h3'>) => <h3 id={slugify(p.children)}>{p.children}</h3>,
  table: (p: ComponentProps<'table'>) => (
    <div className="table-wrap">
      <table>{p.children}</table>
    </div>
  ),
  T: Term,
  Term,
  Cite,
  TreasuryMap,
  GlossaryIndex,
  ...Blocks,
  ...Data,
  ...Diagrams,
  ...Org,
  ...Lens,
  ...Comp,
  ...Day,
}

export function MdxPage({ path }: { path: string }) {
  const page = pageByPath.get(path)
  if (!page) return <NotFound />
  const { Component, meta } = page
  const cites = citeIdsIn(page.raw)
  return (
    <CiteContext.Provider value={cites}>
      <article className="prose">
        <h1>{meta.title}</h1>
        {meta.summary && <p className="lede">{meta.summary}</p>}
        <MDXProvider components={mdxComponents as never}>
          <Component />
        </MDXProvider>
        {meta.related?.length ? (
          <section className="related">
            <h2 id="related">Related</h2>
            <div className="chips">
              {meta.related.map((r) => (
                <Link key={r} to={r} className="chip">
                  {pageByPath.get(r)?.meta.nav ?? pageByPath.get(r)?.meta.title ?? r}
                </Link>
              ))}
            </div>
          </section>
        ) : null}
        <References ids={cites} />
        <PageFooter path={path} />
      </article>
    </CiteContext.Provider>
  )
}
