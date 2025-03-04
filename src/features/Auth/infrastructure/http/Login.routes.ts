import { Router } from "express";
import { validateDTO } from "../../../../infrastructure/middlewares/validateDTO";
import { LoginDTO } from "../dto/LoginDTO";
import { container } from "../../../../infrastructure/di/container";
import { ApiResponseFormatter } from './../../../../infrastructure/formatters/ApiResponseFormatter';
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import AuthController from "./Login.controller";

const authRouter = Router()

const formatter = container.resolve<IApiResponseFormatter>('ApiResponseFormatter')
const controller = container.resolve<AuthController>('AuthController')

authRouter.post('/login', validateDTO(LoginDTO, "body", formatter), controller.login.bind(controller) )

export {authRouter}