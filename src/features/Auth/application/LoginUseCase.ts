import { IPasswordHashing } from '../../../application/security/IPasswordHashing';
import { JwtService } from '../../../infrastructure/security/jwt';
import { User } from '../../Users/domain/User';
import { IUserRepository } from './../../Users/domain/IUserRepository';
import { LoginDTO } from './../infrastructure/dto/LoginDTO';

// Class to handle user login use case
class LoginUseCase {
    // Constructor to initialize repository, password hasher, and JWT service
    constructor(private userRepository:IUserRepository, private passwordHasher: IPasswordHashing, private jwtService:JwtService){}

    // Method to execute the user login logic
    async execute(loginDTO:LoginDTO){
        // Fetch user by email
        const user = await this.userRepository.getOne({email:loginDTO.email})
        if(!user) return null
        // Verify password
        const isValidPassword = await this.passwordHasher.verifyPassword(loginDTO.password, user.password)
        if(!isValidPassword) return null
        // Generate JWT token
        return this.jwtService.generateToken(user)
    }
}

// Export the use case
export default LoginUseCase