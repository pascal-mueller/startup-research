// Usage: node scripts/shot.mjs <outdir> <route>[,<route>...] [--dark] [--width=1440]
import { chromium } from 'playwright-core'
const [out, routes, ...flags] = process.argv.slice(2)
const dark = flags.includes('--dark')
const width = Number((flags.find((f) => f.startsWith('--width=')) || '--width=1440').split('=')[1])
const full = flags.includes('--full')
const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' })
const page = await browser.newPage({ viewport: { width, height: 1000 }, colorScheme: dark ? 'dark' : 'light' })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
for (const r of routes.split(',')) {
  await page.goto(`http://localhost:5173/#${r}`)
  await page.waitForTimeout(700)
  const name = r.replace(/[^a-z0-9]+/gi, '_') || 'home'
  await page.screenshot({ path: `${out}/${name}${dark ? '_dark' : ''}_${width}.png`, fullPage: full })
  const missing = await page.$$eval('.term-missing, .cite-missing', (els) => els.map((e) => e.textContent + ' ' + (e.getAttribute('title') || '')))
  if (missing.length) console.log(r, 'MISSING:', [...new Set(missing)].join(' | '))
}
if (errors.length) console.log('ERRORS:', [...new Set(errors)].join('\n'))
await browser.close()
