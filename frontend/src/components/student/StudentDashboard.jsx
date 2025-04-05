import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import StudentSidebar from './StudentSidebar'
import TestsOverview from './TestsOverview'
import TestSubmission from './TestSubmission'
import Feedback from './Feedback'

const StudentDashboard = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false)

   // Mock student data - would come from authentication context or API
   const student = {
      name: 'Alex Johnson',
      enrollmentNo: 'EN12345',
      group: 'Computer Science B'
   }

   return (
      <div className="flex h-screen overflow-hidden bg-gray-50">
         {/* Sidebar */}
         <StudentSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                     Hello, {student.name}
                  </h1>

                  {/* Profile dropdown */}
                  <div className="ml-3 relative">
                     <div>
                        <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                           <span className="sr-only">Open user menu</span>
                           <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                              {student.name.charAt(0)}
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
                     <Route path="/" element={<TestsOverview />} />
                     <Route path="/tests" element={<TestsOverview />} />
                     <Route path="/submit" element={<TestSubmission />} />
                     <Route path="/feedback" element={<Feedback />} />
                  </Routes>
               </div>
            </main>
         </div>
      </div>
   )
}

export default StudentDashboard
