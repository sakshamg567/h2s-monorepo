import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const StudentLogin = () => {
   const navigate = useNavigate()
   const [isLogin, setIsLogin] = useState(true)
   const [formData, setFormData] = useState({
      name: '',
      groupId: '',
      enrollmentNo: '',
      password: ''
   })

   const handleChange = (e) => {
      const { name, value } = e.target
      setFormData(prevData => ({
         ...prevData,
         [name]: value
      }))
   }

   const handleSubmit = (e) => {
      e.preventDefault()
      console.log('Form submitted:', formData)
      // For now, just navigate to the dashboard
      navigate('/student-dashboard')
   }

   return (
      <div>
         <h2 className="text-xl font-medium text-center mb-5">
            Student {isLogin ? 'Login' : 'Signup'}
         </h2>

         <form onSubmit={handleSubmit}>
            {!isLogin && (
               <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                     type="text"
                     name="name"
                     value={formData.name}
                     onChange={handleChange}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                     required={!isLogin}
                  />
               </div>
            )}

            <div className="mb-4">
               <label className="block text-sm font-medium text-gray-700 mb-1">Enrollment Number</label>
               <input
                  type="text"
                  name="enrollmentNo"
                  value={formData.enrollmentNo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
               />
            </div>

            {!isLogin && (
               <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group ID</label>
                  <input
                     type="text"
                     name="groupId"
                     value={formData.groupId}
                     onChange={handleChange}
                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                     required={!isLogin}
                  />
               </div>
            )}

            <div className="mb-6">
               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
               <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
               />
            </div>

            <button
               type="submit"
               className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
               {isLogin ? 'Login' : 'Sign Up'}
            </button>
         </form>

         <p className="mt-4 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
               className="text-blue-500 hover:underline"
               onClick={() => setIsLogin(!isLogin)}
            >
               {isLogin ? 'Sign Up' : 'Login'}
            </button>
         </p>
      </div>
   )
}

export default StudentLogin
