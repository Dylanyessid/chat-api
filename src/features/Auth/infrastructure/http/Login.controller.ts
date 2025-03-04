import { Request, Response } from "express";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import { IUserRepository } from "../../../Users/domain/IUserRepository";
import LoginUseCase from "../../application/LoginUseCase";

class AuthController {

    constructor(private loginUseCase:LoginUseCase, private apiResponseFormatter:IApiResponseFormatter){}

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

export default AuthController