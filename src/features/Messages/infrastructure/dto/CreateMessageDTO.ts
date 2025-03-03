import { IsNotEmpty, IsString } from "class-validator";

export class CreateChatDTO {

    @IsString()
    @IsNotEmpty()
    chat:string

    @IsString()
    @IsNotEmpty()
    type:string

    @IsString()
    @IsNotEmpty()
    content:string
}