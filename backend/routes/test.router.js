const express = require("express")
const handlePostPaperSave = require("../controllers/question.controller")
const router = express.Router()

const questionPaperModel = require("../models/questionPaper.model")

const upload = require("../middlewares/upload")

router.post('/upload', upload.single("file"), handlePostPaperSave)

router.get('/available', async (req, res) => {
   const tests = await questionPaperModel.find()

   if (tests) {
      let testList = [];
      let counter = 1;
      tests.map((test) => {
         const testMetaData = {
            id: counter++,
            title: test.title,
            subject: test.subject,
            date: test.createdAt.toDateString()
         }
         testList.push(testMetaData)
      })
      res.send(testList)
      
   }
})



module.exports = router