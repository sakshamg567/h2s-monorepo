import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import ClassesSection from './ClassesSection'
import OngoingTests from './OngoingTests'
import TestUpload from './TestUpload'
// import Submissions from './Submissions'

const TeacherDashboard = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false)
   const navigate = useNavigate()

   // Mock teacher data - would come from authentication context or API
   const teacher = {
      name: 'Dr. John Smith',
      email: 'john.smith@example.edu',
      department: 'Computer Science'
   }

   return (
      <div className="flex h-screen overflow-hidden bg-gray-50">
         {/* Sidebar */}
         <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

         {/* Main Content Area */}
         <div className="flex flex-col flex-1 overflow-hidden">
            {/* Header */}
            <header className="bg-white shadow-sm z-10">
               <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                  {/* Mobile menu button */}
                  <button
                     className="md:hidden text-gray-500 focus:outline-none"
                     onClick={() => setSidebarOpen(true)}
                  >
                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                     </svg>
                  </button>

                  {/* Greeting */}
                  <h1 className="text-xl font-semibold text-gray-800">
                     Hello, {teacher.name}
                  </h1>

                  {/* Profile dropdown */}
                  <div className="ml-3 relative">
                     <div>
                        <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                           <span className="sr-only">Open user menu</span>
                           <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                              {teacher.name.charAt(0)}
                           </div>
                        </button>
                     </div>
                  </div>
               </div>
            </header>

            {/* Main content */}
            <main className="flex-1 overflow-auto py-6">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <Routes>
                     <Route path="/" element={<ClassesSection />} />
                     <Route path="/classes" element={<ClassesSection />} />
                     <Route path="/ongoing-tests" element={<OngoingTests />} />
                     <Route path="/upload-test" element={<TestUpload />} />
                     {/* <Route path="/submissions" element={<Submissions />} /> */}
                  </Routes>
               </div>
            </main>
         </div>
      </div>
   )
}

export default TeacherDashboard
