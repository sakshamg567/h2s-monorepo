const express = require("express")
const router = require("./routes/question.router")

const app = express()

app.get("/", (req, res) => {
   res.json({message: "hello"})
})

app.use(express.urlencoded({extended: true}))

app.use('/api/upload', router)

app.listen(3000, () => console.log("listening on 3000"))
