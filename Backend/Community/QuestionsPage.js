import express, { application } from "express";
import User from "../models/User.js";
import CommunityQuestion from "../models/CommunityQuestionModel.js";
const app=express();
const Questions=express.Router();
Questions.get('/CommunityQuestions',async (req,res)=>{
    
    try {
        
        console.log("community questions page")
        const { cursor, tags } = req.query; // tags and cursor come from query params
        const limit = 10;
        let query = {};

        // Filter by tags if provided
        if (tags && tags.length > 0) {
            const tagArray = Array.isArray(tags) ? tags : tags.split(','); // handle comma-separated string
            query.Tags = { $in: tagArray };
        }

        // Cursor-based pagination (descending)
        if (cursor) {
            query._id = { $lt: cursor }; // get older records than cursor
        }

        // Perform query
        const questions = await CommunityQuestion.find(query)
            .sort({ _id: -1 }) // latest first. mongodb id field contains date posted 
            .limit(limit)
            .populate('user','name');
        console.log(questions)

        const nextCursor = questions.length > 0 ? questions[questions.length - 1]._id : null;

        
        res.send({results:questions,nextCursor:nextCursor});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
})
export default Questions;