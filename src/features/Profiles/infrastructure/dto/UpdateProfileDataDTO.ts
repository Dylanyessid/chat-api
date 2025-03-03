import { IsNotEmpty, IsString } from "class-validator";

export class UpdateProfileDataDTO {


    @IsString()
    @IsNotEmpty()
    fullName:string

    @IsString()
    @IsNotEmpty()
    bio:string


}