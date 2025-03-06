import { Request, Response } from "express";
import CreateMessageUseCase from "../../application/CreateMessageUseCase";
import { ApiResponseFormatter } from './../../../../infrastructure/formatters/ApiResponseFormatter';
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import GetMessagesUseCase from "../../application/GetMessagesUseCase";
import { formatPaginatedData } from "../../../../infrastructure/formatters/PaginationResponseFormatter";

class MessageController {

    constructor(
        private createMessageUseCase: CreateMessageUseCase,
        private getMessagesUseCase:GetMessagesUseCase,
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

    async getMessages(req:Request, res:Response){

      const {chat, limit="30", page="1"} = req.query

      const {count,messages} = await this.getMessagesUseCase.execute(Number(page), Number(limit), chat.toString())
      if (!messages.length) {
       const response = this.apiResponseFormatter.error("Invalid chat message", 404);
       res.status(500).json(response);
       return;
     }
     const response = formatPaginatedData({
      data:messages,
      limit,
      page,
      status:200,
      total:count
     })
     
     res.status(200).json(response);
     return;
    }
}

export default MessageController