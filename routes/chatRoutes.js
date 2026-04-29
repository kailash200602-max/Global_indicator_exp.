import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ reply: 'Gemini API key is not configured in the backend.' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    // Add context to the prompt
    const contextPrompt = `You are an AI assistant for the 'Global Indicator Explorer' platform, an application that visualizes World Bank data like GDP, Population, CO2 emissions, etc. Answer the following user question concisely and helpfully:\n\nUser: ${prompt}`;
    
    const result = await model.generateContent(contextPrompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ reply: text });
  } catch (error) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ reply: 'Sorry, I encountered an error while processing your request.' });
  }
});

export default router;
