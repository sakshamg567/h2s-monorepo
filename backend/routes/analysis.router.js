const express = require("express")

const AnalysisRouter = express.Router()

AnalysisRouter.get('/getResults', handleGetResults)

module.exports = AnalysisRouter