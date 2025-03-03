import { Request, Response } from "express";
import CreateChatUseCase from "../../application/CreateChatUseCase";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";

class ChatController {

    constructor(private createChatUseCase:CreateChatUseCase, private apiResponseFormatter:IApiResponseFormatter ){}

    async createChat(req:Request, res:Response){
       const result = await this.createChatUseCase.execute(req.body)
       if (!result) {
        const response = this.apiResponseFormatter.error("Error", 500);
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

export default ChatController