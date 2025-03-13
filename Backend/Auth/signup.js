import express, { application } from "express";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js"; // Import the Mongoose User model
const app=express()
app.use(cookieParser())
dotenv.config();

const signup = express.Router();

signup.post('/signup', async (req, res) => {
    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY;

        const { name, email, password } = req.body;

        // Check if user already exists by name
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with that name" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user document
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });
        
        // Save the user in MongoDB
        await newUser.save();

        // Generate JWT Token
        const token = jwt.sign({ userEmail: email }, jwtSecretKey, { expiresIn: "1h" });

        // Set cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            sameSite: "none",
            secure: false, // Set to `true` in production (HTTPS required)
        });

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default signup;
