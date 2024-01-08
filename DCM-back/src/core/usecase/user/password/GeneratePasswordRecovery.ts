import { Identity } from "@src/core/domain/valueObjects/Identitty";
import { Usecase } from "../../Usecase";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../../DCMIdentifiers";
import { UserRepository } from "@src/core/domain/repositories/UserRepository";
import { EmailGateway } from "@src/core/domain/gateways/EmailGateway";
import { v4 } from "uuid";

@injectable()
export class GeneratePasswordRecovery implements Usecase<string, string> {

    constructor(
        @inject(DCMIdentifiers.userRepository)
        private userRepository: UserRepository,
        @inject(DCMIdentifiers.emailGateway)
        private emailGateway: EmailGateway
    ){}

    async execute(email: string): Promise<string> {
        const user = await this.userRepository.getByEmail(email);
        user.setSecurityCode(v4());
        await this.emailGateway.send({
            From: {
                Email: email,
                Name: "",
              },
              To: [{
                Email: email,
                Name: "",
              }],
              Subject: "Security code",
              TextPart: user.props.securityCode,
              HTMLPart: "",
              CustomID:""
        })
        return user.props.securityCode;    
    }

    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "ADMIN") {
            return true;
        }
        return false;
    }
}