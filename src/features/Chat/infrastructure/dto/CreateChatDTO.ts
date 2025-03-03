import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";

export class CreateChatDTO {

    @IsArray()
    @ArrayMinSize(1)
    @IsString({each:true})
    participants:string[]
}