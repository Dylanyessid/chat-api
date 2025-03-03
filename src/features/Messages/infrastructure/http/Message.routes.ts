import { Router } from "express";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import { container } from "../../../../infrastructure/di/container";
import MessageController from "./Message.controller";

const messageRouter = Router()

const formatter = container.resolve<IApiResponseFormatter>('ApiResponseFormatter')
const profileController = container.resolve<MessageController>("MessageController")

messageRouter.post('/')

export {messageRouter}