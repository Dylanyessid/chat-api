
import mongoose from "mongoose";
import { IProfileRepository } from "../domain/IProfileRepository";
import { Profile } from "../domain/Profile";
import { CreateProfileDTO } from "./dto/CreateProfileDTO";
import ProfileModel from "./ProfileSchema";

export class ProfileRepository implements IProfileRepository{

    async create(profile: Profile) {
        
        try {
            const profileModel = new ProfileModel() 
            profileModel.bio = profile.bio
            profileModel.fullName = profile.fullName
            profileModel.photo = profile.photo
           
            const profileSaved = await profileModel.save()
            return {profile, id:profileSaved._id.toString()}
        } catch (error) {
            return null
        }
    }

  
    async getMany (page:number=1, limit:number=10) {
        const options = {
            page,
            limit
        }
        try {
            const profiles = await ProfileModel.paginate({}, options)
            
            return profiles.docs.map((profile) => Profile.create( profile.fullName, profile.photo, profile.bio))
        } catch (error) {
            return null
        }
    };
    async getOne(id: string)  {
        try {
            const profile = await ProfileModel.findById(id)
            if(!profile) return null
            return Profile.create( profile.fullName, profile.photo, profile.bio)
        } catch (error) {
            return null
        }
    }

    async updatePartialy(id:string, data:Partial<Profile>){
        try {
           const profile = await ProfileModel.findByIdAndUpdate(id,data, {new:true}).lean()
           if(!profile) null
           return Profile.create( profile.fullName, profile.photo, profile.photo)
        } catch (error) {
            return null
        }
    }

    update: (id: string, profile: Profile) => Promise<null | Profile>;
    delete: (id: string) => Promise<null | Profile>;
}