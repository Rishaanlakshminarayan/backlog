import { Route, Routes } from 'react-router-dom'
import { PageShell } from './components/layout/PageShell'
import { Home } from './pages/Home'
import { SubjectPage } from './pages/SubjectPage'
import { TopicPage } from './pages/TopicPage'
import { PlannerPage } from './pages/PlannerPage'

function App() {
  return (
    <PageShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/planner" element={<PlannerPage />} />
        <Route path="/subjects/:subjectId" element={<SubjectPage />} />
        <Route path="/subjects/:subjectId/:topicId" element={<TopicPage />} />
      </Routes>
    </PageShell>
  )
}

export default App
