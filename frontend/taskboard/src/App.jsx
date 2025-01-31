import ProjectsPage from './pages/ProjectsPage'
import TaskPage from './pages/TaskPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProjectsPage />} />
        <Route path="/project/:projectId" element={<TaskPage />} />
      </Routes>
    </Router>
  )
}

export default App
