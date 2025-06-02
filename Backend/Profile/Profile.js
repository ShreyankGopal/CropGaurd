import express, { application } from "express";
import User from "../models/User.js";
import CommunityQuestion from "../models/CommunityQuestionModel.js";
import Reply from "../models/Replies.js";
import authenticateToken from "../middlewares/tokenAuth.js";
const profile=express.Router();
profile.get('/profileData',authenticateToken,async(req,res)=>{
    const userID=req.user.userId;
    try{
        var query={};
        query._id=userID;
        const result=await User.findOne(query)
        .populate({
            path:'Replies',
            populate:{ path: 'Question' }
        })
        .populate({
            path:'Questions'
        })
        console.log(result);
        res.send(result);
    }
    catch(error){
        console.log(error);
    }
})
export default profile;