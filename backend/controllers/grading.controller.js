const questionPaperModel = require("../models/questionPaper.model");

const AnswerSheetModel = require("../models/grading.model")

const CheckPaper = require("../services/analysisService");

const handlePostAnswerSheet = async(req, res) => {
   const {title, subject} = req.body;

   const { path, mimetype } = req.file

   const questionPaper = await questionPaperModel.findOne({title: title, subject: subject}).lean()

   const questions = questionPaper?.questions
   const rubrics = questionPaper?.rubrics

   const response = await CheckPaper(path, mimetype, questions, rubrics)

   let obtainedMarks = 0, obtainableMarks = 0;

   for(answer of response.breakdown){
      // console.log(answer);
      
      obtainedMarks += answer.obtainedMarks
      obtainableMarks += answer.obtainableMarks
   }

   const newAnswer = new AnswerSheetModel({
      title: questionPaper?.title || "null",
      subject: questionPaper?.subject || "null",
      obtainedMarks: obtainedMarks,
      totalMarks: obtainableMarks,
      breakdown: response.breakdown,
      goodAreas: response.goodAreas,
      decentAreas: response.decentAreas,
      weakAreas: response.weakAreas,
      remarks: response.remarks
   })

   // console.log(newAnswer);
   

   try {
      await newAnswer.save()
      return res.status(200).json({message: "result saved succesfully"})
   } catch (error) {
      return res.status(400).json({error: "result saving failed"})
   }
}

module.exports = handlePostAnswerSheet