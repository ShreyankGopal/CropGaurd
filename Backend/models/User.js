import mongoose from "mongoose";
import autoIncrement from "mongoose-sequence";


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Questions:[{type:mongoose.Schema.Types.ObjectId,ref:'CommunityQuestion'}] ,
    Replies:[{type:mongoose.Schema.Types.ObjectId,ref:'Reply'}]
});

const User = mongoose.model("User", userSchema);

export default User;