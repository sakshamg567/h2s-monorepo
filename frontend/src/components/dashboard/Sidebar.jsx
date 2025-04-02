import { NavLink, useNavigate } from 'react-router-dom'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
   const navigate = useNavigate()

   const navigation = [
      { name: 'Classes', path: '/teacher-dashboard/classes', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
      { name: 'Ongoing Tests', path: '/teacher-dashboard/ongoing-tests', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
      { name: 'Upload Test', path: '/teacher-dashboard/upload-test', icon: 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12' },
      { name: 'Submissions', path: '/teacher-dashboard/submissions', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
   ]

   const handleLogout = () => {
      // Handle logout logic
      navigate('/')
   }

   return (
      <>
         {/* Mobile sidebar overlay */}
         {sidebarOpen && (
            <div
               className="fixed inset-0 z-40 md:hidden bg-gray-600 bg-opacity-75"
               onClick={() => setSidebarOpen(false)}
            />
         )}

         {/* Mobile sidebar */}
         <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform ease-in-out duration-300 md:translate-x-0 md:static md:h-full ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
               <div className="text-xl font-bold text-blue-600">H2S Dashboard</div>
               <button
                  className="md:hidden text-gray-500"
                  onClick={() => setSidebarOpen(false)}
               >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
               </button>
            </div>

            <div className="flex flex-col h-full justify-between py-4">
               <nav className="flex-1 px-2 space-y-1">
                  {navigation.map((item) => (
                     <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) => `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${isActive
                              ? 'bg-blue-100 text-blue-600'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                           }`}
                     >
                        <svg
                           className="mr-3 h-6 w-6"
                           fill="none"
                           stroke="currentColor"
                           viewBox="0 0 24 24"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d={item.icon}
                           />
                        </svg>
                        {item.name}
                     </NavLink>
                  ))}
               </nav>

               <div className="px-2">
                  <button
                     onClick={handleLogout}
                     className="group flex items-center w-full px-2 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900"
                  >
                     <svg
                        className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth="2"
                           d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                     </svg>
                     Logout
                  </button>
               </div>
            </div>
         </div>
      </>
   )
}

export default Sidebar
