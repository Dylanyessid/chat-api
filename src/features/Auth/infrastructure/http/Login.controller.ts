import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import { IUserRepository } from "../../../Users/domain/IUserRepository";
import LoginUseCase from "../../application/LoginUseCase";

class AuthController {

    constructor(loginUseCase:LoginUseCase, apiResponseFormatter:IApiResponseFormatter){}

    async login(req:Request, res:Response){
        
    }
}