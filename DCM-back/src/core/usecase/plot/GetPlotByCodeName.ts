import { Usecase } from "../Usecase";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { Plot } from "../../domain/entities/plot/Plot";
import { PlotRepository } from "../../domain/repositories/PlotRepository";
import { Identity } from "../../domain/valueObjects/Identitty";
import { PlotError } from "../../domain/models/errors/PlotError";

@injectable()
export class GetPlotByCodeName implements Usecase<string, Plot> {
  constructor(
    @inject(DCMIdentifiers.plotRepository)
    private readonly _plotRepository: PlotRepository
  ) {}

  async execute(payload: string): Promise<Plot> {
    const plot = await this._plotRepository.getByCodeName(payload);
    if(!plot){
        throw new PlotError.GetByCodeNameFailed("Get By Code Name Failed");
    }
    return plot;
  }

  async canExecute(identity: Identity): Promise<boolean> {
    if (identity.role === "ADMIN" || identity.role === "PROLO") {
      return true;
    }
    return false;
  }
}
