import { compare, genSaltSync, hashSync } from "bcrypt";
import { PasswordGateway } from "../../../core/domain/gateways/PasswordGateway";

export class BcryptPasswordGateway implements PasswordGateway {
  private saltRounds: string = genSaltSync(10);
  async encrypt(password: string): Promise<string> {
    return hashSync(password, this.saltRounds);
  }
  async comparePassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return compare(password, passwordHash);
  }
}
