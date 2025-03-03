class Message{

    private constructor(public type:string, public content:string, public createdAt:Date){

    }

    create(type:string,  content:string,  createdAt:Date){
        return new Message(type, content, createdAt)
    }
}

export default Message