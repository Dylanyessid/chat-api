
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
            return new User(userModel.username, userModel.email, userModel.password);
        } catch (error) {
            return null
        }
    }
  
    async getOne(email: string) {
        try {
            const user = await UserModel.findOne({email:email, deletedAt: null})
            if(!user) return null
            return new User(user.username, user.email, user.password)
        }
        catch (error) {
            return null
        }
    }

    async getMany() {
        try {
            const users = await UserModel.find({deletedAt: null}).lean()
            if(!users) return null
            return users.map((user:IUserDocument)=> new User(user.username, user.email, user.password))
        }
        catch (error) {
            return null
        }
    }

    async update (email: string, user: User) {
        try {
            const updatedUser = await UserModel.findOneAndUpdate({email:email, deletedAt: null}, {username: user.username, email: user.getEmail(), password: user.password}, {new: true})
            if(!updatedUser) return null
            return new User(updatedUser.username, updatedUser.email) //  updatedUser
        } catch (error) {
            return null
        }
    }

    async delete(email: string) {
        try {
            const deletedUser = await UserModel.findOne({email:email, deletedAt: null})
            if(!deletedUser) return null
            deletedUser.deletedAt = new Date()
            await deletedUser?.save()
            return new User(deletedUser.username, deletedUser.email)
        } catch (error) {
            return null
        }
    }
}