import { Button } from "@/components/ui/button"
import { Sparkles, BookOpen, Clock, BarChart } from 'lucide-react'
import {useNavigate} from "react-router-dom"
export default function Landing() {

  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="container mx-auto py-6 px-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            <span className="font-medium text-lg text-gray-900">EduGrade AI</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div
              className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm font-medium mb-4">
              Aligned with UN SDG 4: Quality Education
            </div>
            <h1
              className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight">
              Transform Education with AI-Powered Grading
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Automate assignment grading, provide personalized feedback, and create more time for what matters most: teaching.
            </p>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-md text-base font-medium hover:cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Get Started
              
            </Button>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-100 p-6 rounded-md">
              <Clock className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Save Time</h3>
              <p className="text-gray-600">
                Reduce grading time by up to 70%, allowing educators to focus on personalized instruction.
              </p>
            </div>
            
            <div className="border border-gray-100 p-6 rounded-md">
              <BookOpen className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Personalized Feedback</h3>
              <p className="text-gray-600">
                Provide detailed, consistent feedback to every student, enhancing their learning experience.
              </p>
            </div>
            
            <div className="border border-gray-100 p-6 rounded-md">
              <BarChart className="h-8 w-8 text-blue-600 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Data Insights</h3>
              <p className="text-gray-600">
                Gain valuable insights into student performance to improve teaching strategies.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 bg-gray-50">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">
              Supporting Inclusive and Equitable Quality Education
            </h2>
            <div className="bg-white p-8 rounded-md border border-gray-100">
              <p className="text-gray-700 mb-4">
                Our AI-powered assistant helps educators provide timely, consistent feedback to all students, 
                regardless of class size or resources. By automating routine grading tasks, teachers can 
                dedicate more time to personalized instruction and addressing individual learning needs.
              </p>
              <p className="text-gray-700">
                This technology supports UN Sustainable Development Goal 4 by enhancing educational quality, 
                promoting inclusive learning environments, and enabling data-driven teaching strategies that 
                benefit all students.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-gray-50 border-t border-gray-100 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} EduGrade AI • Empowering educators worldwide
          </p>
        </div>
      </footer>
    </div>
  );
}

