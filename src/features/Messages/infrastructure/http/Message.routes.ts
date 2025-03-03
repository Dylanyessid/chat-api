import { Router } from "express";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import { container } from "../../../../infrastructure/di/container";
import MessageController from "./Message.controller";
import { validateDTO } from "../../../../infrastructure/middlewares/validateDTO";
import { CreateMessageDTO } from "../dto/CreateMessageDTO";

const messageRouter = Router()

const formatter = container.resolve<IApiResponseFormatter>('ApiResponseFormatter')
const messageController = container.resolve<MessageController>("MessageController")

messageRouter.post('/', validateDTO(CreateMessageDTO, "body", formatter), messageController.create.bind(messageController))

export {messageRouter}