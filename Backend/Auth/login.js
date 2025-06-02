import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.js"; // Import the Mongoose User model

dotenv.config();

const login = express.Router();

login.post('/login', async (req, res) => {
    try {
        const jwtSecretKey = process.env.JWT_SECRET_KEY;
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email:email }).select("email password");
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, jwtSecretKey, { expiresIn: "1h" });

        // Set authentication cookie
        res.cookie("authToken", token, {
            httpOnly: true,
            sameSite: "lax",
            secure:false // Set to `true` in production (HTTPS required)
        });

        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export default login;
