import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";

export class GetUserByIDDTO {

    @IsString()
    @IsNotEmpty()
    id:string
}