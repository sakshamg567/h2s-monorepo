// import { useState } from 'react'

// const Submissions = () => {
//   const [filter, setFilter] = useState('all') // 'all', 'graded', 'ungraded'
  
//   // Mock data - would come from API
//   const submissions = []

//   return (
//     <div>
//       <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
//         <h2 className="text-2xl font-bold text-gray-800">Test Submissions</h2>
//         <div className="mt-3 sm:mt-0 flex">
//           <div className="relative inline-block text-left">
//             <select
//               className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//             >
//               <option value="all">All Submissions</option>
//               <option value="graded">Graded</option>
//               <option value="ungraded">Ungraded</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {submissions.length === 0 ? (
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg p-10 text-center">
//           <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
//           </svg>
//           <h3 className="mt-2 text-lg font-medium text-gray-900">No submissions yet</h3>
//           <p className="mt-1 text-sm text-gray-500">
//             Student submissions will appear here once tests are taken.
//           </p>
//         </div>
//       ) : (
//         <div className="flex flex-col">
//           <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
//             <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
//               <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Student
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Test
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                         Submitted
//                       </th>
//                       <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        