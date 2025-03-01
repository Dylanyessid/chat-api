
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
  
    async getOne(email: string) {
        try {
            const existingUser = await UserModel.findOne({email:email, deletedAt: null})
            if(!existingUser) return null
            const {username, password} = existingUser
            const validatedUser = User.create(username, email, password)
            return validatedUser
        }
        catch (error) {
            return null
        }
    }

    async getMany() {
        try {
            const users = await UserModel.find({deletedAt: null}).lean()
            if(!users) return null
            const convertedUsers = users.map((user:IUserDocument)=> {
                const {username,email,password} = user
                const validatedUser = User.create(username, email, password)
                return validatedUser
            }).filter((user)=> user !== null)
            return convertedUsers
        }
        catch (error) {
            return null
        }
    }

    async update (email: string, user: User) {
        try {
            const updatedUser = await UserModel.findOneAndUpdate({email:email, deletedAt: null}, {username: user.username, email: user.getEmail(), password: user.password}, {new: true})
            if(!updatedUser) return null
            const {username, password} = updatedUser
            const validatedUser = User.create(username, email, password)
            return validatedUser
           
        } catch (error) {
            return null
        }
    }

    async delete(email: string) {
        try {
            const deletedUser = await UserModel.findOne({email:email, deletedAt: null})
            if(!deletedUser) return null
            deletedUser.deletedAt = new Date()
            await deletedUser.save()
            const validatedUser = User.create(deletedUser.username, email, deletedUser.password)
            return validatedUser
        } catch (error) {
            return null
        }
    }
}