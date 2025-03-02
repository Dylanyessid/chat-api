
import { User } from "./User"


export interface IUserRepository {
    create(user:User): Promise<User |null>
    getOne(criteria:object):Promise<User |null>

}