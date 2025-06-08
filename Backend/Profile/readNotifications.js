import express, { application } from "express";
import User from "../models/User.js";
import CommunityQuestion from "../models/CommunityQuestionModel.js";
import Reply from "../models/Replies.js";
import authenticateToken from "../middlewares/tokenAuth.js";
import Notification from "../models/Notifications.js";
const readNotifications=express.Router();
readNotifications.post('/readNotifications',authenticateToken,async(req,res)=>{
    const userID=req.user.userId;
    const all=req.body.all;
    const id=req.body.id;
    try{
        var query;
        if(all==0){
            query={_id:id};
            await Notification.findByIdAndUpdate(id,{$set:{read:1}})
        }
        else{
            await Notification.updateMany({user:userID,read:0},{$set:{read:1}})
        }
        
        
        
        res.send("success");
    }
    catch(error){
        console.log(error);
    }
})
export default readNotifications;