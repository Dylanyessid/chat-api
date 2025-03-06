
import { populate } from 'dotenv';
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

    async linkProfile(user:string, profile:string){  
        try {
            await UserModel.findByIdAndUpdate(user, {profile})
            return true
        } catch (error) {
            return false
        }
    }

    async getMany(page: number, limit: number){
        try {
            const skip = (page - 1) * limit
            const options = {
                page,
                limit,
                populate:""
            }
            const userWithProfile = await UserModel.paginate({deletedAt:null},options)
            return userWithProfile.docs
        } catch (error) {
            return null
        }
    }

    async countUsers(){
        try {
            const count =  await UserModel.countDocuments({deletedAt:null})
           return count
        } catch (error) {
            return 0
        }
    }

    async count(ids: string[]){
        try {
            const count = await UserModel.countDocuments({_id:{ $in: ids }})
            return count
        } catch (error) {
            return null
        }
    }

   
    
}