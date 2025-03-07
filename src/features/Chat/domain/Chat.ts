import Message from "../../Messages/domain/Message"

class Chat{

    private constructor(public participants: string[], public lastMessage?:Message){

    }

    static create(participants:string[], lastMessage?:Message){
        if(!this.validateParticipants(participants)) return null
        return new Chat(participants, lastMessage)
    }

    private static validateParticipants(participants:string[]){
        return participants.length > 0
    }
}

export default Chat