import { IProfile } from "../domain/IProfile";
import { IProfileRepository } from "../domain/IProfileRepository";

export class ProfileRepository implements IProfileRepository{


    create(profile: IProfile): Promise<IProfile | null> {
        try {
            const profile = new Profile()

            return profile
        } catch (error) {
            
        }
    }
    
}