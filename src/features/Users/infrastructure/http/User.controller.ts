import { NextFunction, Request, Response } from "express";
import { User } from "../../domain/User";
import { IUserRepository } from "../../domain/IUserRepository";
import { RegisterUseCase } from "../../../Auth/application/RegisterUserUseCase";
import { ApiResponseFormatter } from './../../../../infrastructure/formatters/ApiResponseFormatter';
import { CreateUserDTO } from "../../../Auth/infrastructure/dto/CreateUserDTO";
import { GetUserByCriteriaUseCase } from "../../application/GetUserByCriteriaUseCase";

export class UserController{


    constructor(
         private getUserByCriteriaUserCase:GetUserByCriteriaUseCase, 
         private apiResponseFormatter: ApiResponseFormatter
        ) {
    }

    
    

    async getOne(req: Request, res: Response, next:NextFunction){
        const {id}= req.params 
        const user = await this.getUserByCriteriaUserCase.execute({_id:id})
        if(!user){
            const response = this.apiResponseFormatter.error('Not found', 404)
            res.status(404).json(response)
            return
        }
        const response = this.apiResponseFormatter.success(user, '', 200)
        res.status(200).json(response)
        return
    }
}