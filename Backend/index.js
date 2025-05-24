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
dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5001;
 // ✅ Allows form data parsing
app.use(cookieParser())       
// Middleware
app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

// Sample API route
app.use('/',chatRouter);
app.use('/',signup);
app.use('/',login);
app.use('/',home);
app.use('/',logout)
app.use('/',detection)
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
