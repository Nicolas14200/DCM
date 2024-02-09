import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { Usecase } from "../Usecase";
import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { inject, injectable } from "inversify";
import { EventCultureRepository } from "../../../core/domain/repositories/EventCultureRepository";
import { EventCultureError } from "../../domain/models/errors/EventCultureError";

@injectable()
export class GetEventsCulturesByPlotId
  implements Usecase<string, EventCulture[]>
{
  constructor(
    @inject(DCMIdentifiers.eventCultureRepository)
    private readonly _eventCultureRepository: EventCultureRepository
  ) {}

  async execute(plotId: string): Promise<EventCulture[]> {
    const eventCultureByPloyId =
      await this._eventCultureRepository.getEventCultureByPlotId(plotId);
    if (eventCultureByPloyId.length === 0) {
      throw new EventCultureError.NoEventCulture(
        "No EventCulture"
      );
    }
    return eventCultureByPloyId;
  }

  async canExecute(identity: Identity): Promise<boolean> {
    if (identity.role === "ADMIN" || identity.role === "PROLO") {
      return true;
    }
    return false;
  }
}
