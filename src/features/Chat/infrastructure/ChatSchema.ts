import mongoose, { Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

interface IChatSchema extends mongoose.Document{
    participants: string[],
    createdAt: Date | null
}

const ChatSchema = new Schema<IChatSchema>({
    participants:[
        {
            type: String,
            required: true
        },
    ],
    createdAt: { type: Date, default: Date.now() }
})

ChatSchema.plugin(mongoosePaginate)

const ChatModel = mongoose.model<IChatSchema, mongoose.PaginateModel<IChatSchema>>('Chat', ChatSchema);
export default ChatModel