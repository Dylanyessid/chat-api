import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import { IMessageDocument } from "../../Messages/infrastructure/MessageSchema";

interface IChatDocument extends mongoose.Document{
    participants: string[]
    lastMessage: mongoose.Types.ObjectId | IMessageDocument
    createdAt: Date | null
}

const ChatSchema = new Schema<IChatDocument>({
    participants:[
        {
            type: String,
            required: true
        },
    ],
    lastMessage:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Message'
    },
    createdAt: { type: Date, default: Date.now() }
})

ChatSchema.plugin(mongoosePaginate)

const ChatModel = mongoose.model<IChatDocument, mongoose.PaginateModel<IChatDocument>>('Chat', ChatSchema);
export default ChatModel