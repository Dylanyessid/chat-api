import mongoose from "mongoose";
import  Chat  from "../domain/Chat";
import { IChatReposiory } from "../domain/IChatRepository";
import ChatModel from './ChatSchema';
import MessageModel from "../../Messages/infrastructure/MessageSchema";
import { User } from "../../Users/domain/User";
import { IUserDocument } from "../../Users/infrastructure/UserSchema";
import { IProfileDocument } from "../../Profiles/infrastructure/ProfileSchema";
import { Profile } from "../../Profiles/domain/Profile";

class ChatRepository implements IChatReposiory {
    
    async create(chat:Chat) {
        try {
            const chatModel = new ChatModel()
            const participants = chat.participants.map((id)=> new mongoose.Types.ObjectId(id))
            chatModel.participants = participants
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

    async getChatsInfo(chats:string[]){
        try {
            //const ids = chats.map((id)=>new mongoose.Types.ObjectId(id))
            const chatDocuments = await ChatModel.find({_id: {$in: chats}}).populate(
                {path: "participants",
                    populate: {
                      path: "profile",
                    }}
            ).lean()
            
            
            return chatDocuments.map((chat)=>{
                const participants = chat.participants as IUserDocument[]
                const usersConverted  = participants.map((user)=>{
                    const {username, fullName, photo} = user.profile as IProfileDocument
                    const userProfile = Profile.create(username, fullName,photo )
                    return User.create(user.email, "", userProfile)
                })
               
               return Chat.createWithId( chat._id.toString(),usersConverted)
            })
        } catch (error) {
            return null
        }
    }
}

export default ChatRepository