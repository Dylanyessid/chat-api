import e from "express";
import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: { type: String, required: true },
    deletedAt: { type: Date, default: null }
})

 const UserModel = mongoose.model('User', UserSchema);
 export default UserModel