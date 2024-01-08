import { PasswordGateway } from "../../../domain/gateways/PasswordGateway";

export class InMemoryPasswordGateway implements PasswordGateway {

  async encrypt(password: string): Promise<string> {
    return password;
  }
  
  async comparePassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return password === passwordHash;
  }
}
