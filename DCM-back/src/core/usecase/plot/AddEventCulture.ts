import { inject, injectable } from "inversify";
import { Identity } from "../../domain/valueObjects/Identitty";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { Usecase } from "../Usecase";
import { PlotRepository } from "../../domain/repositories/PlotRepository";
import { PlotError } from "../../domain/models/errors/PlotError";

export interface AddEventCultureProps {
  eventCultureId: string;
  plotId: string;
}

@injectable()
export class AddEventCulture
  implements Usecase<AddEventCultureProps, Promise<void>>
{
  constructor(
    @inject(DCMIdentifiers.plotRepository)
    private readonly _plotRepository: PlotRepository
  ) {}

  async execute( payload: AddEventCultureProps ): Promise<void> {
    const plot = await this._plotRepository.getById(payload.plotId);
    if(!plot){
        throw new PlotError.GetByIdFailed("PLOT_NOT_FOUND")
    }
    plot.addEventCulture(payload.eventCultureId);
    await this._plotRepository.update(plot);

  }

  async canExecute( identity: Identity): Promise<boolean>{
    if (identity.role === "ADMIN" || identity.role === "PROLO") {
        return true;
      }
      return false;
  }
}
