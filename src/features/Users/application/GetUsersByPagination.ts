import { IUserRepository } from "../domain/IUserRepository";

export class GetUserByPaginationUseCase {

    constructor(private userRepository:IUserRepository){}

    async execute(page:number, limit:number){
        const count = await this.userRepository.countUsers()
        const users= await this.userRepository.getMany(page,limit)
        return {count, users}
    }
}