import  Chat  from "./Chat";

export interface IChatReposiory{
    create:(chat:Chat)=>Promise<Chat|null>
    getMany(userId:string, page:number, limit:number):Promise<Chat|null>
    countChatsByUser(user:string):Promise<number>
}