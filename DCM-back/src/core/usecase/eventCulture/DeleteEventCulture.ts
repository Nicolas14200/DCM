import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { Usecase } from "../Usecase";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { EventCultureRepository } from "../../../core/domain/repositories/EventCultureRepository";
import { inject, injectable } from "inversify";
import { EventCultureError } from "../../domain/models/errors/EventCultureError";
import { PlotRepository } from "../../domain/repositories/PlotRepository";

export interface DeleteEventCultureProps {
  id: string, 
  plotId: string
}

@injectable()
export class DeleteEventCulture implements Usecase<DeleteEventCultureProps, boolean> {
  constructor(
    @inject(DCMIdentifiers.eventCultureRepository)
    private readonly _eventCultureRepository: EventCultureRepository,
    @inject(DCMIdentifiers.plotRepository)
    private readonly _plotRepository: PlotRepository
  ) {}

  async execute(payload: DeleteEventCultureProps): Promise<boolean> {
    const isDelete = await this._eventCultureRepository.delete(payload.id);
    if (!isDelete) {
      throw new EventCultureError.DeletedEventCultureFailed("Deleted EventCulture Failed");
    }
    const plot = await this._plotRepository.getById(payload.plotId);
    plot.deleteEventCulture(payload.id);
    await this._plotRepository.update(plot);
    return isDelete;
  }

  async canExecute(identity: Identity): Promise<boolean> {
    if (identity.role === "ADMIN" || identity.role === "PROLO") {
      return true;
    }
    return false;
  }
}
