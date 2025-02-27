import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateDTOValidator{
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(8)
    password: string;

    @IsString()
    @IsNotEmpty()
    username: string;
}