import { IProfileRepository } from "../domain/IProfileRepository";
import { Profile } from "../domain/Profile";

class UpdateProfileDataUseCase {

    constructor(private profileRepository: IProfileRepository){}

    async execute(id:string, data: Partial<Profile>){
        try {
            const updatedProfile = await this.profileRepository.updatePartialy(id,data)
            return updatedProfile
        } catch (error) {
            return null
        }
    }
}

export default UpdateProfileDataUseCase