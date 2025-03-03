import Message from "./Message";

export interface IMessageRepository {
    create(message:Message): Promise<Message | null>
    delete(id:string): Promise<Message | null>
}