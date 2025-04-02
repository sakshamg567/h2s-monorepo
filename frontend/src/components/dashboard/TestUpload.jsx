import { useState, useRef } from 'react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select'

const TestUpload = () => {
   const [testDetails, setTestDetails] = useState({
      title: '',
      description: '',
      class: '',
      date: '',
      time: '',
      duration: 60
   })
   const [file, setFile] = useState(null)
   const [preview, setPreview] = useState(null)
   const [uploadType, setUploadType] = useState('document') // 'document' or 'camera'
   const fileInputRef = useRef(null)
   const [isSubmitting, setIsSubmitting] = useState(false)

   // Mock class list - would come from API
   const classes = [
      { id: 'class1', name: 'CS101 - Introduction to Programming' },
      { id: 'class2', name: 'CS201 - Data Structures' },
      { id: 'class3', name: 'CS301 - Algorithms' },
   ]

   const handleInputChange = (e) => {
      const { name, value } = e.target
      setTestDetails(prev => ({
         ...prev,
         [name]: value
      }))
   }

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
            const mockCapturedImage = 'https://via.placeholder.com/400x300?text=Captured+Test+Paper'
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

      if (!file) {
         alert('Please upload a test paper file')
         return
      }

      if (!testDetails.title || !testDetails.class || !testDetails.date) {
         alert('Please fill in all required fields')
         return
      }

      setIsSubmitting(true)

      try {
         // In a real app, this would be an API call to upload the file
         console.log('Uploading test:', { testDetails, fileName: file.name, fileType: file.type, fileSize: file.size })

         // Simulate an API call with a timeout
         await new Promise(resolve => setTimeout(resolve, 2000))

         alert('Test paper uploaded successfully!')

         // Reset form
         setTestDetails({
            title: '',
            description: '',
            class: '',
            date: '',
            time: '',
            duration: 60
         })
         setFile(null)
         setPreview(null)

      } catch (error) {
         console.error('Error uploading test:', error)
         alert('Failed to upload test. Please try again.')
      } finally {
         setIsSubmitting(false)
      }
   }

   return (
      <div>
         <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Upload Test Paper</h2>
            <p className="mt-1 text-sm text-gray-600">
               Create a new test by uploading a test paper file or capturing an image.
            </p>
         </div>

         <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
            <form onSubmit={handleSubmit}>
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left column - Form fields */}
                  <div>
                     <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                           Test Title <span className="text-red-500">*</span>
                        </label>
                        <Input type="text" placeholder="Mid Sem 2" className="focus:ring-black focus:border-black " required/>
                     </div>

                     <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                           Description
                        </label>
                        <Textarea className="focus:ring-black focus:border-black"/>
                     </div>

                     <div className="mb-4">
                        <label htmlFor="class" className="block text-sm font-medium text-gray-700">
                           Select Class <span className="text-red-500">*</span>
                        </label>
                        <Select className="focus:ring-black focus:border-black" req>
                           <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Select a class"/>
                           </SelectTrigger>
                           <SelectContent className="bg-white">
                              <SelectGroup>
                                 <SelectLabel>class</SelectLabel>
                                 {classes.map(classItem => (
                                 <SelectItem value={classItem.id}>{classItem.name}</SelectItem>
                                 ))}                              
                              </SelectGroup>
                           </SelectContent>
                        </Select>
                     </div>

                     <div className="grid grid-cols-2 gap-4">
                        <div className="mb-4">
                           <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                              Test Date <span className="text-red-500">*</span>
                           </label>
                           <input
                              type="date"
                              name="date"
                              id="date"
                              value={testDetails.date}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              required
                           />
                        </div>

                        <div className="mb-4">
                           <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                              Start Time
                           </label>
                           <input
                              type="time"
                              name="time"
                              id="time"
                              value={testDetails.time}
                              onChange={handleInputChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                           />
                        </div>
                     </div>

                     <div className="mb-4">
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                           Duration (minutes) <span className="text-red-500">*</span>
                        </label>
                        <Input
                           type="number"
                           name="duration"
                           id="duration"
                           value={testDetails.duration}
                           onChange={handleInputChange}
                           min="1"
                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
                           required
                        />
                     </div>
                  </div>

                  {/* Right column - File upload area */}
                  <div>
                     <div className="mb-4">
                        <span className="block text-sm font-medium text-gray-700">
                           Upload Method
                        </span>
                        <div className="mt-2 flex space-x-2">
                           <button
                              type="button"
                              onClick={() => setUploadType('document')}
                              className={`px-4 py-2 text-sm font-medium rounded-md ${uploadType === 'document'
                                    ? 'bg-blue-100 text-blue-700'
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
                                    ? 'bg-blue-100 text-blue-700'
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
                           className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
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
                              <div className="flex text-sm text-gray-600">
                                 <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                                 >
                                    <span>Upload a file</span>
                                 </label>
                                 <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">PDF or Image up to 10MB</p>
                           </div>
                        </div>
                     )}

                     {uploadType === 'camera' && !preview && (
                        <div className="mt-2 border-2 border-gray-300 rounded-md p-6 text-center bg-gray-50">
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
                        <div className="mt-2 border-2 border-gray-300 rounded-md p-2 relative">
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
                                 alt="Test paper preview"
                                 className="mx-auto max-h-64 object-contain"
                              />
                           )}
                           <button
                              type="button"
                              onClick={() => {
                                 setFile(null)
                                 setPreview(null)
                              }}
                              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm"
                           >
                              <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                           </button>
                        </div>
                     )}

                     <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700">
                           Test Paper <span className="text-red-500">*</span>
                        </label>
                        <p className="mt-1 text-sm text-gray-500">
                           {file ? `Selected: ${file.name}` : 'No file selected'}
                        </p>
                     </div>

                     <div className="mt-6">
                        <button
                           type="submit"
                           disabled={isSubmitting || !file}
                           className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting || !file
                                 ? 'bg-blue-300 cursor-not-allowed'
                                 : 'bg-blue-600 hover:bg-blue-700'
                              }`}
                        >
                           {isSubmitting ? 'Uploading...' : 'Upload Test Paper'}
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   )
}

export default TestUpload