  const { GoogleGenAI } = require('@google/genai') ;
  const dotenv = require('dotenv');
  dotenv.config();

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

const generateAiReview = async (code) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Analyze the following code and provide a short and concise review of the code. Also, provide a list of potential improvements and suggestions for the code in under 100 words. Don't give complete code." + code,
  });
  return response.text;
};



module.exports = generateAiReview

