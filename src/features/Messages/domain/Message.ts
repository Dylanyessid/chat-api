class Message{

    private constructor(public sender:string,public type:string,  public content:string, public createdAt:Date){

    }

    create(type:string, sender:string,  content:string,  createdAt:Date){
        return new Message(sender, type, content, createdAt)
    }
}

export default Message