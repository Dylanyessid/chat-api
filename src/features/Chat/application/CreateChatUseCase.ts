import { IUserRepository } from "../../Users/domain/IUserRepository";
import  Chat  from "../domain/Chat";
import { IChatReposiory } from "../domain/IChatRepository";
import { CreateChatDTO } from './../infrastructure/dto/CreateChatDTO';

class CreateChatUseCase {

    constructor(private chatRepository:IChatReposiory, private userRepository:IUserRepository){}

    async execute(createChatDTO:CreateChatDTO){
         try {
            const {participants} = createChatDTO
            if(!await this.validateAllUsersExisting(participants)) return null
            const chat = Chat.create(participants)
            await this.chatRepository.create(chat)
            return chat
         } catch (error) {
            return null
         }
    }

    private async validateAllUsersExisting(participants:string[]):Promise<boolean>{
      const count = await this.userRepository.count(participants)
      if(!count) false
      return count === participants.length
    }
}

export default CreateChatUseCase