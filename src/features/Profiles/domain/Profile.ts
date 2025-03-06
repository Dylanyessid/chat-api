export class Profile {
   
    private constructor(   public fullName:string,  public photo?:string, public bio?:string){
    
    }


    static create(  fullName:string,  photo?:string, bio?:string){

        if(!fullName) return null
        
        return new Profile( fullName, photo, bio)
    }


}