import { User } from "../domain/User"
import UserModel from "../infrastructure/UserSchema"
import { IUserRepository } from "../types/IUserRepository"

export class RegisterUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(user: User) {
        try {
            const newUser = await this.userRepository.create(user)
            return newUser
        } catch (error) {
            return null
        }
        
    }
}