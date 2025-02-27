export class User {
    constructor(public username:string, private email: string, public password?: string) {
        this.email = email;
        this.password = password;
        this.username = username;
    }

    getEmail() {
        return this.email;
    }

    setEmail(email: string) {
        if(email.includes('@')) {
            this.email = email;
        }
    }

}