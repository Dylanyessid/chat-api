
import { IPasswordHashing } from '../../../application/security/IPasswordHashing';
import { JwtService } from '../../../infrastructure/security/jwt';
import { User } from '../../Users/domain/User';
import { IUserRepository } from './../../Users/domain/IUserRepository';
import { LoginDTO } from './../infrastructure/dto/LoginDTO';
class LoginUseCase {

    constructor(private userRepository:IUserRepository, private passwordHasher: IPasswordHashing, private jwtService:JwtService){}

    async execute(loginDTO:LoginDTO){

       const user = await this.userRepository.getOne({email:loginDTO.email})
       if(!user) return null
       const isValidPassword = await this.passwordHasher.verifyPassword(loginDTO.password, user.password)
       if(!isValidPassword) return null
       return this.jwtService.generateToken(user)
    }
}

export default LoginUseCase