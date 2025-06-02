import mongoose from "mongoose";
import autoIncrement from "mongoose-sequence";

const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // user object ID reference
    Question:{type:mongoose.Schema.Types.ObjectId,ref:'CommunityQuestion'},                             // required title
    read:[{type:Number}]                    // defaults to current date/tim
  });

const Notification=mongoose.model("Notification",NotificationSchema);

export default Notification;