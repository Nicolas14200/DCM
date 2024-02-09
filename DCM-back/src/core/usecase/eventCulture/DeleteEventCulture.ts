import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { Usecase } from "../Usecase";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { EventCultureRepository } from "../../../core/domain/repositories/EventCultureRepository";
import { inject, injectable } from "inversify";
import { EventCultureError } from "../../domain/models/errors/EventCultureError";

@injectable()
export class DeleteEventCulture implements Usecase<string, boolean> {
  constructor(
    @inject(DCMIdentifiers.eventCultureRepository)
    private readonly _eventCultureRepository: EventCultureRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    const isDelete = await this._eventCultureRepository.delete(id);
    if (!isDelete) {
      throw new EventCultureError.DeletedEventCultureFailed("Deleted EventCulture Failed");
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
