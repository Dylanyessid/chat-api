import { Request, Response } from "express";
import CreateMessageUseCase from "../../application/CreateMessageUseCase";
import { ApiResponseFormatter } from './../../../../infrastructure/formatters/ApiResponseFormatter';
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";

class MessageController {

    constructor(
        private createMessageUseCase: CreateMessageUseCase,
        private apiResponseFormatter:IApiResponseFormatter
     ){}

    async create(req:Request, res:Response){
       const result = await this.createMessageUseCase.execute(req.body)
       if (!result) {
        const response = this.apiResponseFormatter.error("Invalid chat message", 404);
        res.status(500).json(response);
        return;
      }
      const response = this.apiResponseFormatter.success(
        result,
        "Chat created successfully",
        200
      );
      res.status(200).json(response);
      return;
    }
}

export default MessageController