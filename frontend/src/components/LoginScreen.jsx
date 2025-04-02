import { useState } from 'react'
import TeacherLogin from './TeacherLogin'
import StudentLogin from './StudentLogin'

const LoginScreen = () => {
   const [activeTab, setActiveTab] = useState('teacher')

   return (
      <div className="flex items-center justify-center h-full">
         <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-semibold text-center mb-6">Welcome</h1>

            {/* Tab Selection */}
            <div className="flex mb-6">
               <button
                  className={`flex-1 py-2 ${activeTab === 'teacher' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('teacher')}
               >
                  Teacher
               </button>
               <button
                  className={`flex-1 py-2 ${activeTab === 'student' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                  onClick={() => setActiveTab('student')}
               >
                  Student
               </button>
            </div>

            {/* Login Components */}
            {activeTab === 'teacher' ? <TeacherLogin /> : <StudentLogin />}
         </div>
      </div>
   )
}

export default LoginScreen
