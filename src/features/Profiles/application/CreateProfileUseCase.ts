import { uploadImageToCloudinary } from "../../../infrastructure/cloudinary/uploader";
import { IProfileRepository } from "../domain/IProfileRepository";
import { Profile } from "../domain/Profile";
import { CreateProfileDTO } from "../infrastructure/dto/CreateProfileDTO";

class CreateProfileUseCase {

    constructor(private profileRepository:IProfileRepository){

    }

    async execute(createProfileDto:CreateProfileDTO){

        try {
           
            const {bio,fullName,photo,user} = createProfileDto
            const profile = await this.profileRepository.create(Profile.create(user,fullName,photo,bio))
            if(!profile) return null
            return profile
           
        } catch (error) {
            return null
        }
  

    }
}

export default CreateProfileUseCase