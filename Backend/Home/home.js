import express from "express";
import authenticateToken from '../middlewares/tokenAuth.js'
const home=express.Router();
home.get('/',authenticateToken,async(req,res)=>{
    console.log('here at home page')
    res.send('authenticated');
})
export default home;