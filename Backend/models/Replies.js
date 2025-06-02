import mongoose from "mongoose";
import autoIncrement from "mongoose-sequence";


const RepliesSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // user object ID reference
    Question: {type:mongoose.Schema.Types.ObjectId,ref:'CommunityQuestion',required:true},
    reply:{type:String},
    DatePosted: { type: Date, index: true, default: Date.now },
  });

const Reply=mongoose.model("Reply",RepliesSchema);

export default Reply;