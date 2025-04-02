const mongoose = require("mongoose")

const grading = new mongoose.Schema({
   subjectCode: {
      type: String,
      required: true
   },
   examName: {
      type: String,
      required: true
   },
   examDate: {
      type: Date,
      required: true
   },
   score: {
      type: Number,
      required: true
   },
   goodAreas: [String],
   decentAreas: [String],
   weakAreas: [String],
   remarks: {
      type: String,
      default: ""
   }
})

module.exports = mongooose.model('grading', grading)