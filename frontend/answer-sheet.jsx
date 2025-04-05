import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronDown, ChevronUp, Download, Printer, Star } from "lucide-react"

// Sample data based on the schema
const answerSheetData = {
  title: "Midterm Examination",
  subject: "Advanced Mathematics",
  obtainedMarks: 78,
  totalMarks: 100,
  breakdown: [
    {
      question: "Explain the concept of limits in calculus.",
      answer:
        "Limits describe the value that a function approaches as the input approaches some value. They are fundamental to calculus and used to define derivatives and integrals.",
      obtainedMarks: 8,
      obtainableMarks: 10,
      feedback: "Good explanation but could have included more examples.",
    },
    {
      question: "Solve the differential equation: dy/dx = 2x + y",
      answer:
        "Using the integrating factor method: The equation is in the form dy/dx - Py = Q where P = -1 and Q = 2x. The integrating factor is e^(-∫P dx) = e^x. Multiplying both sides: e^x dy/dx - e^x y = 2x e^x. This gives d/dx(e^x y) = 2x e^x. Integrating: e^x y = 2x e^x - 2e^x + C. Therefore y = 2x - 2 + Ce^(-x).",
      obtainedMarks: 15,
      obtainableMarks: 15,
      feedback: "Perfect solution with all steps clearly shown.",
    },
    {
      question: "Prove the Fundamental Theorem of Calculus.",
      answer:
        "The Fundamental Theorem of Calculus states that if f is continuous on [a,b] and F is an antiderivative of f, then ∫(a,b) f(x) dx = F(b) - F(a). To prove this, we define F(x) = ∫(a,x) f(t) dt. By the definition of the derivative, F'(x) = lim(h→0) [F(x+h) - F(x)]/h = lim(h→0) [∫(a,x+h) f(t) dt - ∫(a,x) f(t) dt]/h = lim(h→0) [∫(x,x+h) f(t) dt]/h. By the Mean Value Theorem, there exists c in [x,x+h] such that ∫(x,x+h) f(t) dt = f(c)·h. Therefore, F'(x) = lim(h→0) f(c) = f(x) by continuity of f. Since F'(x) = f(x), F is an antiderivative of f, and by the Fundamental Theorem, ∫(a,b) f(x) dx = F(b) - F(a).",
      obtainedMarks: 18,
      obtainableMarks: 20,
      feedback: "Strong proof but missed some details in the final step.",
    },
    {
      question: "Explain the applications of matrices in computer graphics.",
      answer:
        "Matrices are used in computer graphics for transformations such as translation, rotation, scaling, and projection. They allow efficient representation and computation of these operations. For example, a 2D rotation can be represented by a 2×2 matrix, and a 3D transformation by a 4×4 matrix. Graphics pipelines use matrix multiplication to transform vertices and render 3D scenes.",
      obtainedMarks: 12,
      obtainableMarks: 15,
      feedback: "Good overview but could have included specific examples of transformation matrices.",
    },
    {
      question: "Solve the system of linear equations using Gaussian elimination.",
      answer:
        "For the system: 2x + y - z = 8, 3x - 5y + 2z = -3, x + y + z = 2. Step 1: Write the augmented matrix [[2,1,-1,8],[3,-5,2,-3],[1,1,1,2]]. Step 2: Use row operations to get [[1,1,1,2],[0,-8,-1,-9],[0,-2,-3,4]]. Step 3: Continue to get [[1,1,1,2],[0,1,1/8,9/8],[0,0,-5/2,1/2]]. Step 4: Back-substitute to find z = -1/5, y = 7/5, x = 4/5. Therefore, the solution is (4/5, 7/5, -1/5).",
      obtainedMarks: 13,
      obtainableMarks: 15,
      feedback: "Correct approach and solution, but some intermediate steps were skipped.",
    },
    {
      question: "Discuss the importance of eigenvalues and eigenvectors.",
      answer:
        "Eigenvalues and eigenvectors are important in linear algebra and have applications in various fields. They help in understanding linear transformations, solving differential equations, principal component analysis, and quantum mechanics. An eigenvector of a matrix A is a non-zero vector v such that Av = λv, where λ is the corresponding eigenvalue. They simplify complex calculations and provide insights into the behavior of systems.",
      obtainedMarks: 12,
      obtainableMarks: 15,
      feedback: "Good discussion but lacked specific examples of applications.",
    },
  ],
  goodAreas: ["Differential Equations", "Calculus Fundamentals"],
  decentAreas: ["Linear Algebra", "Proof Techniques"],
  weakAreas: ["Applied Mathematics", "Numerical Examples"],
  remarks:
    "Overall, a strong performance demonstrating good theoretical understanding. To improve, focus on providing more concrete examples and applications of mathematical concepts. Continue to work on applied mathematics problems to strengthen this area.",
}

export default function AnswerSheet() {
  const [expandedQuestions, setExpandedQuestions] = useState([])

  const toggleQuestion = (index) => {
    if (expandedQuestions.includes(index)) {
      setExpandedQuestions(expandedQuestions.filter((i) => i !== index))
    } else {
      setExpandedQuestions([...expandedQuestions, index])
    }
  }

  const percentageScore = (answerSheetData.obtainedMarks / answerSheetData.totalMarks) * 100

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="shadow-lg">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">{answerSheetData.title}</CardTitle>
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

