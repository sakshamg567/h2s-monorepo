const mongoose = require("mongoose")

const breakdownSchema = new mongoose.Schema({
   question: String,
   answer: String,
   obtainedMarks: Number,
   obtainableMarks: Number,
   feedback: String,
})

const answerSheet = new mongoose.Schema({
   title: {type: String, required: true},
   subject: {type: String, required: true},
   obtainedMarks: {type: Number,required: true},
   totalMarks : {type: Number,required: true}, 
   breakdown: {type: [breakdownSchema], required: true},
   goodAreas: [String],
   decentAreas: [String],
   weakAreas: [String],
   remarks: {
      type: String,
      default: ""
   }
})

module.exports = mongoose.model('answerSheet', answerSheet)