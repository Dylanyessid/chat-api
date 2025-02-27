import { IPasswordHashing } from "../../../application/security/IPasswordHashing"

import { IUserRepository } from "../domain/IUserRepository"
import { User } from "../domain/User"


export class RegisterUseCase {
    constructor(
        private userRepository: IUserRepository,
        private passwordHasher: IPasswordHashing
    ) {}

    async execute(user: User) {
        try {
            const hashedPassword = await this.passwordHasher.hashPassword(user.password!)
            user.password = hashedPassword
            const newUser = await this.userRepository.create(user)
            if(!newUser) return null
            return newUser
        } catch (error) {
            return null
        }
        
    }
}