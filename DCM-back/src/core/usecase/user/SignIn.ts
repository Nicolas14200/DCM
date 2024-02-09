import { AuthenticationError } from "../../../core/domain/models/errors/AuthenticationError";
import { PasswordGateway } from "../../../core/domain/gateways/PasswordGateway";
import { User } from "../../domain/entities/user/User";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { Usecase } from "../Usecase";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";

export interface SignInProps {
  email: string;
  password: string;
}
@injectable()
export class SignIn implements Usecase<SignInProps, User> {
  constructor(
    @inject(DCMIdentifiers.userRepository)
    private userRepository: UserRepository,
    @inject(DCMIdentifiers.passwordGateway)
    private passwordGateway: PasswordGateway
  ) {}

  async execute(payload: SignInProps) {
    try {
      const user = await this.userRepository.getByEmail(payload.email);

      const passwordCheck = await this.passwordGateway.comparePassword(
        payload.password,
        user.props.password
      );

      if (passwordCheck) {
        return user;
      }
    } catch (e) {
      throw new AuthenticationError.SignInFailed("SIGNIN_FAILED");
    }
  }
}
