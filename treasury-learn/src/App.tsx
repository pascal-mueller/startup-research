import { HashRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './components/Home'
import { MdxPage } from './components/MdxPage'
import { WorkflowPage } from './components/WorkflowPage'
import { TermPage } from './components/Glossary'

function AnyPage() {
  const { pathname } = useLocation()
  return <MdxPage key={pathname} path={pathname.replace(/\/$/, '')} />
}

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workflows/:id" element={<WorkflowPage />} />
          <Route path="/glossary/:id" element={<TermPage />} />
          <Route path="*" element={<AnyPage />} />
        </Routes>
      </Layout>
    </HashRouter>
  )
}
