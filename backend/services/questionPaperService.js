// v1: ready

const {GoogleGenAI} = require("@google/genai")
require("dotenv").config()
const fs = require("fs");
const path = require("path");

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

const extractQuestions = async(filePath, mimeType) => {
   
   const QuestionContents = [
      {text: "Extract all questions from the given question paper and return them in JSON format with a unique ID for each. Maintain the original numbering and structure. Format: { 'questions': [{ 'id': 'Q1(a)', 'text': 'Full question here', 'marks': 'max attainable marks for this question(DONT LEAVE EMPTY)' }, ...] }"},
      {
         inlineData: {
            data: Buffer.from(fs.readFileSync(path.join(__dirname, '../', filePath))).toString("base64"),
            mimeType
         }
      }
   ]

   let questions = await ai.models.generateContent({ model: 'gemini-2.0-flash', contents: QuestionContents })

   questions = JSON.parse(questions.candidates[0]?.content?.parts[0]?.text.replace(/```/g, "").replace('json', ""))

   return questions
   
}

const extractRubrics = async(filePath, mimeType) => {

   const rubricsContent = [
      {
         text: `Generate a structured grading rubric for each question provided and return them in valid JSON format. Each rubric should include: a unique "questionId" as a string (e.g., "Q1", "Q2_a", "Q3_b"), a "criteria" field as a single string clearly describing the grading breakdown (e.g., "2 marks for correct definition, 2 marks for relevant example, 2 marks for clarity in explanation"). Use double quotes (" ") for all keys and string values. Maintain consistency in mark allocation wording (e.g., "1 mark" instead of "1 marks"). Ensure the JSON is properly formatted and valid. Output format: {"rubrics": [{"questionId": "Q1", "criteria": "2 marks for correct definition, 2 marks for relevant example, 2 marks for clarity in explanation"}, {"questionId": "Q2_a", "criteria": "3 marks for setting up correct equation, 2 marks for accurate final value"}]}.`
      },
      {
         inlineData: {
            data: Buffer.from(fs.readFileSync(path.join(__dirname, '../', filePath))).toString("base64"),
            mimeType
         }
      }
   ]


   let rubrics = await ai.models.generateContent({ model: 'gemini-2.0-flash', contents: rubricsContent })

   rubrics = JSON.parse(rubrics.candidates[0].content.parts[0].text.replace(/```/g, "").replace('json', ""));

   return rubrics
}

module.exports = {
   extractQuestions, 
   extractRubrics
}