import { RegisterUseCase } from "../../features/Users/application/RegisterUserUseCase"
import { UserController } from "../../features/Users/infrastructure/http/User.controller"
import { UserRepository } from "../../features/Users/infrastructure/UserRepository"
import { ApiResponseFormatter } from "../formatters/ApiResponseFormatter"
import { PasswordHasher } from "../security/hashing"
import { container } from "./container"

export const registerDependencies = () =>{


    const userRepository = new UserRepository()
    const passwordHasher = new PasswordHasher()
    const registerUseCase = new RegisterUseCase(userRepository, passwordHasher)


    container.register('ApiResponseFormatter', new ApiResponseFormatter())
    container.register('UserRepository', userRepository)
    container.register('PasswordHasher', passwordHasher)
    container.register('RegisterUseCase', registerUseCase)
    container.register('UserRepository', userRepository)
    

    //Controllers
    container.register('UserController', new UserController(registerUseCase, container.resolve('ApiResponseFormatter')))

}

registerDependencies()