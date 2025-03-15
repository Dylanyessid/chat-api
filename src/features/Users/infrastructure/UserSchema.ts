
import mongoose, { Schema } from "mongoose";
import  mongoosePaginate  from 'mongoose-paginate-v2';
import { IProfileDocument } from "../../Profiles/infrastructure/ProfileSchema";

export interface IUserDocument {
    _id:string
    email: string,
    profile: mongoose.Types.ObjectId | IProfileDocument
    password: string,
    deletedAt: Date | null
}

const UserSchema = new Schema<IUserDocument>({
   
    email:{
        type: String,
        required: true,
        unique: true
    },
    profile:{
        default:null,
        type:mongoose.Schema.Types.ObjectId,
        ref:'Profile'
    },
    password: { type: String, required: true },
    deletedAt: { type: Date, default: null }
})

 UserSchema.plugin(mongoosePaginate)

 const UserModel = mongoose.model<IUserDocument, mongoose.PaginateModel<IUserDocument>>('User', UserSchema);
 export default UserModel