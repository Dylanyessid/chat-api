import { NextFunction, Request, Response } from "express";
import { User } from "../../domain/User";
import { IUserRepository } from "../../domain/IUserRepository";
import { RegisterUseCase } from "../../application/RegisterUserUseCase";
import { ApiResponseFormatter } from './../../../../infrastructure/formatters/ApiResponseFormatter';
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { GetUserByCriteriaUseCase } from "../../application/GetUserByCriteriaUseCase";

export class UserController{


    constructor(
         private registerUseCase: RegisterUseCase,
         private getUserByCriteriaUserCase:GetUserByCriteriaUseCase, 
         private apiResponseFormatter: ApiResponseFormatter
        ) {
    }

    async create(req: Request, res: Response, next:NextFunction) {
        
        const createdUser = await this.registerUseCase.execute(req.body as CreateUserDTO)
        if(!createdUser) {
             const response = this.apiResponseFormatter.error('Invalid data for register a user', 400)
             res.status(400).json(response)
             return  
        }

        const response = this.apiResponseFormatter.success(createdUser, 'User created successfully', 201)
        res.status(201).json(response)
        return 
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