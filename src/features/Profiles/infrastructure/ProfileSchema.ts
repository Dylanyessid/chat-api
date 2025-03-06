import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

export interface IProfileDocument extends mongoose.Document{
    fullName: string,
    bio: string,
    photo: string,
    
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
    
    deletedAt: { type: Date, default: null }
})

 ProfileSchema.plugin(mongoosePaginate)

 
 const ProfileModel = mongoose.model<IProfileDocument, mongoose.PaginateModel<IProfileDocument>>('Profile', ProfileSchema);
 export default ProfileModel