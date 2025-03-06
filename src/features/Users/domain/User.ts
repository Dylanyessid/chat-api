


export class User {
    private constructor(public username:string, private email: string, public password?: string, public profile?:String) {}

    private static validateEmail(email:string):boolean{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static create(username:string, email: string, password?: string, profile?:string):User | null{
        
        if(!this.validateEmail(email)){
            throw new Error('Invalid email')
        }
        return (new User(username,email,password, profile)) // 

    }

    getEmail(){
        return this.email
    }

   
   

}