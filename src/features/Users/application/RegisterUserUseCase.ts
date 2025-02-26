import { IPasswordHashing } from "../../../application/security/IPasswordHashing"
import { User } from "../domain/User"

import { IUserRepository } from "../types/IUserRepository"


export class RegisterUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHasher: IPasswordHashing
    ) {}

    async execute(user: User) {
        try {
            const newUser = await this.userRepository.create(user)
            const hashedPassword = await this.passwordHasher.hashPassword(user.password)
            if(!newUser) return null
            newUser.password = hashedPassword
            return newUser
        } catch (error) {
            return null
        }
        
    }
}