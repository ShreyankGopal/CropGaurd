import express, { application } from "express";
import User from "../models/User.js";
import CommunityQuestion from "../models/CommunityQuestionModel.js";
import authenticateToken from "../middlewares/tokenAuth.js";
const app=express();

const AskQuestionsForm=express.Router();
AskQuestionsForm.post('/AskQuestionForm',authenticateToken,async(req,res)=>{
    const userId = req.user.userId;

    try {
        
        
            const formData = req.body.formData;
            const title = formData.title;
            const question = formData.question;
            const tags = formData.tags;

        // Create new community question using correct schema field names
            const newQuestion = new CommunityQuestion({
                user: userId,
                Title: title,
                Question: question,
                Tags: tags,
                DatePosted: new Date(),
                Replies: []
            });

            const savedQuestion=await newQuestion.save();
            await User.findByIdAndUpdate(
                userId,
                {$push:{Questions:savedQuestion._id}}
            );
            res.send("success");
        
        
    } catch (error) {
        console.error(error);
        res.status(500).send("failure");
    }
})
export default AskQuestionsForm;