"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronUp, Download, Printer, Star, ArrowLeft } from "lucide-react"
import axios from "axios"

// In a real application, you would fetch this data from your API based on the ID
// For this example, I'm using the same sample data from before


function AnswerSheetPage() {
  const { subject } = useParams()
  const navigate = useNavigate()
  const [answerSheetData, setAnswerSheetData] = useState(null)
  const [expandedQuestions, setExpandedQuestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getAnswerSheetData = async () => {
      const res = await axios.get(`/api/answer/submitted/${subject}`);
      
      setAnswerSheetData(res.data);
      setLoading(false);
    };
    
    getAnswerSheetData();
    
  }, [subject]);
  

  const toggleQuestion = (index) => {
    if (expandedQuestions.includes(index)) {
      setExpandedQuestions(expandedQuestions.filter((i) => i !== index))
    } else {
      setExpandedQuestions([...expandedQuestions, index])
    }
  }

  if (loading) {
    return (
      <div
        className="container mx-auto py-8 px-4 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading feedback...</p>
        </div>
      </div>
    );
  }

  if (!answerSheetData) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="text-center p-8">
          <CardTitle className="mb-4">Feedback Not Found</CardTitle>
          <CardDescription>The requested feedback could not be found.</CardDescription>
          <Button
            className="mt-4 bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/feedback")}>
            Back to Feedback
          </Button>
        </Card>
      </div>
    );
  }

  const percentageScore = (answerSheetData.obtainedMarks / answerSheetData.totalMarks) * 100

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-4" onClick={() => navigate("/feedback")}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Feedback
      </Button>
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">{answerSheetData.subject}</CardTitle>
              <CardDescription className="text-lg">{answerSheetData.subject}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Print
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Overall Performance</h3>
              <div className="text-xl font-bold">
                {answerSheetData.obtainedMarks} / {answerSheetData.totalMarks}
              </div>
            </div>
            <Progress value={percentageScore} className="h-2" />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Question Breakdown</h3>
            <div className="rounded-md border">              
              {answerSheetData.breakdown.map((item, index) => (
                <div key={index} className="border-b last:border-b-0">
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleQuestion(index)}>
                    <div className="flex-1">
                      <div className="font-medium">{item.question}</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Score: {item.obtainedMarks}/{item.obtainableMarks}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      {expandedQuestions.includes(index) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>

                  {expandedQuestions.includes(index) && (
                    <div className="p-4 bg-muted/30 border-t">
                      <div className="mb-3">
                        <div className="text-sm font-medium mb-1">Your Answer:</div>
                        <div className="text-sm">{item.answer}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium mb-1">Feedback:</div>
                        <div className="text-sm">{item.feedback}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Performance Analysis</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Star className="h-4 w-4 mr-2 text-green-500" />
                    Strong Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {answerSheetData.goodAreas.map((area, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-green-50 text-green-700 hover:bg-green-100">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Star className="h-4 w-4 mr-2 text-amber-500" />
                    Decent Areas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {answerSheetData.decentAreas.map((area, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-amber-50 text-amber-700 hover:bg-amber-100">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center">
                    <Star className="h-4 w-4 mr-2 text-red-500" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {answerSheetData.weakAreas.map((area, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-red-50 text-red-700 hover:bg-red-100">
                        {area}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Instructor Remarks</h3>
            <Card className="bg-muted/30">
              <CardContent className="p-4">
                <p>{answerSheetData.remarks}</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>

        <CardFooter className="border-t flex justify-end pt-4">
          <Button className="bg-blue-600 hover:bg-blue-700">Next Steps</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default AnswerSheetPage

