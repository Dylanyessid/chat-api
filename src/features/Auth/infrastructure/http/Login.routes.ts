import { Router } from "express";
import { validateDTO } from "../../../../infrastructure/middlewares/validateDTO";
import { LoginDTO } from "../dto/LoginDTO";
import { container } from "../../../../infrastructure/di/container";
import { ApiResponseFormatter } from './../../../../infrastructure/formatters/ApiResponseFormatter';
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import AuthController from "./Login.controller";
import { CreateUserDTO } from "../dto/CreateUserDTO";


const authRouter = Router()

// Resolve dependencies from the container
const formatter = container.resolve<IApiResponseFormatter>('ApiResponseFormatter')
const controller = container.resolve<AuthController>('AuthController')

// Define the register route
authRouter.post('/register',
    validateDTO(CreateUserDTO,"body",formatter),
    controller.create.bind(controller)
)

// Define the login route 
authRouter.post('/login', validateDTO(LoginDTO, "body", formatter), controller.login.bind(controller) )


export {authRouter}