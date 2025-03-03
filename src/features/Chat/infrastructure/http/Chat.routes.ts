import { Router } from "express";
import { validateDTO } from "../../../../infrastructure/middlewares/validateDTO";
import { CreateChatDTO } from "../dto/CreateChatDTO";
import { container } from "../../../../infrastructure/di/container";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import ChatController from "./Chat.controller";

const chatRouter = Router()
const formatter = container.resolve<IApiResponseFormatter>('ApiResponseFormatter')
const chatController = container.resolve<ChatController>('ChatController')

chatRouter.post(
    '/', 
    validateDTO(CreateChatDTO, "body", formatter),
    chatController.createChat.bind(chatController)
)

export {chatRouter}