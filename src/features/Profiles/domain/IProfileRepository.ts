import { CreateProfileDTO } from "../infrastructure/dto/CreateProfileDTO"
import { Profile } from "./Profile"


export interface IProfileRepository {
    create(profile:Profile): Promise<Profile | null>
    getOne(id:string):Promise<null | Profile>
    getMany:(page:number, limit:number)=>Promise<null | Profile[]>
    update:(id:string, profile:Profile)=>Promise<null | Profile>
    updatePartialy:(id:string, data: Partial<Profile>) => Promise<null | Profile>
    delete:(id:string)=>Promise<null | Profile>
}