import { Identity } from "../../../domain/valueObjects/Identitty";
import { Usecase } from "../../Usecase";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../../DCMIdentifiers";
import { PasswordGateway } from "../../../domain/gateways/PasswordGateway";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { Password } from "../../../domain/valueObjects/Password";

export interface ResetPasswordProps {
    id: string;
    newPassword: string;
    email: string;
    securityCode: string;
}

@injectable()
export class ResetPassword implements Usecase<ResetPasswordProps, void> {

    constructor(
        @inject(DCMIdentifiers.userRepository)
        private userRepository: UserRepository,
        @inject(DCMIdentifiers.passwordGateway)
        private passwordGateway: PasswordGateway
    ){}

    async execute(payload: ResetPasswordProps): Promise<void> {

        const user = await this.userRepository.getByEmail(payload.email);
        const passwordHash = await this.passwordGateway.encrypt(new Password(payload.newPassword).value);
        user.resetPassword(payload.securityCode, passwordHash);
        await this.userRepository.update({
            email: user.props.email,
            id: user.props.id,
            name: user.props.name,
            password: user.props.password
        })
    }

    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "ADMIN") {
            return true;
        }
        return false;
    }

}