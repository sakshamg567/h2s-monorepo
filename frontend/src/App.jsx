import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginScreen from './components/LoginScreen'
import TeacherDashboard from './components/dashboard/TeacherDashboard'
import StudentDashboard from './components/student/StudentDashboard'
import Landing from './pages/Landing'
import TestSubmission from './components/student/TestSubmission'
import AnswerSheetPage from './pages/AnswerSheetPage'

function App() {
  return (
    <Router>
      <div className="bg-white min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/login' element={<LoginScreen/>}/>
          <Route path="/teacher-dashboard/*" element={<TeacherDashboard />} />
          <Route path="/student-dashboard/*" element={<StudentDashboard />} />
          <Route path='/feedback/:subject' element={<AnswerSheetPage />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
