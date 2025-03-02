import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

interface IProfileDocument extends mongoose.Document{
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

 ProfileSchema.plugin(mongoosePaginate)

 
 const ProfileModel = mongoose.model<IProfileDocument, mongoose.PaginateModel<IProfileDocument>>('Profile', ProfileSchema);
 export default ProfileModel