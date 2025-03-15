import { IPasswordHashing } from "../../../application/security/IPasswordHashing"

import { IUserRepository } from "../../Users/domain/IUserRepository"
import { User } from "../../Users/domain/User"
import { CreateUserDTO } from "../infrastructure/dto/CreateUserDTO"

// Use case for registering a new user
export class RegisterUseCase {
    // Constructor to initialize repository and password hasher
    constructor(
        private userRepository: IUserRepository,
        private passwordHasher: IPasswordHashing
    ) {}

    // Method to execute the user registration logic
    async execute(createUserDto: CreateUserDTO) {
        // Extract email and password from the DTO
        const {email,password} = createUserDto
        const user = User.create(email,password)

        // Hash the user's password
        const hashedPassword = await this.passwordHasher.hashPassword(user!.password)
        user!.password = hashedPassword

        // Save the new user to the repository
        const newUser = await this.userRepository.create(user!)
        if(!newUser) return null
        return newUser
    }
}