import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const chat = model.startChat({
  history: [
    {
      role: "user",
      parts: [{ text: "Hello" }],
    },
    {
      role: "model",
      parts: [{ text: "Great to meet you. What would you like to know?" }],
    },
  ],
});
const chatRouter=express.Router();
chatRouter.post("/chatBotQuery", async(req, res) => {
    const { text } = req.body;
    const prompt=text;
    let result = await chat.sendMessage(prompt);
    console.log(result.response.text());
    
    
    res.send(result.response.text());
});
export default chatRouter;