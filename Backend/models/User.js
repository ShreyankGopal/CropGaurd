import mongoose from "mongoose";
import autoIncrement from "mongoose-sequence";
const AutoIncrement=autoIncrement(mongoose)
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });
const User = mongoose.model("User", userSchema);

export default User;