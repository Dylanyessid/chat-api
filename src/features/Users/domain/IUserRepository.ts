import { User } from "./User"


export interface IUserRepository {
    create(user:User): Promise<User | null>
    getOne(email:string):Promise<null | User>
    getMany:()=>Promise<null | User[]>
    update:(email:string, user:User)=>Promise<null | User>
    delete:(email:string)=>Promise<null | User>
}