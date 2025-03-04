import { IsInt, IsNotEmpty, IsNumberString, IsString, Max, Min } from "class-validator";

export class GetMessagesDTO {

   
    @IsNumberString()
    page:number

  
    @IsNumberString()
    limit:number

    @IsString()
    @IsNotEmpty()
    chat:string
}