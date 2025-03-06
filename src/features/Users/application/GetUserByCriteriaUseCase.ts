import { IUserRepository } from "../domain/IUserRepository"
import { CreateUserDTO } from "../../Auth/infrastructure/dto/CreateUserDTO"

 class GetUsersByCriteriaUseCase {
    constructor(
        private userRepository: IUserRepository,
      
    ) {}

    async execute(criteria:object) {
       
  
        const user = this.userRepository.getOne(criteria)
        if(!user) return null
        return user
       
    }
}

export default GetUsersByCriteriaUseCase