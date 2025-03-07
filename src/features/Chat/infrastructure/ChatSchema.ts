import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"
import { IMessageDocument } from "../../Messages/infrastructure/MessageSchema";
import { IUserDocument } from "../../Users/infrastructure/UserSchema";

interface IChatDocument extends mongoose.Document{
    participants: mongoose.Types.ObjectId[] | IUserDocument[]
    lastMessage: mongoose.Types.ObjectId | IMessageDocument
    createdAt: Date | null
}

const ChatSchema = new Schema<IChatDocument>({
    participants:[
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref:'User'
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