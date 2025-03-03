class Message{

    private constructor(public chat:string, public sender:string, public type:string,  public content:string, public createdAt?:Date){

    }

    create(chat:string, sender:string ,type:string, content:string,  createdAt?:Date){
        return new Message(chat, sender, type, content, createdAt)
    }
}

export default Message