import { IMessageRepository } from "../domain/IMessageRepository";

class GetMessagesUseCase {

    constructor(private messagesRepository: IMessageRepository){}
    
    async execute(page:number, limit:number, chat:string){

        const count = await this.messagesRepository.countChatMessaes(chat)
        const messages = await this.messagesRepository.getMessages(page, limit, chat)
        return {messages, count}
     
    }
}

export default GetMessagesUseCase