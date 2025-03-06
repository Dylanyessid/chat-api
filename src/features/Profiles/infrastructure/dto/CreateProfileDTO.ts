import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateProfileDTO {


    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    fullName:string

    @IsString()
    @IsNotEmpty()
    user:string

    @IsString()
    @IsOptional()
    bio:string

    @IsString()
    @IsOptional()
    photo:string
}