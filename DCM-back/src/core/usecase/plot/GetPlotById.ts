import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { Plot } from "../../../core/domain/entities/plot/Plot";
import { Usecase } from "../Usecase";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { PlotRepository } from "../../../core/domain/repositories/PlotRepository";
import { PlotError } from "../../domain/models/errors/PlotError";

@injectable()
export class GetPlotById implements Usecase<string, Plot> {
  constructor(
    @inject(DCMIdentifiers.plotRepository)
    private readonly _plotRepository: PlotRepository
  ) {}

  async execute(id: string): Promise<Plot> {
    const plot = await this._plotRepository.getById(id);
    if (!plot) {
      throw new PlotError.GetByIdFailed("Get by id failed");
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
