const express = require("express")

const handlePostAnswerSheet = require("../controllers/grading.controller")

const upload = require("../middlewares/upload")
const gradingModel = require("../models/grading.model")

const router = express.Router()

router.post('/submit', upload.single("file"), handlePostAnswerSheet)

router.get('/submitted', async(req, res) => {
   const submittedTests = await gradingModel.find();
   if(submittedTests){
      res.send(submittedTests)
   }
})

router.get('/submitted/:subject', async(req, res) => {
   const {subject} = req.params   
   const submittedTests = await gradingModel.findOne({subject: String(subject)})
   console.log(submittedTests);
   
   if(submittedTests){
      res.send(submittedTests)
   }
})


module.exports = router