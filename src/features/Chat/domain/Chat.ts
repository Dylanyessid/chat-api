class Chat{

    private constructor(public participants: string[]){

    }

    static create(participants:string[]){
        if(!this.validateParticipants(participants)) return null
        return new Chat(participants)
    }

    private static validateParticipants(participants:string[]){
        return participants.length > 0
    }
}

export default Chat