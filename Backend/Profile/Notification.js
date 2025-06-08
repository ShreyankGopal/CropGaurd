import express, { application } from "express";
import User from "../models/User.js";
import CommunityQuestion from "../models/CommunityQuestionModel.js";
import Reply from "../models/Replies.js";
import authenticateToken from "../middlewares/tokenAuth.js";
import Notification from "../models/Notifications.js";
const NotificationPage=express.Router();
NotificationPage.get('/notifications',authenticateToken,async(req,res)=>{
    const userID=req.user.userId;
    try{
        var query={};
        query.user=userID;
        const result=await Notification.find(query)
        .populate({
            path:'user',
            
            
        })
        .populate({
            path:'Question'
        })
        .populate({
            path: "replyBy",
            select: "name"
        })
        console.log("Printing notifications below here \n");
        console.log(result);
        res.send(result);
    }
    catch(error){
        console.log(error);
    }
})
export default NotificationPage;