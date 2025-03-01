import { IUserRepository } from "../domain/IUserRepository"
import { CreateUserDTO } from "../infrastructure/dto/CreateUserDTO"

export class GetUserByCriteriaUseCase {
    constructor(
        private userRepository: IUserRepository,
      
    ) {}

    async execute(criteria:object) {
       
  
        const user = this.userRepository.getOne(criteria)
        if(!user) return null
        return user
       
    }
}