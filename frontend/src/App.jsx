import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginScreen from './components/LoginScreen'
import TeacherDashboard from './components/dashboard/TeacherDashboard'
import StudentDashboard from './components/student/StudentDashboard'

function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/teacher-dashboard/*" element={<TeacherDashboard />} />
          <Route path="/student-dashboard/*" element={<StudentDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
