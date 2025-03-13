import express from "express";
import authenticateToken from "../middlewares/tokenAuth.js";
const logout=express.Router()
logout.post('/logout',authenticateToken,(req,res)=>{
    res.clearCookie("authToken");
    res.send("logged out");
})
export default logout