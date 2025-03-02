export class Profile {
   
    private constructor( public user:string,  public fullName:string,  public photo?:string, public bio?:string){
    
    }


    static create(user:string,  fullName:string,  photo?:string, bio?:string){

        if(!user) return null
        if(!fullName) return null
        
        return new Profile(user, fullName, photo, bio)
    }


}