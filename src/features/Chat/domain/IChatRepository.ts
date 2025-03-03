import  Chat  from "./Chat";

export interface IChatReposiory{
    create:(chat:Chat)=>Promise<Chat|null>
}