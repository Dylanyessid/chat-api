class Chat{

    private constructor(public participants: string[]){

    }

    static create(participants:string[]){
        if(!participants) return null
        return new Chat(participants)
    }

    private validateParticipants(participants:string[]){
        return participants.length > 0
    }
}

export default Chat