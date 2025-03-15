
import { User } from '../../Users/domain/User';
import Chat from '../domain/Chat';
import ChatRepository from './../infrastructure/ChatRepository';
class GetChatsInfoUseCase {


    constructor(private chatRepository:ChatRepository){}

    async execute(chats:string[], user:string){
        const chatsInfo = await this.chatRepository.getChatsInfo(chats)
        console.log()
        return chatsInfo.map((chat:Chat)=> {
            const participants = chat.participants as User[]
            return {
                ...chat,
                participants: participants.filter(p => p.id !== user)
            }
        } )
    }
}

export default GetChatsInfoUseCase