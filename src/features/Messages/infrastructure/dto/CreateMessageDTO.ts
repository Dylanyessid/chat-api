import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDTO {

    @IsString()
    @IsNotEmpty()
    chat:string

    @IsString()
    @IsNotEmpty()
    type:string

    @IsString()
    @IsNotEmpty()
    sender:string

    @IsString()
    @IsNotEmpty()
    content:string
}