import { Router } from "express";
import { validateDTO } from "../../../../infrastructure/middlewares/validateDTO";
import { LoginDTO } from "../dto/LoginDTO";
import { container } from "../../../../infrastructure/di/container";
import { ApiResponseFormatter } from './../../../../infrastructure/formatters/ApiResponseFormatter';
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";

const loginRouter = Router()

const formatter = container.resolve<IApiResponseFormatter>('ApiResponseFormatter')
const controller = container.resolve()
loginRouter.post('/login', validateDTO(LoginDTO, "body", formatter) )

export {loginRouter}