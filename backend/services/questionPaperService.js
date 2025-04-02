const {GoogleGenAI} = require("@google/genai")
require("dotenv").config()
const fs = require("fs");
const path = require("path");

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const extractQuestions = async(filePath, mimeType) => {
   
   const QuestionContents = [
      {text: "Extract all questions from the given question paper and return them in JSON format with a unique ID for each. Maintain the original numbering and structure. Format: { 'questions': [{ 'id': 'Q1', 'text': 'Full question here' }, ...] }"},
      {
         inlineData: {
            data: Buffer.from(fs.readFileSync(path.join(__dirname, '../', filePath))).toString("base64"),
            mimeType
         }
      }
   ]

   let questions = await ai.models.generateContent({ model: 'gemini-2.0-flash', contents: QuestionContents })

   questions = JSON.parse(questions.candidates[0]?.content?.parts[0]?.text.replace(/```/g, "").replace('json', ""))

   // console.log(questions);
   return questions
}

const extractRubrics = async(filePath, mimeType) => {

   const rubricsContent = [
      {
         text: "Generate a structured grading rubric for each question provided. Each rubric should include a unique question ID, a list of evaluation criteria, and the marks assigned to each criterion. Ensure fairness and clarity in assessment.Format:{'rubrics': [{'questionId': 'Q1','criteria': [{ 'description': 'Correct definition provided', 'marks': 2 },{ 'description': 'Relevant real-world example', 'marks': 2 },{ 'description': 'Clarity & coherence in explanation', 'marks': 1 }]},...]}"
      },
      {
         inlineData: {
            data: Buffer.from(fs.readFileSync(path.join(__dirname, '../', filePath))).toString("base64"),
            mimeType
         }
      }
   ]


   let rubrics = await ai.models.generateContent({ model: 'gemini-2.0-flash', contents: rubricsContent })

   rubrics = JSON.parse(rubrics.candidates[0]?.content?.parts[0]?.text.replace(/```/g, "").replace('json', ""))  

   // console.log(rubrics);
   return rubrics
}

module.exports = {
   extractQuestions, 
   extractRubrics
}