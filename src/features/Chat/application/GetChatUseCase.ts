import { IChatReposiory } from "../domain/IChatRepository";

class GetChatsUseCase {

    constructor(private chatRepository:IChatReposiory) {}

    async execute(user:string, page:number, limit:number, ) {
        
       const chats = await this.chatRepository.getMany(user, page, limit)
       const count = await this.chatRepository.countChatsByUser(user)
       return {chats, count}
    }
}

export default GetChatsUseCase