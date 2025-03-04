import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class LoginDTO {

    @IsString()
    @IsNotEmpty()
    email:string

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password:string
}