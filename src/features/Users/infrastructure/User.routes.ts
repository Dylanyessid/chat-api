import { Router } from "express";
import { UserController } from "./User.controller";
import { UserRepository } from "./UserRepository";
import { responseMiddleware } from "../../../infrastructure/middlewares/responseMiddleware";
import { RegisterUseCase } from "../application/RegisterUserUseCase";
import { PasswordHasher } from "../../../infrastructure/security/hashing";

const UserRouter = Router()

const regiserUseCase = new RegisterUseCase(new UserRepository(), new PasswordHasher())
const userController = new UserController(regiserUseCase)

UserRouter.post('/', responseMiddleware,userController.create.bind(userController))


export {UserRouter}