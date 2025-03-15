import { Router } from "express";
import { UserController } from "./User.controller";
import { container } from "../../../../infrastructure/di/container";
import { CreateUserDTO } from "../../../Auth/infrastructure/dto/CreateUserDTO";
import { validateDTO } from "../../../../infrastructure/middlewares/validateDTO";
import { GetUserByIDDTO } from "../dto/GetUserByIdDTO";
import { IApiResponseFormatter } from "../../../../infrastructure/formatters/IApiResponseFormatter";
import { authMiddleware } from "../../../../infrastructure/middlewares/jwtValidatorMiddleare";

// Initialize the router
const UserRouter = Router()

// Resolve dependencies from the container
const formatter =  container.resolve<IApiResponseFormatter>('ApiResponseFormatter')
const userController = container.resolve<UserController>('UserController')

// Use authentication middleware for all routes
UserRouter.use(authMiddleware)

// Define routes for user operations
UserRouter.get('/:id',
    authMiddleware, 
    validateDTO(GetUserByIDDTO, "params", formatter), 
    userController.getOne.bind(userController)
)

UserRouter.get('/',
    authMiddleware,
    userController.getPaginated.bind(userController)
)

export {UserRouter}