import { useState, useRef } from 'react'

const TestSubmission = () => {
   const [file, setFile] = useState(null)
   const [preview, setPreview] = useState(null)
   const [uploadType, setUploadType] = useState('document') // 'document' or 'camera'
   const [selectedTest, setSelectedTest] = useState('')
   const [isSubmitting, setIsSubmitting] = useState(false)
   const fileInputRef = useRef(null)

   // Mock data - would come from API
   const availableTests = [
      { id: 'test1', name: 'Data Structures Mid Term - CS201' },
      { id: 'test2', name: 'Algorithms Quiz - CS301' },
   ]

   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0]
      if (selectedFile) {
         setFile(selectedFile)

         // Create preview for image files
         if (selectedFile.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = () => {
               setPreview(reader.result)
            }
            reader.readAsDataURL(selectedFile)
         } else if (selectedFile.type === 'application/pdf') {
            // For PDFs, just show an icon or text
            setPreview('pdf')
         } else {
            setPreview(null)
         }
      }
   }

   const openFileSelector = () => {
      if (fileInputRef.current) {
         fileInputRef.current.click()
      }
   }

   const startCamera = async () => {
      setUploadType('camera')
      try {
         const stream = await navigator.mediaDevices.getUserMedia({ video: true })

         // In a real app, you would display the camera feed and implement capturing
         console.log('Camera started:', stream)

         // For this example, we'll simulate taking a photo after 3 seconds
         setTimeout(() => {
            // Simulate capturing an image - in a real app this would use the canvas API
            const mockCapturedImage = 'https://via.placeholder.com/400x300?text=Captured+Answer+Sheet'
            setPreview(mockCapturedImage)
            setFile(new Blob(['mock image data'], { type: 'image/jpeg' }))
         }, 3000)

      } catch (err) {
         console.error('Error accessing camera:', err)
         alert('Could not access camera. Please check your permissions.')
         setUploadType('document')
      }
   }

   const handleSubmit = async (e) => {
      e.preventDefault()

      if (!selectedTest) {
         alert('Please select a test to submit for')
         return
      }

      if (!file) {
         alert('Please upload or capture your answer sheet')
         return
      }

      setIsSubmitting(true)

      try {
         // In a real app, this would be an API call to upload the file
         console.log('Submitting test answer:', {
            testId: selectedTest,
            fileName: file.name || 'captured-image.jpg',
            fileType: file.type,
            fileSize: file.size
         })

         // Simulate an API call with a timeout
         await new Promise(resolve => setTimeout(resolve, 2000))

         alert('Your answer has been submitted successfully!')

         // Reset form
         setSelectedTest('')
         setFile(null)
         setPreview(null)
         setUploadType('document')

      } catch (error) {
         console.error('Error submitting answer:', error)
         alert('Failed to submit your answer. Please try again.')
      } finally {
         setIsSubmitting(false)
      }
   }

   return (
      <div>
         <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Submit Test Answer</h2>
            <p className="mt-1 text-sm text-gray-600">
               Upload your completed answer sheet or capture it with your camera.
            </p>
         </div>

         <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <form onSubmit={handleSubmit}>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left column - Form fields */}
                  <div>
                     <div className="mb-6">
                        <label htmlFor="testId" className="block text-sm font-medium text-gray-700 mb-1">
                           Select Test <span className="text-red-500">*</span>
                        </label>
                        <select
                           id="testId"
                           value={selectedTest}
                           onChange={(e) => setSelectedTest(e.target.value)}
                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                           required
                        >
                           <option value="">Select a test</option>
                           {availableTests.map((test) => (
                              <option key={test.id} value={test.id}>
                                 {test.name}
                              </option>
                           ))}
                        </select>

                        <div className="mt-4">
                           <span className="block text-sm font-medium text-gray-700 mb-1">
                              Upload Method
                           </span>
                           <div className="mt-2 flex space-x-2">
                              <button
                                 type="button"
                                 onClick={() => setUploadType('document')}
                                 className={`px-4 py-2 text-sm font-medium rounded-md ${uploadType === 'document'
                                       ? 'bg-indigo-100 text-indigo-700'
                                       : 'bg-white text-gray-700 border border-gray-300'
                                    }`}
                              >
                                 <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                 </svg>
                                 Document
                              </button>
                              <button
                                 type="button"
                                 onClick={startCamera}
                                 className={`px-4 py-2 text-sm font-medium rounded-md ${uploadType === 'camera'
                                       ? 'bg-indigo-100 text-indigo-700'
                                       : 'bg-white text-gray-700 border border-gray-300'
                                    }`}
                              >
                                 <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                 </svg>
                                 Camera
                              </button>
                           </div>
                        </div>
                     </div>

                     <div className="border-t border-gray-200 pt-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Submission Guidelines</h3>
                        <div className="mt-2 text-sm text-gray-500">
                           <ul className="list-disc pl-5 space-y-1">
                              <li>Make sure your handwriting is clear and legible</li>
                              <li>Include your name and enrollment number on each page</li>
                              <li>Ensure all pages are properly oriented and readable</li>
                              <li>Check that all questions have been answered before submitting</li>
                              <li>Submit only once for each test</li>
                           </ul>
                        </div>
                     </div>
                  </div>

                  {/* Right column - File upload area */}
                  <div>
                     {/* Hidden file input */}
                     <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*,application/pdf"
                        className="hidden"
                     />

                     {/* Upload area */}
                     {uploadType === 'document' && !preview && (
                        <div
                           onClick={openFileSelector}
                           className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-indigo-500 transition-colors duration-200"
                        >
                           <div className="space-y-1 text-center">
                              <svg
                                 className="mx-auto h-12 w-12 text-gray-400"
                                 stroke="currentColor"
                                 fill="none"
                                 viewBox="0 0 48 48"
                              >
                                 <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                 />
                              </svg>
                              <div className="flex text-sm text-gray-600 justify-center">
                                 <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                    <span>Upload a file</span>
                                 </label>
                                 <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PDF or image up to 10MB</p>
                           </div>
                        </div>
                     )}

                     {uploadType === 'camera' && !preview && (
                        <div className="mt-1 border-2 border-gray-300 rounded-md p-6 text-center bg-gray-50">
                           <svg
                              className="mx-auto h-12 w-12 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                              />
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 strokeWidth="2"
                                 d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                           </svg>
                           <p className="mt-2 text-gray-600">Accessing camera...</p>
                           <p className="text-sm text-gray-500 mt-1">
                              Please allow camera access when prompted
                           </p>
                        </div>
                     )}

                     {/* Preview area */}
                     {preview && (
                        <div className="mt-1 border-2 border-gray-300 rounded-md p-2 relative">
                           {preview === 'pdf' ? (
                              <div className="flex items-center justify-center p-4 bg-gray-100">
                                 <svg className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                 </svg>
                                 <div className="ml-4">
                                    <p className="text-sm font-medium">{file?.name || 'PDF Document'}</p>
                                    <p className="text-sm text-gray-500">{file ? `${(file.size / 1024).toFixed(2)} KB` : ''}</p>
                                 </div>
                              </div>
                           ) : (
                              <img
                                 src={preview}
                                 alt="Answer sheet preview"
                                 className="mx-auto max-h-64 object-contain"
                              />
                           )}
                           <button
                              type="button"
                              onClick={() => {
                                 setFile(null)
                                 setPreview(null)
                              }}
                              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-100"
                           >
                              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                              <span className="sr-only">Remove</span>
                           </button>
                        </div>
                     )}

                     <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700">
                           Answer Sheet <span className="text-red-500">*</span>
                        </label>
                        <p className="mt-1 text-sm text-gray-500">
                           {file ? `Selected: ${file.name || 'Captured image'}` : 'No file selected'}
                        </p>
                     </div>

                     <div className="mt-6">
                        <button
                           type="submit"
                           disabled={isSubmitting || !file || !selectedTest}
                           className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isSubmitting || !file || !selectedTest
                                 ? 'bg-indigo-300 cursor-not-allowed'
                                 : 'bg-indigo-600 hover:bg-indigo-700'
                              }`}
                        >
                           {isSubmitting ? 'Submitting...' : 'Submit Answer'}
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   )
}

export default TestSubmission
