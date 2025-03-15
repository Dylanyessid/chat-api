import { Profile } from "../../Profiles/domain/Profile";



export class User {
    private constructor( private email: string, public password?: string, public profile?:Profile, public id?:string) {}

    private static validateEmail(email:string):boolean{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static create( email: string, password?: string, profile?:Profile):User | null{
        
        if(!this.validateEmail(email)){
            throw new Error('Invalid email')
        }
        return new User(email,password, profile)

    }
    static createWithId(id:string, email: string, password?: string, profile?:Profile):User | null{
        
        if(!this.validateEmail(email)){
            throw new Error('Invalid email')
        }
        return new User(email,password, profile, id)

    }
    getEmail(){
        return this.email
    }

   
   

}