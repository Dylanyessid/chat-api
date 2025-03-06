
import { User } from "./User"


export interface IUserRepository {
    create(user:User): Promise<User |null>
    getOne(criteria:object):Promise<User |null>
    countUsers():Promise<number>
    linkProfile(user:string, profile:string): Promise<boolean>
    count(ids:string[]):Promise<null| number>
    getMany(page:number, limit:number) :Promise<User[] | null>
}