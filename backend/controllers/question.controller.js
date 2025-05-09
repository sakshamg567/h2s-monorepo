const QuestionPaper = require("../models/questionPaper.model");
const {extractQuestions, extractRubrics} = require("../services/questionPaperService");

const handlePostPaperSave = async(req, res) => {
   try {
      const {title, subject} = req.body;
      
      const { path, mimetype } = req.file
   
      // currently rubrics are generated by gemini
      // TODO: add rubrics upload support in frontend
      
      const [questions, rubrics] = await Promise.all([
         extractQuestions(path, mimetype),
         extractRubrics(path, mimetype)
      ])

      console.log(questions);
      
      const newPaper = new QuestionPaper({
         title: title || "untitled",
         subject: subject || "undefined",
         questions: Array.isArray(questions?.questions) ? [...questions.questions] : [],
         rubrics: Array.isArray(rubrics?.rubrics) ? [...rubrics.rubrics] : [] 
      });
      
      try {
         await newPaper.save()
      } catch (error) {
         console.error(error);
         
         return res.status(400).json({error: "object creation failed"})
      }
      
      res.status(201).json({message: "question upload succesful"})
   } catch (error) {
      console.error(error.message);
   }
}

module.exports = handlePostPaperSave