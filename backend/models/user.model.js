const mongoose = require("mongoose")

const TeacherSchema = new mongoose.Schema({
   name: {type: String, required: true},
   email: {type: String, required: true, unique: true},
   password: {type: String, required: true, unique: true},
   teacherId: {type: Number, required: true, unique: true},
   phone: {type: Number, required: true, unique: true},
})


const studentSchema = new mongoose.Schema({
   name: { type: String, required: true },
   groupId: {type: String, required: true},
   password: { type: String, required: true }, // Hashed
   enrollmentNumber: { type: String, required: true, unique: true },
   submittedPapers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Submission" }],
}, { timestamps: true });

const studentModel = mongoose.model("student", studentSchema)
const TeacherModel = mongoose.model("teacher", TeacherSchema)

module.exports = {
   studentModel, 
   TeacherModel
}
