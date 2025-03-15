// Message class to represent a chat message
class Message{

    private constructor(public chat:string, public sender:string, public type:string,  public content:string, public createdAt?:Date, public id?:string){

    }

    // Factory method to create a new message
    static create(chat:string, sender:string ,type:string, content:string,  createdAt?:Date){
        return new Message(chat, sender, type, content, createdAt)
    }

    // Factory method to create a new message with an ID
    static createWithId(id:string, chat:string,sender:string ,type:string, content:string,  createdAt?:Date){
        return new Message(chat, sender, type, content, createdAt, id)
    }
    
}

export default Message