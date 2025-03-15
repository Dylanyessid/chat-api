import { Request, Response } from "express";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import { IUserRepository } from "../../../Users/domain/IUserRepository";
import LoginUseCase from "../../application/LoginUseCase";
import { RegisterUseCase } from "../../application/RegisterUserUseCase";
import { CreateUserDTO } from "../dto/CreateUserDTO";

class AuthController {

    // Constructor to initialize use cases and response formatter
    constructor(private registerUseCase:RegisterUseCase ,private loginUseCase:LoginUseCase, private apiResponseFormatter:IApiResponseFormatter){}

    // Method to handle user registration
    async create(req: Request, res: Response) {
            
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

    // Method to handle user login
    async login(req:Request, res:Response){
        const result = await this.loginUseCase.execute(req.body)
       if (!result) {
        const response = this.apiResponseFormatter.error("Invalid credentials", 404);
        res.status(404).json(response);
        return;
      }
      const response = this.apiResponseFormatter.success(
        {token:result},
        "Welcome!",
        200
      );
      res.status(200).json(response);
      return;
    }
}

// Export the controller
export default AuthController