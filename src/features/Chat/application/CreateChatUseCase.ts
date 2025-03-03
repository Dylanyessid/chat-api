import  Chat  from "../domain/Chat";
import { IChatReposiory } from "../domain/IChatRepository";
import { CreateChatDTO } from './../infrastructure/dto/CreateChatDTO';

class CreateChatUseCase {

    constructor(private chatRepository:IChatReposiory){}

    async execute(createChatDTO:CreateChatDTO){
         try {
            const {participants} = createChatDTO
            const chat = Chat.create(participants)
            await this.chatRepository.create(chat)
            return chat
         } catch (error) {
            return null
         }
    }
}

export default CreateChatUseCase