import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

interface IMessageSchema extends mongoose.Document{
    chat:mongoose.Schema.Types.ObjectId
    sender:mongoose.Schema.Types.ObjectId
    type: string,
    content: string,
    createdAt: Date | null
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
    createdAt: { type: Date, default: Date.now() }
})

MessageSchema.plugin(mongoosePaginate)

const MessageModel = mongoose.model<IMessageSchema, mongoose.PaginateModel<IMessageSchema>>('Message', MessageSchema);
export default MessageModel