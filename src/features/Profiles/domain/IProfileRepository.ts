import { Profile } from "./Profile"


export interface IProfileRepository {
    create(profile:Profile): Promise<Profile | null>
    getOne(id:string):Promise<null | Profile>
    getAll:()=>Promise<null | Profile[]>
    update:(id:string, profile:Profile)=>Promise<null | Profile>
    delete:(id:string)=>Promise<null | Profile>
}