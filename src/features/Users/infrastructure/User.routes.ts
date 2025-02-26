import { Router } from "express";
import { UserController } from "./User.controller";
import { UserRepository } from "./UserRepository";

const UserRouter = Router()

const userController = new UserController(new UserRepository())

UserRouter.post('/', userController.create.bind(userController))


export {UserRouter}