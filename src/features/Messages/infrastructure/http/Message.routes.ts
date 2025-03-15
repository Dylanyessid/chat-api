import { Router } from "express";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import { container } from "../../../../infrastructure/di/container";
import MessageController from "./Message.controller";
import { validateDTO } from "../../../../infrastructure/middlewares/validateDTO";
import { CreateMessageDTO } from "../dto/CreateMessageDTO";
import { GetMessagesDTO } from "../dto/GetMessagesDTO";
import { authMiddleware } from "../../../../infrastructure/middlewares/jwtValidatorMiddleare";

// Initialize the router
const messageRouter = Router()

// Resolve dependencies from the container
const formatter = container.resolve<IApiResponseFormatter>('ApiResponseFormatter')
const messageController = container.resolve<MessageController>("MessageController")

// Define routes for message operations
messageRouter.post('/', validateDTO(CreateMessageDTO, "body", formatter), messageController.create.bind(messageController))

messageRouter.get('/', authMiddleware ,validateDTO(GetMessagesDTO, "query", formatter), messageController.getMessages.bind(messageController))

export {messageRouter}