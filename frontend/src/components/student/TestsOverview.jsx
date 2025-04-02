import { Link } from 'react-router-dom'

const TestsOverview = () => {
   // Mock data - would come from API
   const upcomingTests = [
      {
         id: 1,
         title: "Data Structures Mid Term",
         subject: "CS201",
         date: "2023-09-15",
         time: "10:00 AM",
         duration: "60 min"
      },
      {
         id: 2,
         title: "Algorithms Quiz",
         subject: "CS301",
         date: "2023-09-18",
         time: "2:00 PM",
         duration: "30 min"
      }
   ]

   const completedTests = [
      {
         id: 3,
         title: "Introduction to Programming Final",
         subject: "CS101",
         date: "2023-08-25",
         score: "85/100",
         feedback: true
      }
   ]

   return (
      <div>
         <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Available & Upcoming Tests</h2>

            {upcomingTests.length === 0 ? (
               <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming tests</h3>
                  <p className="mt-1 text-sm text-gray-500">
                     You don't have any scheduled tests at the moment.
                  </p>
               </div>
            ) : (
               <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <ul className="divide-y divide-gray-200">
                     {upcomingTests.map((test) => (
                        <li key={test.id} className="p-4 sm:px-6">
                           <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                 <span className="text-sm font-medium text-blue-600">{test.subject}</span>
                                 <h3 className="text-lg font-medium text-gray-900">{test.title}</h3>
                                 <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>{test.date} at {test.time} • {test.duration}</span>
                                 </div>
                              </div>
                              <div className="ml-5 flex-shrink-0">
                                 <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                    Take Test
                                 </button>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            )}
         </div>

         <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Completed Tests</h2>

            {completedTests.length === 0 ? (
               <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No completed tests</h3>
                  <p className="mt-1 text-sm text-gray-500">
                     Your completed tests will appear here.
                  </p>
               </div>
            ) : (
               <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <ul className="divide-y divide-gray-200">
                     {completedTests.map((test) => (
                        <li key={test.id} className="p-4 sm:px-6">
                           <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                 <span className="text-sm font-medium text-blue-600">{test.subject}</span>
                                 <h3 className="text-lg font-medium text-gray-900">{test.title}</h3>
                                 <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Submitted on {test.date} • Score: {test.score}</span>
                                 </div>
                              </div>
                              <div className="ml-5 flex-shrink-0">
                                 {test.feedback ? (
                                    <Link to="/student-dashboard/feedback" className="text-sm text-blue-600 hover:text-blue-500">
                                       View Feedback
                                    </Link>
                                 ) : (
                                    <span className="text-sm text-gray-500">No feedback yet</span>
                                 )}
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            )}
         </div>
      </div>
   )
}

export default TestsOverview
