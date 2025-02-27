export class Profile {
   
    constructor( private user:string, private fullName:string, private photo:string,private bio:string){
        this.user = user
        this.fullName = fullName
        this.photo = photo
        this.bio = bio
    }

    getUser(){
        return this.user
    }
    getFullName(){
        return this.fullName
    }
    setFullName(fullName:string){
        this.fullName = fullName
    }
    getPhoto(){
        return this.photo
    }
    setPhoto(photo:string){
        this.photo = photo
    }
    getBio(){
        return this.bio
    }
    setBio(bio:string){
        this.bio = bio
    }

}