import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

interface IMessageSchema extends mongoose.Document{
    chat:mongoose.Types.ObjectId
    sender:mongoose.Types.ObjectId
    type: string,
    content: string,
    createdAt: Date | null
    deletedAt: Date | null
}

const MessageSchema = new Schema<IMessageSchema>({
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Chat'
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    type:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
        
    },
    createdAt: { type: Date, default: Date.now() },
    deletedAt: { type: Date, default: null }
})

MessageSchema.plugin(mongoosePaginate)

const MessageModel = mongoose.model<IMessageSchema, mongoose.PaginateModel<IMessageSchema>>('Message', MessageSchema);
export default MessageModel