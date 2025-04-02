const axios = require("axios")

require("dotenv").config()

const { GoogleGenAI } = require("@google/genai")

const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY})

const handleGetResults = (req, res) => {
      
}