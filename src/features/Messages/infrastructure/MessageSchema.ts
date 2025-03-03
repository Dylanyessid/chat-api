import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

interface IMessageSchema extends mongoose.Document{
    type: string,
    content: string,
    createdAt: Date | null
}

const MessageSchema = new Schema<IMessageSchema>({
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