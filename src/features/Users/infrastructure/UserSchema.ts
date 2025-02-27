
import mongoose, { Schema } from "mongoose";

export interface IUserDocument {
    username: string,
    email: string,
    password: string,
    deletedAt: Date | null
}

const UserSchema = new Schema<IUserDocument>({
    username:{
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