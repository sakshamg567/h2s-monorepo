import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import {useNavigate} from "react-router-dom"

const TestsOverview = () => {
   const [tests, setTests] = useState([]);
   const [loading, setLoading] = useState(true);

   const navigator = useNavigate();

   useEffect(() => {
      fetchTests();
   }, []);

   const fetchTests = async () => {
      // Show placeholder while fetching
      setTests([
         {
            id: "loading-1",
            title: "Loading...",
            subject: "Fetching data...",
            date: "Please wait...",
         },
      ]);

      try {
         const res = await axios.get("http://localhost:3000/api/test/available");
         setTests(res.data);
      } catch (error) {
         console.error("Failed to fetch tests");
         setTests([]); // Clear placeholder if request fails
      } finally {
         setLoading(false);
      }
   };

   return (
      <div>
         <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Available</h2>

            {tests.length > 0 ? (
               <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <ul className="divide-y divide-gray-200">
                     {tests.map((test) => (
                        <li key={test.id} className="p-4 sm:px-6">
                           <div className="flex items-center justify-between">
                              <div className="flex flex-col">
                                 <span className="text-sm font-medium text-blue-600">{test.subject}</span>
                                 <h3 className="text-lg font-medium text-gray-900">{test.title}</h3>
                                 <div className="mt-2 flex items-center text-sm text-gray-500">
                                    <svg
                                       className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                       fill="none"
                                       viewBox="0 0 24 24"
                                       stroke="currentColor"
                                    >
                                       <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                       />
                                    </svg>
                                    <span>{test.date}</span>
                                 </div>
                              </div>
                              <div className="ml-5 flex-shrink-0">
                                 <Button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                                 onClick={() => navigator('/student-dashboard/submit')}>
                                    Submit Test
                                 </Button>
                              </div>
                           </div>
                        </li>
                     ))}
                  </ul>
               </div>
            ) : !loading ? (
               <div className="text-center p-6 bg-white shadow sm:rounded-lg">
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No upcoming tests</h3>
                  <p className="mt-1 text-sm text-gray-500">You don't have any scheduled tests at the moment.</p>
               </div>
            ) : null}
         </div>
      </div>
   );
};

export default TestsOverview;
