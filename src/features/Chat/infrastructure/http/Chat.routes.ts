import { Router } from "express";
import { validateDTO } from "../../../../infrastructure/middlewares/validateDTO";
import { CreateChatDTO } from "../dto/CreateChatDTO";
import { container } from "../../../../infrastructure/di/container";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import ChatController from "./Chat.controller";
import { authMiddleware } from "../../../../infrastructure/middlewares/jwtValidatorMiddleare";

// Initialize the router
const chatRouter = Router()
const formatter = container.resolve<IApiResponseFormatter>('ApiResponseFormatter')
const chatController = container.resolve<ChatController>('ChatController')

// Define routes for chat operations
chatRouter.post(
    '/', 
    validateDTO(CreateChatDTO, "body", formatter),
    chatController.createChat.bind(chatController)
)

chatRouter.get('/', authMiddleware,chatController.getChats.bind(chatController))

chatRouter.get('/info',  authMiddleware ,chatController.getChatInfo.bind(chatController))

export {chatRouter}