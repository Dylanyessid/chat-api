import { Profile } from "../../Profiles/domain/Profile";
import { User } from "./User";

class UserWithProfile {


    private constructor(public user:User, public profile:Profile){}

    static create(user:User, profile:Profile){
        return new UserWithProfile(user,profile)
    }

}