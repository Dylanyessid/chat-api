
import { IUserRepository } from '../domain/IUserRepository';
import { User } from '../domain/User';
import UserModel, { IUserDocument } from './UserSchema';
export class UserRepository implements IUserRepository{



    async create(user: User) {
        try {
            const userModel = new UserModel()
            userModel.username = user.username
            userModel.email = user.getEmail()
            userModel.password = user.password!
            await userModel.save()
            return user
        } catch (error:any) {
            return null
        }
    }
  
    async getOne(criteria: object) {
        try {
            const existingUser = await UserModel.findOne({...criteria, deletedAt: null})
            if(!existingUser) return null
            const {username, email,password} = existingUser
            const validatedUser = User.create(username, email, password)
            return validatedUser
        }
        catch (error) {
            return null
        }
    }

   
    
}