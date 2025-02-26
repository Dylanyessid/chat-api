import { Request, Response } from "express";
import { IUser } from "../types/IUser";
import { IUserRepository } from "../types/IUserRepository";

export class UserController{

    private readonly _userRepository: IUserRepository;
    constructor(userRepository: IUserRepository) {
        this._userRepository = userRepository;

    }

    async create(req: Request, res: Response) {
        const user = await this._userRepository.create(req.body as IUser)
        if(!user) {
             res.status(400).json({message: 'Error creating user'})
             return
        }
         res.status(201).json(user)
         return
    }
    
}