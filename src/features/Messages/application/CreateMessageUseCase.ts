import { IMessageRepository } from "../domain/IMessageRepository";
import Message from "../domain/Message";
import { CreateMessageDTO } from "../infrastructure/dto/CreateMessageDTO";

class CreateMessageUseCase {

    constructor(private messageRepository: IMessageRepository){}

    async execute(createMessageDTO: CreateMessageDTO){
        const { chat, content, sender , type} = createMessageDTO
        const newMessage = Message.create(chat, sender, type, content)
        const result = await this.messageRepository.create(newMessage)
        return result
    }

}

export default CreateMessageUseCase