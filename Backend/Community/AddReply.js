import express, { application } from "express";
import User from "../models/User.js";
import CommunityQuestion from "../models/CommunityQuestionModel.js";
import authenticateToken from "../middlewares/tokenAuth.js";
import Reply from "../models/Replies.js";
import Notification from "../models/Notifications.js";
const AddReply=express.Router();
AddReply.post('/AddReply',authenticateToken,async (req,res)=>{
    try{
        const QuestionId=req.body.QuestionId;
        const replyText=req.body.replyText;
        const userId=req.user.userId;
        console.log(userId);
        const reply=new Reply(
            {
                user:userId,
                Question:QuestionId,
                reply:replyText,
                
            }
        )
        const questionInfo=await CommunityQuestion.findOne({_id:QuestionId})
        .populate({
            path:'user'
        })
        console.log(`question Info is ${questionInfo}`);
        const notification = new Notification({
            user: questionInfo.user._id,
            Question: QuestionId,
            read:0,
            replyBy:userId
            
          });
          
          await notification.save();
          
          // Step 2: Push 0 into the read array
        //   await Notification.findByIdAndUpdate(
        //     notification._id,
        //     { $push: { read: 0 } }
        //   );
        const savedReply=await reply.save();

        await User.findByIdAndUpdate(
            userId,
            {$push:{Replies:savedReply._id}}
        )
        console.log(reply);
        await CommunityQuestion.findByIdAndUpdate(
            QuestionId,
            { $push: { Replies: reply._id } },
            { new: true }
        );
        const query={};
        query._id=userId;
        await reply.save();
        const username=await User.findOne(query);
        console.log("username is printed here")
        console.log(username);
        res.send({name:username.name});
    }
    catch(error){
        console.log(error)
        res.status(500).send("failure")
    }


})
export default AddReply;