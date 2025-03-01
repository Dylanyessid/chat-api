
import { User } from "./User"


export interface IUserRepository {
    create(user:User): Promise<User |null>
    getOne(email:string):Promise<User |null>
    getMany:()=>Promise<User[] |null>
    update:(email:string, user:User)=>Promise<User |null>
    delete:(email:string)=>Promise<User |null>
}