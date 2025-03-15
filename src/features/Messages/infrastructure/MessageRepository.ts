import mongoose from "mongoose";
import { IMessageRepository } from "../domain/IMessageRepository";
import Message from "../domain/Message";
import MessageModel from "./MessageSchema";

// MessageRepository class to handle database operations for messages
class MessageRepository implements IMessageRepository{

    // Create a new message in the database
    async create(message: Message): Promise<Message | null> {
        try {
            const newMessage = new MessageModel()
            newMessage.sender =  new mongoose.Types.ObjectId(message.sender) 
            newMessage.type = message.type
            newMessage.content = message.content
            newMessage.chat = new mongoose.Types.ObjectId(message.chat)
            const messageSaved = await newMessage.save()
            message.createdAt = messageSaved.createdAt
            return message

        } catch (error) {
            return null
        }
    }

    // Count the total number of messages in a chat
    async countChatMessaes(chat:string){
        try {
            const total = await MessageModel.countDocuments({chat:new mongoose.Types.ObjectId(chat)})
            return total
        } catch (error) {
            return null
        }
       
    }

    // Get paginated messages from a chat
    async getMessages(page: number, limit: number, chat:string): Promise<Message[] | null> {
        try {
            const skip = (page - 1) * limit
            const messages = await MessageModel.find({
                chat: new mongoose.Types.ObjectId(chat)
            })
            .sort({ _id:-1 })
            .skip(skip)
            .limit(limit)
            .lean()
            .exec()

            return messages.map((message)=> Message.createWithId(message._id.toString() ,message.chat.toString(), message.sender.toString(), message.type, message.content, message.createdAt))

        } catch (error) {
            return null
        }
    }

    // Soft delete a message by setting the deletedAt timestamp
    async delete(id: string) {
        try {
            const message = await MessageModel.findByIdAndUpdate(id, {
                deletedAt: Date.now()
            })
            if(!message) return null
            return Message.create(message.chat.toString(), message.sender.toString(), message.type, message.content, message.createdAt )
        } catch (error) {
            return null
        }
    }
}

export default MessageRepository