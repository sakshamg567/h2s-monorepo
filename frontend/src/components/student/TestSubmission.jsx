import axios from 'axios';
import { useState, useRef, useEffect, useCallback } from 'react'; // Import useCallback

const TestSubmission = () => {
   const [file, setFile] = useState(null);
   const [preview, setPreview] = useState(null); // Can be data URL (image/pdf icon), or null
   const [uploadType, setUploadType] = useState('document'); // 'document' or 'camera'
   const [selectedTest, setSelectedTest] = useState('');
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [tests, setTests] = useState([]);
   const [loading, setLoading] = useState(true);
   const [isCameraActive, setIsCameraActive] = useState(false); // Track camera state
   const [stream, setStream] = useState(null); // Store the MediaStream

   const fileInputRef = useRef(null);
   const videoRef = useRef(null); // Ref for the video element
   const canvasRef = useRef(null); // Ref for the canvas element (for capturing)

   // --- Fetch Tests ---
   const fetchTests = useCallback(async () => { // useCallback to prevent re-creation
      setLoading(true);
      setTests([
         { id: 'loading-1', title: 'Loading...', subject: 'Loading...' },
      ]);
      try {
         const res = await axios.get('/api/test/available');
         setTests(res.data);
      } catch (error) {
         console.error('Failed to fetch tests:', error);
         setTests([]);
      } finally {
         setLoading(false);
      }
   }, []); // No dependencies, runs once on mount

   useEffect(() => {
      fetchTests();
   }, [fetchTests]); // Depend on the stable fetchTests function

   // --- Camera Cleanup ---
   const stopCameraStream = useCallback(() => {
      if (stream) {
         console.log('Stopping camera stream...');
         stream.getTracks().forEach((track) => track.stop());
         setStream(null);
         setIsCameraActive(false);
         // Reset video srcObject if videoRef is still valid
         if (videoRef.current) {
            videoRef.current.srcObject = null;
         }
      }
   }, [stream]); // Dependency: stream state

   // Cleanup effect: Stop camera when component unmounts or when switching away from camera
   useEffect(() => {
      // Return the cleanup function
      return () => {
         stopCameraStream();
      };
   }, [stopCameraStream]); // Depend on the stable stopCameraStream function

   // --- Handlers ---
   const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
         stopCameraStream(); // Stop camera if it was active
         setUploadType('document'); // Ensure type is document
         setFile(selectedFile);

         if (selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => setPreview(reader.result);
            reader.readAsDataURL(selectedFile);
         } else if (selectedFile.type === 'application/pdf') {
            setPreview('pdf');
         } else {
            setPreview(null); // Handle other unsupported types
         }
      }
   };

   const openFileSelector = () => {
      stopCameraStream(); // Stop camera if switching to file upload
      setUploadType('document');
      if (fileInputRef.current) {
         fileInputRef.current.click();
      }
   };

   const handleSwitchUploadType = (type) => {
      if (type === 'document') {
         stopCameraStream();
         setUploadType('document');
         // Optionally clear preview/file if switching away from camera capture?
         // setPreview(null);
         // setFile(null);
      } else if (type === 'camera') {
         setUploadType('camera');
         startCamera(); // Attempt to start camera immediately
      }
   };

   const startCamera = async () => {
      // If camera is already active, don't restart
      if (isCameraActive || stream) {
         console.log('Camera already active or stream exists.');
         return;
      }
      // Reset any previous file/preview from camera
      setFile(null);
      setPreview(null);
      setIsCameraActive(true); // Indicate attempt to start

      try {
         const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }, // Prioritize rear camera
            audio: false,
         });
         setStream(mediaStream); // Store the stream
         if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            // Add event listener to ensure video is playing before confirming active state
            // Though `autoplay` usually handles this, this is more robust
            videoRef.current.onloadedmetadata = () => {
               console.log("Camera stream loaded.");
               // setIsCameraActive(true); // Already set above
            };
         } else {
            // If videoRef isn't ready yet, attempt cleanup
            console.warn("Video ref not available immediately after getUserMedia.");
            mediaStream.getTracks().forEach(track => track.stop());
            setIsCameraActive(false); // Failed to attach
            setStream(null);
            alert('Could not initialize camera view. Please try again.');
         }
      } catch (err) {
         console.error('Error accessing camera:', err);
         alert(
            `Could not access camera. Please check permissions. Error: ${err.name}`
         );
         setIsCameraActive(false);
         setStream(null);
         setUploadType('document'); // Revert to document upload on error
      }
   };

   const captureImage = () => {
      if (!videoRef.current || !canvasRef.current || !stream) {
         console.error('Camera or canvas not ready for capture.');
         return;
      }

      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Set canvas dimensions to match video stream
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the current video frame onto the canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the image data URL for preview
      const dataUrl = canvas.toDataURL('image/jpeg'); // Or 'image/png'
      setPreview(dataUrl);

      // Get the image as a Blob to create a File object for upload
      canvas.toBlob((blob) => {
         if (blob) {
            const capturedFile = new File([blob], `capture-${Date.now()}.jpg`, {
               type: 'image/jpeg',
            });
            setFile(capturedFile);
            console.log('Image captured:', capturedFile);

            // Stop the camera stream after capture
            stopCameraStream();
         } else {
            console.error("Failed to create blob from canvas.");
            alert("Failed to capture image. Please try again.");
            // Optionally clear preview if blob fails
            setPreview(null);
         }
      }, 'image/jpeg', 0.9); // mimeType, qualityArgument (for JPEG)
   };

   const clearPreviewAndFile = () => {
      setFile(null);
      setPreview(null);
      // If the user removed a *captured* image, restart the camera?
      if (uploadType === 'camera' && !stream) {
         startCamera();
      }
      // If removing a file upload, ensure file input value is cleared
      if (fileInputRef.current) {
         fileInputRef.current.value = ''; // Allows re-uploading the same file
      }
   };


   const handleSubmit = async (e) => {
      e.preventDefault();

      // Find the full test object based on selectedTest (which is the ID)
      const selectedTestObject = tests.find(test => test.id == selectedTest);

      if (!selectedTestObject) {
         alert('Please select a valid test to submit for.');
         return;
      }

      if (!file) {
         alert('Please upload or capture your answer sheet.');
         return;
      }

      setIsSubmitting(true);
      stopCameraStream(); // Ensure camera is off before submitting

      try {
         const formData = new FormData();
         formData.append('title', selectedTestObject.title); // Optional: send title/subject if needed
         formData.append('subject', selectedTestObject.subject); // Optional: send title/subject if needed
         formData.append('file', file); 

         console.log('Submitting test answer with FormData:', {
            title: selectedTestObject.title,
            subject: selectedTestObject.subject,
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
         });

         const response = await axios.post('/api/answer/submit', formData, {
            headers: {
               'Content-Type': 'multipart/form-data', // Important for file uploads
            },
         });

         console.log('Submission response:', response.data); // Log server response
         alert('Your answer has been submitted successfully!');

         // Reset form
         setSelectedTest('');
         setFile(null);
         setPreview(null);
         setUploadType('document');
         if (fileInputRef.current) {
            fileInputRef.current.value = ''; // Clear file input
         }

      } catch (error) {
         console.error('Error submitting answer:', error);
         // Log more detailed error if possible (e.g., from response)
         let errorMessage = 'Failed to submit your answer. Please try again.';
         if (error.response) {
            console.error("Error data:", error.response.data);
            console.error("Error status:", error.response.status);
            errorMessage += ` (Server error: ${error.response.status})`;
         } else if (error.request) {
            // The request was made but no response was received
            console.error("Error request:", error.request);
            errorMessage += ' (No response from server)';
         } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error message:', error.message);
         }
         alert(errorMessage);
      } finally {
         setIsSubmitting(false);
      }
   };

   // --- Render ---
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
                  {/* --- Left column - Form fields --- */}
                  <div>
                     <div className="mb-6">
                        <label htmlFor="testId" className="block text-sm font-medium text-gray-700 mb-1">
                           Select Test <span className="text-red-500">*</span>
                        </label>
                        <select
                           id="testId"
                           value={selectedTest}
                           onChange={(e) => setSelectedTest(e.target.value)}
                           className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md disabled:bg-gray-100"
                           required
                           disabled={loading || isSubmitting} // Disable while loading tests or submitting
                        >
                           <option value="">{loading ? 'Loading tests...' : 'Select a test'}</option>
                           {!loading && tests.length === 0 && (
                              <option value="" disabled>No available tests found</option>
                           )}
                           {tests.map((test) => (
                                 <option key={test.id} value={test.id}>
                                    {test.subject} - {test.title}
                                 </option>
                              ))}
                        </select>

                        {/* Upload Method Buttons */}
                        <div className="mt-4">
                           <span className="block text-sm font-medium text-gray-700 mb-1">
                              Upload Method
                           </span>
                           <div className="mt-2 flex space-x-2">
                              <button
                                 type="button"
                                 onClick={() => handleSwitchUploadType('document')}
                                 disabled={isSubmitting}
                                 className={`px-4 py-2 text-sm font-medium rounded-md flex items-center justify-center ${uploadType === 'document'
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                 <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                 Document
                              </button>
                              <button
                                 type="button"
                                 onClick={() => handleSwitchUploadType('camera')}
                                 disabled={isSubmitting}
                                 className={`px-4 py-2 text-sm font-medium rounded-md flex items-center justify-center ${uploadType === 'camera'
                                    ? 'bg-indigo-100 text-indigo-700'
                                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                    } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                              >
                                 <svg className="w-5 h-5 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                 Camera
                              </button>
                           </div>
                        </div>
                     </div>

                     {/* Submission Guidelines */}
                     <div className="border-t border-gray-200 pt-4">
                        {/* ... guidelines ... */}
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

                  {/* --- Right column - Upload/Camera/Preview Area --- */}
                  <div>
                     {/* Hidden file input */}
                     <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*,application/pdf" // Accept images and PDF
                        className="hidden"
                        disabled={isSubmitting}
                     />
                     {/* Hidden canvas for capturing */}
                     <canvas ref={canvasRef} className="hidden"></canvas>

                     {/* Conditional Rendering for Upload/Camera/Preview */}
                     {!preview && (
                        <>
                           {/* Document Upload Area */}
                           {uploadType === 'document' && (
                              <div
                                 onClick={!isSubmitting ? openFileSelector : undefined}
                                 className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${!isSubmitting ? 'cursor-pointer hover:border-indigo-500' : 'cursor-not-allowed bg-gray-100'} transition-colors duration-200`}
                              >
                                 <div className="space-y-1 text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    <div className="flex text-sm text-gray-600 justify-center">
                                       <span className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
                                          <span>Upload a file</span>
                                       </span>
                                       <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PDF or Image (JPG, PNG, GIF)</p>
                                 </div>
                              </div>
                           )}

                           {/* Camera View Area */}
                           {uploadType === 'camera' && (
                              <div className="mt-1 border border-gray-300 rounded-md p-2 bg-black relative aspect-video">
                                 <video
                                    ref={videoRef}
                                    autoPlay
                                    playsInline // Important for mobile
                                    muted // Often required for autoplay
                                    className={`w-full h-full object-contain ${!isCameraActive || !stream ? 'hidden' : ''}`} // Hide if not active
                                 ></video>

                                 {/* Loading/Permission State */}
                                 {!stream && isCameraActive && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-75">
                                       <svg className="animate-spin h-8 w-8 text-white mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                       </svg>
                                       Starting camera... Allow permissions.
                                    </div>
                                 )}

                                 {/* Placeholder/Instruction before camera starts */}
                                 {!isCameraActive && !stream && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-gray-400">
                                       <svg className="h-12 w-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                       <p>Camera will appear here.</p>
                                       <p className="text-sm">Position your answer sheet clearly.</p>
                                    </div>
                                 )}

                                 {/* Capture Button */}
                                 {isCameraActive && stream && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                                       <button
                                          type="button"
                                          onClick={captureImage}
                                          disabled={isSubmitting}
                                          className="p-3 bg-white rounded-full shadow-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                          aria-label="Capture image"
                                       >
                                          <svg className="w-6 h-6 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" /></svg>
                                       </button>
                                    </div>
                                 )}
                              </div>
                           )}
                        </>
                     )}

                     {/* Preview Area */}
                     {preview && (
                        <div className="mt-1 border-2 border-gray-300 rounded-md p-2 relative">
                           {preview === 'pdf' ? (
                              <div className="flex items-center justify-center p-4 bg-gray-100 rounded">
                                 <svg className="h-16 w-16 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                                 <div className="ml-4 text-left overflow-hidden">
                                    <p className="text-sm font-medium text-gray-800 truncate" title={file?.name || 'PDF Document'}>{file?.name || 'PDF Document'}</p>
                                    <p className="text-xs text-gray-500">{file ? `${(file.size / 1024).toFixed(1)} KB` : ''}</p>
                                 </div>
                              </div>
                           ) : (
                              <img
                                 src={preview} // This will be a data URL for captured or uploaded images
                                 alt="Answer sheet preview"
                                 className="mx-auto max-h-64 object-contain rounded"
                              />
                           )}
                           {/* Remove Button */}
                           {!isSubmitting && (
                              <button
                                 type="button"
                                 onClick={clearPreviewAndFile}
                                 className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500"
                                 aria-label="Remove file"
                              >
                                 <svg className="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                              </button>
                           )}
                        </div>
                     )}

                     {/* File Info Text */}
                     <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">
                           Answer Sheet {file ? '' : <span className="text-red-500">*</span>}
                        </label>
                        <p className="mt-1 text-sm text-gray-500 truncate" title={file ? (file.name || 'Captured image') : 'No file selected'}>
                           {file ? `Selected: ${file.name || 'Captured image'}` : 'No file selected'}
                        </p>
                     </div>

                     {/* Submit Button */}
                     <div className="mt-6">
                        <button
                           type="submit"
                           disabled={isSubmitting || !file || !selectedTest || loading}
                           className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150 ${isSubmitting || !file || !selectedTest || loading
                                 ? 'bg-indigo-300 cursor-not-allowed'
                                 : 'bg-indigo-600 hover:bg-indigo-700'
                              }`}
                        >
                           {isSubmitting ? (
                              <>
                                 <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                 </svg>
                                 Submitting...
                              </>
                           )
                              : 'Submit Answer'}
                        </button>
                     </div>
                  </div>
               </div>
            </form>
         </div>
      </div>
   );
};

export default TestSubmission;