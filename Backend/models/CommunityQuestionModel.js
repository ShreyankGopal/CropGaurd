import mongoose from "mongoose";
import autoIncrement from "mongoose-sequence";

const CommunityQuestionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // user object ID reference
    Title: { type: String, required: true },                             // required title
    Question: { type: String },                                          // optional question
    Tags: { type: [String] },                                            // array of strings (not SVGStringList in JS)
    DatePosted: { type: Date, index: true, default: Date.now },
    Replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Replies' }]                      // defaults to current date/tim
  });

const CommunityQuestion=mongoose.model("CommunityQuestion",CommunityQuestionSchema);

export default CommunityQuestion;