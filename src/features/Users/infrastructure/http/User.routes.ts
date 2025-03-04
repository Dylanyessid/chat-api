import { Router } from "express";
import { UserController } from "./User.controller";
import { container } from "../../../../infrastructure/di/container";
import { CreateUserDTO } from "../dto/CreateUserDTO";
import { validateDTO } from "../../../../infrastructure/middlewares/validateDTO";
import { GetUserByIDDTO } from "../dto/GetUserByIdDTO";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";

const UserRouter = Router()

const formatter =  container.resolve<IApiResponseFormatter>('ApiResponseFormatter')
const userController = container.resolve<UserController>('UserController')


UserRouter.post('/',
    validateDTO(CreateUserDTO,"body",formatter),
    userController.create.bind(userController)
)

UserRouter.get('/:id', 
    validateDTO(GetUserByIDDTO, "params", formatter), 
    userController.getOne.bind(userController)
)



export {UserRouter}