import { Router } from "express";
import { UserController } from "./User.controller";
import { UserRepository } from "../UserRepository";
import { responseMiddleware } from "../../../../infrastructure/middlewares/responseMiddleware";
import { RegisterUseCase } from "../../application/RegisterUserUseCase";
import { PasswordHasher } from "../../../../infrastructure/security/hashing";
import { container } from "../../../../infrastructure/di/container";

const UserRouter = Router()


const userController = container.resolve<UserController>('UserController')


UserRouter.post('/',userController.create.bind(userController))


export {UserRouter}