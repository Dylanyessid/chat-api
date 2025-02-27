import mongoose, { Schema } from "mongoose";

interface IProfileDocument {
    fullName: string,
    bio: string,
    photo: string,
    user: string,
    deletedAt: Date | null
}

const ProfileSchema = new Schema<IProfileDocument>({
    fullName:{
        type: String,
        required: true
    },
    bio:{
        type: String,
        
    },
    photo: { type: String },
    user:{},
    deletedAt: { type: Date, default: null }
})

 const UserModel = mongoose.model('Profile', ProfileSchema);
 export default UserModel