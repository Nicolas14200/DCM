import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { Usecase } from "../Usecase";
import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { EventCultureRepository } from "../../../core/domain/repositories/EventCultureRepository";
import { EventCultureError } from "../../domain/models/errors/EventCultureError";

@injectable()
export class GetEventCultureById implements Usecase<string, EventCulture> {
  constructor(
    @inject(DCMIdentifiers.eventCultureRepository)
    private readonly _eventCultureRepository: EventCultureRepository
  ) {}

  async execute(id: string): Promise<EventCulture> {
    const eventCulture = await this._eventCultureRepository.getById(id);
    if(!eventCulture){
        throw new EventCultureError.GetByIdFailed("Get By Id Failed")
    }
    return eventCulture;
  }

  async canExecute(identity: Identity): Promise<boolean> {
    if (identity.role === "ADMIN" || identity.role === "PROLO") {
      return true;
    }
    return false;
  }
}
