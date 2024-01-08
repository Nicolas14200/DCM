import { inject, injectable } from "inversify";
import { Usecase } from "../Usecase";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { UserRepository } from "../../../core/domain/repositories/UserRepository";
import { Identity } from "../../../core/domain/valueObjects/Identitty";

@injectable()
export class DeleteUser implements Usecase<string, Promise<void>>{

    constructor(
        @inject(DCMIdentifiers.userRepository)
        private userRepository : UserRepository) {}
    
    async execute(id: string): Promise<void> {
        
        return await this.userRepository.delete(id);
    }

    async canExecute(identity: Identity): Promise<boolean> {
        
        if (identity.role === "ADMIN" || identity.role === "PROLO" ) {
            return true;
        }
        return false;
    }  
}