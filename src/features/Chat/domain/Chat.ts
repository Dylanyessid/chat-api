export class Chat{

    private constructor(public participants: string[], public createdAt:Date){

    }

    create(participants:string[], createdAt:Date){
        if(!participants) return null
        return new Chat(participants,createdAt)
    }

    private validateParticipants(participants:string[]){
        return participants.length > 0
    }
}