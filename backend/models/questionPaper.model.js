const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
   questionId: { type: String, required: true },
   text: { type: String, required: true },
   marks: { type: Number, required: true },
});

const RubricSchema = new mongoose.Schema({
   questionId: { type: String, required: true },
   criteria: [
      {
         description: { type: String, required: true },
         marks: { type: Number, required: true },
      },
   ],
});

const QuestionPaperSchema = new mongoose.Schema({
   title: { type: String, required: true },
   subject: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },
   questions: { type: [QuestionSchema], required: true },
   rubrics: { type: [RubricSchema], required: true },
});

module.exports = mongoose.model("QuestionPaper", QuestionPaperSchema);
