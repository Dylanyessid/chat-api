import { Request, Response } from "express";
import { IUser } from "../types/IUser";
import { IUserRepository } from "../types/IUserRepository";
import { RegisterUseCase } from "../application/RegisterUserUseCase";

export class UserController{

    private readonly _registerUseCase: RegisterUseCase;
    constructor(registerUseCase: RegisterUseCase) {
        this._registerUseCase = registerUseCase;

    }

    async create(req: Request, res: Response) {
        const user = await this._registerUseCase.execute(req.body as IUser)
        if(!user) {
             res.status(400).json({message: 'Error creating user'})
             return
        }
         res.status(201).json(user)
         return
    }
    
}