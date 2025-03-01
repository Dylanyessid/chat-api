import { IPasswordHashing } from "../../../application/security/IPasswordHashing"

import { IUserRepository } from "../domain/IUserRepository"
import { User } from "../domain/User"
import { CreateUserDTO } from "../infrastructure/dto/CreateUserDTO"


export class RegisterUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHasher: IPasswordHashing
    ) {}

    async execute(createUserDto: CreateUserDTO) {
       
        const {email,password,username} = createUserDto
        const user = User.create(username,email,password)

        const hashedPassword = await this.passwordHasher.hashPassword(user!.password)
        user!.password = hashedPassword
        const newUser = await this.userRepository.create(user!)
        if(!newUser) return null
        return newUser
       
    }
}