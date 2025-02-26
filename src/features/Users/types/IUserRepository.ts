import { User } from "../domain/User";
import UserModel from './../infrastructure/UserSchema';
import { IUser } from "./IUser";

export interface IUserRepository {
    create(user:User): Promise<IUser | null>
    getOne(email:string):Promise<null | IUser>
    getAll:()=>Promise<null | IUser[]>
    update:(email:string, user:User)=>Promise<null | IUser>
    delete:(email:string)=>Promise<null | IUser>
}