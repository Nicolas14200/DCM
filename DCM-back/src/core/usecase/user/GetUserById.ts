import { User } from "../../../core/domain/entities/user/User";
import { Usecase } from "../Usecase";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { UserRepository } from "../../../core/domain/repositories/UserRepository";
import { Identity } from "../../../core/domain/valueObjects/Identitty";

@injectable()
export class GetUserById implements Usecase<string, User>{
    
    constructor(
        @inject(DCMIdentifiers.userRepository)
        private userRepository: UserRepository){}

    async execute(id: string): Promise<User> {
        
        return await this.userRepository.getById(id);

    }
    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "ADMIN" || identity.role === "PROLO" ) {
            return true;
        }
        return false;
    } 
}