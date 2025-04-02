const express = require("express")
const handlePostPaperSave = require("../controllers/question.controller")
const router = express.Router()

const upload = require("../middlewares/upload")

router.post('/', upload.single("file"), handlePostPaperSave)

module.exports = router