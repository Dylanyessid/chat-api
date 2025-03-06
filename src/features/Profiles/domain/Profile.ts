export class Profile {
   
    private constructor( public username:string,  public fullName:string,  public photo?:string, public bio?:string){
    
    }


    static create( username:string, fullName:string,  photo?:string, bio?:string){

        if(!fullName) return null
        
        return new Profile( username, fullName, photo, bio)
    }


}