import  Chat  from "../domain/Chat";
import { IChatReposiory } from "../domain/IChatRepository";
import ChatModel from './ChatSchema';

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
}

export default ChatRepository