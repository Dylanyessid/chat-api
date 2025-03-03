import CreateProfileUseCase from "../../features/Profiles/application/CreateProfileUseCase"
import { UpdatePhotoUseCase } from "../../features/Profiles/application/UpdatePhotoUseCase"
import UpdateProfileDataUseCase from "../../features/Profiles/application/UpdateProfileDataUseCase"
import { ProfileController } from "../../features/Profiles/infrastructure/http/Profile.controller"
import { ProfileRepository } from "../../features/Profiles/infrastructure/ProfileRepository"
import { GetUserByCriteriaUseCase } from "../../features/Users/application/GetUserByCriteriaUseCase"
import { RegisterUseCase } from "../../features/Users/application/RegisterUserUseCase"
import { UserController } from "../../features/Users/infrastructure/http/User.controller"
import { UserRepository } from "../../features/Users/infrastructure/UserRepository"
import { ApiResponseFormatter } from "../formatters/ApiResponseFormatter"
import { PasswordHasher } from "../security/hashing"
import { container } from "./container"

export const registerDependencies = () =>{


    const userRepository = new UserRepository()
    const profileRepository = new ProfileRepository()
    const passwordHasher = new PasswordHasher()
    const registerUseCase = new RegisterUseCase(userRepository, passwordHasher)
    const getUserByCriteria = new GetUserByCriteriaUseCase(userRepository)
    

    //Utilites
    container.register('ApiResponseFormatter', new ApiResponseFormatter())
    container.register('PasswordHasher', passwordHasher)

    //Repositories
    container.register('UserRepository', userRepository)
    container.register('ProfileRepository', profileRepository)
    

    //UseCases
    container.register('RegisterUseCase', registerUseCase)
    container.register('GetUserByCriteriaUseCase', getUserByCriteria)
    container.register('CreateProfileUseCase', new CreateProfileUseCase(profileRepository))
    container.register('UpdatePhotoUseCase', new UpdatePhotoUseCase(profileRepository))
    container.register('UpdateProfileDataUseCase', new UpdateProfileDataUseCase(profileRepository))
    //Controllers
    container.register('UserController', new UserController(
        registerUseCase,
        getUserByCriteria,
        container.resolve('ApiResponseFormatter')
    ))

    container.register('ProfileController', new ProfileController(
        container.resolve('CreateProfileUseCase'),
        container.resolve('UpdatePhotoUseCase'),
        container.resolve('UpdateProfileDataUseCase'),
        container.resolve('ApiResponseFormatter')
        
    ))

}

registerDependencies()