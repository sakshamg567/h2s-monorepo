import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { CalendarIcon, FileText } from "lucide-react"

// Sample data - in a real app, you would fetch this from your API
const submittedTests = [
  {
    id: "1",
    title: "Midterm Examination",
    subject: "Advanced Mathematics",
    submittedDate: "2023-10-15",
    obtainedMarks: 78,
    totalMarks: 100,
  },
  {
    id: "2",
    title: "Final Project",
    subject: "Computer Science",
    submittedDate: "2023-11-02",
    obtainedMarks: 92,
    totalMarks: 100,
  },
  {
    id: "3",
    title: "Lab Assessment",
    subject: "Physics",
    submittedDate: "2023-10-28",
    obtainedMarks: 45,
    totalMarks: 60,
  },
  {
    id: "4",
    title: "Essay Submission",
    subject: "Literature",
    submittedDate: "2023-09-20",
    obtainedMarks: 18,
    totalMarks: 25,
  },
]

function FeedbackPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Feedback</h1>
        <p className="text-muted-foreground">View detailed feedback for all your submitted assessments</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Submitted Assessments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Submitted Date</TableHead>
                <TableHead>Score</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submittedTests.map((test) => {
                const scorePercentage = (test.obtainedMarks / test.totalMarks) * 100
                let scoreColor = "text-red-600"

                if (scorePercentage >= 80) {
                  scoreColor = "text-green-600"
                } else if (scorePercentage >= 60) {
                  scoreColor = "text-amber-600"
                }

                return (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">{test.title}</TableCell>
                    <TableCell>{test.subject}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        {test.submittedDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`font-medium ${scoreColor}`}>
                        {test.obtainedMarks}/{test.totalMarks}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link to={`/feedback/${test.id}`}>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                          <FileText className="mr-2 h-4 w-4" />
                          View Feedback
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default FeedbackPage

