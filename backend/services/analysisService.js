require("dotenv").config()

const path = require("path")

const fs = require("fs")

const { GoogleGenAI } = require("@google/genai")


const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY})

const CheckPaper = async(filePath, mimeType, questions, rubrics) => {

   const AnswerContents = [
      {text: `Extract all answers from the given answer sheet, grade them according to the provided questions and rubric parameters and return them in JSON format(keys and values double quoted) following the schema below. Grading should not be too strict or too lineant .Each question should have its corresponding answer, marks obtained, and maximum marks based on the provided rubric. Also, provide feedback on the answer quality. Format : { 'breakdown': [{'question': 'Full question text here','answer': 'Extracted answer text','obtainedMarks': 'Marks obtained','obtainableMarks': 'Maximum marks for this question'} ...],'feedback': 'Constructive feedback based on rubric}],'goodAreas': ['Topics where performance was strong'],'decentAreas': ['Topics where performance was moderate'],'weakAreas': ['Topics where performance was weak'],'remarks': 'Overall assessment comments'}
         question: ${questions},
         rubrics: ${rubrics}  
      `},
      {
         inlineData: {
            data: Buffer.from(fs.readFileSync(path.join(__dirname, '../', filePath))).toString("base64"),
            mimeType
         }
      }
   ]
   
   let response = await ai.models.generateContent({ model: 'gemini-1.5-pro', contents: AnswerContents ,config: {temperature: 0.5}})

   response = JSON.parse(response.candidates[0]?.content?.parts[0].text.replace(/```/g, "").replace('json', ""));

   return response
   

   // console.log(questions, rubrics);


}

module.exports = CheckPaper