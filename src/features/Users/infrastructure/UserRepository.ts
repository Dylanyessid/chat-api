
import { User } from '../domain/User';
import { IUser } from '../types/IUser';
import { IUserRepository } from './../types/IUserRepository';
import UserModel from './UserSchema';
export class UserRepository implements IUserRepository{



    async create(user: User) {

        try {
            const userModel = new UserModel()
            userModel.name = user.name
            userModel.email = user.email
            userModel.password = user.password
            await userModel.save()
            return userModel;
        } catch (error) {
            return null
        }
    }
  
    async getOne(email: string) {
        try {
            const user = await UserModel.findOne({email:email, deletedAt: null})
            return user
        }
        catch (error) {
            return null
        }
    }

    async getAll() {
        try {
            const users = await UserModel.find({deletedAt: null})
            return users
        }
        catch (error) {
            return null
        }
    }

    async update (email: string, user: User) {
        try {
            const updatedUser = await UserModel.findOneAndUpdate({email:email, deletedAt: null}, user)
            return updatedUser
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
            return deletedUser
        } catch (error) {
            return null
        }
    }
}