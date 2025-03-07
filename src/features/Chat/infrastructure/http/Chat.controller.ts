import { Request, Response } from "express";
import CreateChatUseCase from "../../application/CreateChatUseCase";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import GetChatsUseCase from "../../application/GetChatUseCase";
import { formatPaginatedData } from "../../../../infrastructure/formatters/PaginationResponseFormatter";

class ChatController {

    constructor(
      private createChatUseCase:CreateChatUseCase, 
      private getChatsUseCase:GetChatsUseCase,
      private apiResponseFormatter:IApiResponseFormatter ){}

    async createChat(req:Request, res:Response){
       const result = await this.createChatUseCase.execute(req.body)
       if (!result) {
        const response = this.apiResponseFormatter.error("Invalid user(s)", 404);
        res.status(404).json(response);
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

    async getChats(req:Request, res:Response){
      const {page, limit, user} = req.query
      const {chats,count} = await this.getChatsUseCase.execute(user.toString(), Number(page), Number(limit))
      if (!count) {
        const response = this.apiResponseFormatter.error("Not found", 404);
        res.status(404).json(response);
        return;
      }
      /*const response = this.apiResponseFormatter.success(
        result,
        "Chat created successfully",
        200
      );*/

       const response = formatPaginatedData({
            data: chats,
            limit,
            page,
            status: 200,
            total: count,
          });
      res.status(200).json(response);
      return;
    }
}

export default ChatController