
import ChatRepository from './../infrastructure/ChatRepository';
class GetChatsInfoUseCase {


    constructor(private chatRepository:ChatRepository){}

    async execute(chats:string[]){
        return this.chatRepository.getChatsInfo(chats)
    }
}

export default GetChatsInfoUseCase