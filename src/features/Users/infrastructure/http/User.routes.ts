import { Router } from "express";
import { UserController } from "./User.controller";
import { UserRepository } from "../UserRepository";
import { responseMiddleware } from "../../../../infrastructure/middlewares/responseMiddleware";
import { RegisterUseCase } from "../../application/RegisterUserUseCase";
import { PasswordHasher } from "../../../../infrastructure/security/hashing";
import { container } from "../../../../infrastructure/di/container";

import { CreateUserDTO } from "../dto/CreateUserDTO";
import { validateDTO } from "../../../../infrastructure/middlewares/validateDTO";

const UserRouter = Router()


const userController = container.resolve<UserController>('UserController')


UserRouter.post('/', validateDTO(CreateUserDTO, container.resolve('ApiResponseFormatter')) ,userController.create.bind(userController))
UserRouter.get('/:id', ()=>{})


export {UserRouter}