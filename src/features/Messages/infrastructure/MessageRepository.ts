import mongoose from "mongoose";
import { IMessageRepository } from "../domain/IMessageRepository";
import Message from "../domain/Message";
import MessageModel from "./MessageSchema";

class MessageRepository implements IMessageRepository{

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