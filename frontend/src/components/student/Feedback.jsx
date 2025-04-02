// import { useState } from 'react'

// const Feedback = () => {
//   const [selectedTest, setSelectedTest] = useState('test1')
  
//   // Mock data - would come from API
//   const testFeedback = {
//     test1: {
//       title: "Introduction to Programming Final",
//       subject: "CS101",
//       date: "2023-08-25",
//       score: 85,
//       totalScore: 100,
//       feedback: "Good work overall. Your understanding of loops and functions is solid. Need improvement in object-oriented concepts.",
//       questions: [
//         { number: 1, score: 8, maxScore: 10, comment: "Good solution but could be more efficient." },
//         { number: 2, score: 10, maxScore: 10, comment: "Perfect answer!" },
//         { number: 3, score: 7, maxScore: 10, comment: "Correct approach but implementation has errors." },
//         { number: 4, score: 5, maxScore: 10, comment: "Partially correct. Review class inheritance." },
//         { number: 5, score: 9, maxScore: 10, comment: "Well explained with good examples." }
//       ]
//     }
//   }

//   const feedback = testFeedback[selectedTest]

//   // Calculate score percentage
//   const scorePercentage = feedback ? Math.round((feedback.score / feedback.totalScore) * 100) : 0

//   // Determine score color
//   const getScoreColor = (percentage) => {
//     if (percentage >= 80) return 'text-green-600'
//     if (percentage >= 60) return 'text-yellow-600'
//     return 'text-red-600'
//   }

//   return (
//     <div>
//       <div className="mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Test Feedback</h2>
//         <p className="mt-1 text-sm text-gray-600">
//           View detailed feedback and results for your submitted tests.
//         </p>
//       </div>

//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         {feedback ? (
//           <>
//             <div className="px-4 py-5 sm:px-6">
//               <div className="flex flex-wrap items-center justify-between">
//                 <div>
//                   <h3 className="text-lg leading-6 font-medium text-gray-900">
//                     {feedback.title}
//                   </h3>
//                   <p className="mt-1 max-w-2xl text-sm text-gray-500">
//                     {feedback.subject} • Submitted on {feedback.date}
//                   </p>
//                 </div>
//                 <div className="mt-2 sm:mt-0 flex flex-col items-end">
//                   <div className={`text-3xl font-bold ${getScoreColor(scorePercentage)}`}>
//                     {feedback.score}/{feedback.totalScore}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {scorePercentage}% score
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
//               <div className="text-sm text-gray-900">
//                 <h4 className="font-medium text-gray-800 mb-2">Overall Feedback:</h4>
//                 <p className="text-gray-700 whitespace-pre-line">{feedback.feedback}</p>
//               </div>
//             </div>

//             <div className="border-t border-gray-200">
//               <h4 className="px-4 py-3 bg-gray-50 text-sm font-medium text-gray-800">Question-wise Feedback</h4>
//               <div className="divide-y divide-gray-200">
//                 {feedback.questions.map((question) => (
//                   <div key={question.number} className="px-4 py-4 sm:px-6">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h5 className="text-sm font-medium text-gray-900">Question {question.number}</h5>
//                         <p className="mt-1 text-sm text-gray-500">{question.comment}</p>
//                       </div>
//                       <div className={`text-sm font-medium ${getScoreColor((question.score / question.maxScore) * 100)}`}>
//                         {question.score}/{question.maxScore}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="px-4 py-5 sm:p-6 text-center">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5