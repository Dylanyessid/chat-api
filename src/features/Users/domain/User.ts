import { Profile } from "../../Profiles/domain/Profile";



export class User {
    private constructor(public username:string, private email: string, public password?: string, public profile?:Profile) {}

    private static validateEmail(email:string):boolean{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static create(username:string, email: string, password?: string, profile?:Profile):User | null{
        
        if(!this.validateEmail(email)){
            throw new Error('Invalid email')
        }
        return (new User(username,email,password, profile)) // 

    }

    getEmail(){
        return this.email
    }

   
   

}