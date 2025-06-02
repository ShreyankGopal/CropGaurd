import express, { application } from "express";
import User from "../models/User.js";
import CommunityQuestion from "../models/CommunityQuestionModel.js";
import mongoose from "mongoose";
import Reply from "../models/Replies.js";
const app=express();
const QuestionDescription=express.Router();

QuestionDescription.get('/QuestionDescription/:id',async (req,res)=>{
    try {
        console.log("here");
        console.log(req.params.id)
        const objectId = new mongoose.Types.ObjectId(req.params.id);
        console.log("Question Description")
        
        
        let query = {};

        // Filter by tags if provided
        

        // Cursor-based pagination (descending)
        query._id=objectId;

        // Perform query
        const question = await CommunityQuestion.findOne(query)
            .populate('user','name')
            .populate({
                path: 'Replies',
                populate: { path: 'user', select: 'name' }
            });
        console.log(question)

      
        
        res.send(question)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
})
export default QuestionDescription;