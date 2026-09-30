import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import { load as yamlLoad } from 'js-yaml'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'

// Turns `import x from './file.yaml'` into a JSON module.
function yamlPlugin(): Plugin {
  return {
    name: 'yaml-json',
    transform(code, id) {
      if (!/\.ya?ml$/.test(id)) return null
      const data = yamlLoad(code, { filename: id })
      return { code: `export default ${JSON.stringify(data)}`, map: null }
    },
  }
}

// Exposes raw MDX source of all pages (for search, citation numbering, glossary backlinks).
// The MDX plugin would otherwise compile `?raw` imports too.
function mdxRawPlugin(): Plugin {
  const root = resolve(import.meta.dirname, 'content/pages')
  const walk = (d: string): string[] =>
    readdirSync(d).flatMap((f) => {
      const p = join(d, f)
      return statSync(p).isDirectory() ? walk(p) : p.endsWith('.mdx') ? [p] : []
    })
  return {
    name: 'mdx-raw',
    resolveId: (id) => (id === 'virtual:mdx-raw' ? '\0virtual:mdx-raw' : null),
    load(id) {
      if (id !== '\0virtual:mdx-raw') return null
      const out: Record<string, string> = {}
      for (const f of walk(root)) {
        this.addWatchFile(f)
        out['/content/pages/' + relative(root, f)] = readFileSync(f, 'utf8')
      }
      return `export default ${JSON.stringify(out)}`
    },
    handleHotUpdate({ file, server }) {
      if (file.startsWith(root)) {
        const m = server.moduleGraph.getModuleById('\0virtual:mdx-raw')
        if (m) server.moduleGraph.invalidateModule(m)
      }
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [
    yamlPlugin(),
    mdxRawPlugin(),
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: 'frontmatter' }]], providerImportSource: '@mdx-js/react' }) },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
})
