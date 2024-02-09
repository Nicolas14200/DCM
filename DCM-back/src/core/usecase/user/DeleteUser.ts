import { inject, injectable } from "inversify";
import { Usecase } from "../Usecase";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { UserRepository } from "../../../core/domain/repositories/UserRepository";
import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { UserError } from "../../domain/models/errors/UserError";

@injectable()
export class DeleteUser implements Usecase<string, Promise<boolean>> {
  constructor(
    @inject(DCMIdentifiers.userRepository)
    private userRepository: UserRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    const isDelete = await this.userRepository.delete(id);
    if(!isDelete){
        throw new UserError.DeleteUserFailed('Delete user failed')
    }
    return isDelete;
  }

  async canExecute(identity: Identity): Promise<boolean> {
    if (identity.role === "ADMIN" || identity.role === "PROLO") {
      return true;
    }
    return false;
  }
}
