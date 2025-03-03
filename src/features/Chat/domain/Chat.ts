export class Chat{

    private constructor(public participants: string[]){

    }

    create(participants:string[]){
        if(!participants) return null
        return new Chat(participants)
    }

    private validateParticipants(participants:string[]){
        return participants.length > 0
    }
}