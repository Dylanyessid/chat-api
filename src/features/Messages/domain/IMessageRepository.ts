import Message from "./Message";

export interface IMessageRepository {
    create(message:Message): Promise<Message | null>
    getMessages(page:number, limit:number,  chat:string) :Promise<Message[] | null>
    delete(id:string): Promise<Message | null>
    countChatMessaes(chat:string): Promise<number | null>
}