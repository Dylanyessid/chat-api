import { uploadImageToCloudinary } from "../../../infrastructure/cloudinary/uploader";
import { IProfileRepository } from "../domain/IProfileRepository";
import { Profile } from "../domain/Profile";
import { CreateProfileDTO } from "../infrastructure/dto/CreateProfileDTO";
import { UserRepository } from './../../Users/infrastructure/UserRepository';

class CreateProfileUseCase {

    constructor(private profileRepository:IProfileRepository, private userRepository:UserRepository){

    }

    async execute(createProfileDto:CreateProfileDTO){

        try {
           
            const {bio,fullName,photo,username, user} = createProfileDto
            const profile = await this.profileRepository.create(Profile.create(username, fullName,photo,bio))
            
            if(!profile.id) return null
            const result = await this.userRepository.linkProfile(user, profile.id)
            if(!result) return null
            return profile
           
        } catch (error) {
            return null
        }
  

    }
}

export default CreateProfileUseCase