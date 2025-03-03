import { Router } from "express";
import { validateDTO } from "../../../../infrastructure/middlewares/validateDTO";
import { CreateChatDTO } from "../dto/CreateChatDTO";
import { container } from "../../../../infrastructure/di/container";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";

const chatRouter = Router()
const formatter = container.resolve<IApiResponseFormatter>('ApiResponseFormatter')
chatRouter.post(
    '/', 
    validateDTO(CreateChatDTO, "body", formatter)
)

export {chatRouter}