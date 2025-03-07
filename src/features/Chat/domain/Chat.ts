import Message from "../../Messages/domain/Message"
import { Profile } from "../../Profiles/domain/Profile"
import { User } from "../../Users/domain/User"

class Chat{

    private constructor( public participants: string[] | User[], public id?:string){

    }

    
    static create(participants:string[]| User[]){
        if(!this.validateParticipants(participants)) return null
        return new Chat(participants)
    }

    static createWithId(id:string,participants:string[]| User[]){
        if(!this.validateParticipants(participants)) return null
        return new Chat(participants, id)
    }

    private static validateParticipants(participants:string[] | User[]){
        return participants.length > 0
    }
}

export default Chat