import { Router } from "express";
import { UserController } from "./User.controller";
import { container } from "../../../../infrastructure/di/container";
import { CreateUserDTO } from "../../../Auth/infrastructure/dto/CreateUserDTO";
import { validateDTO } from "../../../../infrastructure/middlewares/validateDTO";
import { GetUserByIDDTO } from "../dto/GetUserByIdDTO";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import { authMiddleware } from "../../../../infrastructure/middlewares/jwtValidatorMiddleare";

const UserRouter = Router()

const formatter =  container.resolve<IApiResponseFormatter>('ApiResponseFormatter')
const userController = container.resolve<UserController>('UserController')

UserRouter.use(authMiddleware)


UserRouter.get('/:id', 
    validateDTO(GetUserByIDDTO, "params", formatter), 
    userController.getOne.bind(userController)
)

UserRouter.get('/',
    userController.getPaginated.bind(userController)
)


export {UserRouter}