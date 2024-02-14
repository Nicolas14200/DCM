import { User } from "../../domain/entities/user/User";
import { Usecase } from "../Usecase";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { UserRepository } from "../../../core/domain/repositories/UserRepository";
import { PasswordGateway } from "../../../core/domain/gateways/PasswordGateway";
import { Password } from "../../../core/domain/valueObjects/Password";
import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { UserError } from "../../domain/models/errors/UserError";

export interface UpdateUserProps {
    id: string;
    name:string;
    password:string;
    email:string;
}

@injectable()
export class UpdateUser implements Usecase<UpdateUserProps, User>{
    constructor(
        @inject(DCMIdentifiers.userRepository)
        private userRepository: UserRepository,
        @inject(DCMIdentifiers.passwordGateway)
        private passwordGateway: PasswordGateway
      ) {}
    async execute(payload: UpdateUserProps): Promise<User> {
        console.log("payload", payload)
        const user: User = await this.userRepository.getById(payload.id);
        const password = new Password(payload.password).value;
        const hash = await this.passwordGateway.encrypt(password);
        if(!user){
            throw new UserError.UpdateFailed("User not found");
        }
        user.update({
            name: payload.name,
            password: hash,
            id: user.props.id,
            email:payload.email
        });
        
        this.userRepository.update({
            id: user.props.id,
            name: user.props.name,
            password: user.props.password,
            email:user.props.email
        });
        return user
    }
    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "ADMIN" || identity.role === "PROLO" ) {
            return true;
        }
        return false;
    } 

}