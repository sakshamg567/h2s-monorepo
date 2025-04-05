const express = require("express")
const router = require("./routes/test.router")
const analysisRouter = require("./routes/result.router")

require("dotenv").config()

const mongoose = require("mongoose")
const AnalysisRouter = require("./routes/result.router")

mongoose.connect(process.env.MONGODB_URI)
.then(console.log("connected"))

const app = express()

app.get("/", (req, res) => {
   res.json({message: "hello"})
})

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/api/test', router)

app.use('/api/answer', analysisRouter)

app.use

app.listen(3000, () => console.log("listening on 3000"))
