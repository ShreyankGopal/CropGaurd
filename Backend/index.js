import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRouter from "./Home/chatBot.js";
import mongoose from "mongoose";
import signup from "./Auth/signup.js";
import db from "./databaseConn.js";
import login from "./Auth/login.js";
import home from "./Home/home.js";
import cookieParser from "cookie-parser";
import logout from "./Auth/logout.js";
import detection from "./diseaseDetection/detectDisease.js";
import multer from "multer";
import AskQuestionsForm from "./Community/AskQuestionsForm.js";
import Questions from "./Community/QuestionsPage.js";
import QuestionDescription from "./Community/QuestionDescription.js";
import AddReply from "./Community/AddReply.js";
import profile from "./Profile/Profile.js";
import NotificationPage from "./Profile/Notification.js";
import readNotifications from "./Profile/readNotifications.js";
dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000;
 // ✅ Allows form data parsing
app.use(cookieParser())       
// Middleware
app.use(express.json());
app.use(cors({
    origin:process.env.ORIGIN,
    credentials:true
}));

// Sample API route
app.use('/',chatRouter);
app.use('/',signup);
app.use('/',login);
app.use('/',home);
app.use('/',logout)
app.use('/',detection)
app.use('/',Questions);
app.use('/',AskQuestionsForm)
app.use('/',QuestionDescription);
app.use('/',AddReply);
app.use('/',profile);
app.use('/',NotificationPage);
app.use('/',readNotifications);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
