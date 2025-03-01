import { GetUserByCriteriaUseCase } from "../../features/Users/application/GetUserByCriteriaUseCase"
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
    const getUserByCriteria = new GetUserByCriteriaUseCase(userRepository)



    container.register('ApiResponseFormatter', new ApiResponseFormatter())
    container.register('UserRepository', userRepository)
    container.register('PasswordHasher', passwordHasher)

    //UseCases
    container.register('RegisterUseCase', registerUseCase)
    container.register('GetUserByCriteriaUseCase', getUserByCriteria)
    

    //Controllers
    container.register('UserController', new UserController(
        registerUseCase,
        getUserByCriteria,
        container.resolve('ApiResponseFormatter'

        )))

}

registerDependencies()