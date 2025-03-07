import CreateChatUseCase from "../../features/Chat/application/CreateChatUseCase"
import ChatRepository from "../../features/Chat/infrastructure/ChatRepository"
import ChatController from "../../features/Chat/infrastructure/http/Chat.controller"
import CreateMessageUseCase from "../../features/Messages/application/CreateMessageUseCase"
import MessageRepository from "../../features/Messages/infrastructure/MessageRepository"
import CreateProfileUseCase from "../../features/Profiles/application/CreateProfileUseCase"
import { UpdatePhotoUseCase } from "../../features/Profiles/application/UpdatePhotoUseCase"
import UpdateProfileDataUseCase from "../../features/Profiles/application/UpdateProfileDataUseCase"
import { ProfileController } from "../../features/Profiles/infrastructure/http/Profile.controller"
import { ProfileRepository } from "../../features/Profiles/infrastructure/ProfileRepository"
import GetUsersByCriteriaUseCase  from "../../features/Users/application/GetUserByCriteriaUseCase"
import { RegisterUseCase } from "../../features/Auth/application/RegisterUserUseCase"
import { UserController } from "../../features/Users/infrastructure/http/User.controller"
import { UserRepository } from "../../features/Users/infrastructure/UserRepository"
import { ApiResponseFormatter } from "../formatters/ApiResponseFormatter"
import { PasswordHasher } from "../security/hashing"
import { container } from "./container"
import MessageController from './../../features/Messages/infrastructure/http/Message.controller';
import GetMessagesUseCase from "../../features/Messages/application/GetMessagesUseCase"
import AuthController from "../../features/Auth/infrastructure/http/Login.controller"
import LoginUseCase from "../../features/Auth/application/LoginUseCase"
import { JwtService } from "../security/jwt"
import { GetUsersByPaginationUseCase } from "../../features/Users/application/GetUsersByPagination"

import GetChatsUseCase from "../../features/Chat/application/GetChatUseCase"


export const registerDependencies = () =>{


    const userRepository = new UserRepository()
    const profileRepository = new ProfileRepository()
    const passwordHasher = new PasswordHasher()
    const registerUseCase = new RegisterUseCase(userRepository, passwordHasher)
    const getUserByCriteria = new GetUsersByCriteriaUseCase(userRepository)
    

    //Utilites
    container.register('ApiResponseFormatter', new ApiResponseFormatter())
    container.register('PasswordHasher', passwordHasher)
    container.register('JwtService', new JwtService())

    //Repositories
    container.register('UserRepository', userRepository)
    container.register('ProfileRepository', profileRepository)
    container.register('ChatRepository', new ChatRepository())
    container.register('MessageRepository', new MessageRepository( ))


    //UseCases
    container.register('RegisterUseCase', registerUseCase)
    container.register('GetUserByCriteriaUseCase', getUserByCriteria)
    container.register('CreateProfileUseCase', new CreateProfileUseCase(profileRepository, userRepository))
    container.register('UpdatePhotoUseCase', new UpdatePhotoUseCase(profileRepository))
    container.register('UpdateProfileDataUseCase', new UpdateProfileDataUseCase(profileRepository))
    container.register('CreateMessageUseCase', new CreateMessageUseCase(
        container.resolve('MessageRepository')
    ))
    container.register('GetMessagesUseCase', new GetMessagesUseCase(
        container.resolve('MessageRepository')
    ))


    container.register('CreateChatUseCase', new CreateChatUseCase(
        container.resolve('ChatRepository'),
        container.resolve('UserRepository') 
    ))
    
    container.register('GetChatsUseCase', new GetChatsUseCase(container.resolve("ChatRepository")))

    container.register('LoginUseCase', new LoginUseCase(
        container.resolve('UserRepository'),
        container.resolve('PasswordHasher'),
        container.resolve('JwtService')
    ))
    container.register('GetUsersByCriteriaUseCase', new GetUsersByCriteriaUseCase(
        container.resolve('UserRepository'),
    ))

    container.register('GetUsersByPaginationUseCase', new GetUsersByPaginationUseCase(userRepository))


    //----Controllers-----

    //User
    container.register('UserController', new UserController(
        getUserByCriteria,
        container.resolve('GetUsersByPaginationUseCase'),
        container.resolve('ApiResponseFormatter')
    ))

    //Profile
    container.register('ProfileController', new ProfileController(
        container.resolve('CreateProfileUseCase'),
        container.resolve('UpdatePhotoUseCase'),
        container.resolve('UpdateProfileDataUseCase'),
        container.resolve('ApiResponseFormatter')
        
    ))

    //Chat
    container.register('ChatController', new ChatController(
        container.resolve('CreateChatUseCase'),
        container.resolve('GetChatsUseCase'),
        container.resolve('ApiResponseFormatter'),
    ))

    //Message
    container.register('MessageController', new MessageController(
        container.resolve('CreateMessageUseCase'),
        container.resolve('GetMessagesUseCase'),
        container.resolve('ApiResponseFormatter'),

    ))

    //Auth
    container.register('AuthController', new AuthController(
         container.resolve('RegisterUseCase'),
         container.resolve('LoginUseCase'),
         container.resolve('ApiResponseFormatter')
    ))
}

registerDependencies()