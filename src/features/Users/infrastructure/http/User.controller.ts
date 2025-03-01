import { NextFunction, Request, Response } from "express";
import { User } from "../../domain/User";
import { IUserRepository } from "../../domain/IUserRepository";
import { RegisterUseCase } from "../../application/RegisterUserUseCase";
import { ApiResponseFormatter } from './../../../../infrastructure/formatters/ApiResponseFormatter';
import { CreateUserDTO } from "../dto/CreateUserDTO";

export class UserController{

    private readonly _registerUseCase: RegisterUseCase;
    private readonly _apiResponseFormatter: ApiResponseFormatter;
    constructor(registerUseCase: RegisterUseCase, apiResponseFormatter: ApiResponseFormatter) {
        this._registerUseCase = registerUseCase;
        this._apiResponseFormatter = apiResponseFormatter;

    }

    async create(req: Request, res: Response, next:NextFunction) {
        
        const createdUser = await this._registerUseCase.execute(req.body as CreateUserDTO)
        if(!createdUser) {
             const response = this._apiResponseFormatter.error('Invalid data for register a user', 400)
             res.status(400).json(response)
             return  
        }

        const response = this._apiResponseFormatter.success(createdUser, 'User created successfully', 201)
        res.status(201).json(response)
        return 
    }
    
}