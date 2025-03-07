import mongoose from "mongoose";
import  Chat  from "../domain/Chat";
import { IChatReposiory } from "../domain/IChatRepository";
import ChatModel from './ChatSchema';
import MessageModel from "../../Messages/infrastructure/MessageSchema";

class ChatRepository implements IChatReposiory {
    
    async create(chat:Chat) {
        try {
            const chatModel = new ChatModel()
            chatModel.participants = chat.participants
            await chatModel.save()
            return chat
        } catch (error) {
            return null
        }
    }

    async getMany(userId:string, page:number, limit:number): Promise<Chat | null> {
        try {
            const skip = (page - 1) * limit
            const options = {
                page,
                limit,
                sort: { createdAt: -1 }, 
                populate: {
                    path: "sender",
                    select: "fullName" 
                },
                lean: true 
            };

            const chats = await ChatModel.aggregate([
                {
                  $lookup: {
                    from: "messages",
                    let: { chatId: "$_id" },
                    pipeline: [
                      { $match: { $expr: { $eq: ["$chat", "$$chatId"] } } },
                      { $sort: { createdAt: -1 } },  // Ordenar por fecha descendente
                      { $limit: 1 }  // Solo el último mensaje
                    ],
                    as: "lastMessage"
                  }
                },
                {
                  $addFields: {
                    lastMessage: { $arrayElemAt: ["$lastMessage", 0] }  // Convertir array en objeto
                  }
                },
                { $sort: { "lastMessage.createdAt": -1 } },  // Ordenar los chats por el último mensaje
                { $skip: skip },  // Reemplazar con la paginación que necesites
                { $limit: limit }  // Reemplazar con el tamaño de página que necesites
              ])
            
            if(!chats) return null
            return chats as any
        } catch (error) {
            return null
        }
    }

    async countChatsByUser(user:string){
        try {
            const count = await ChatModel.countDocuments({participants:user})
            return count
        } catch (error) {
            return 0
        }
    }
}

export default ChatRepository