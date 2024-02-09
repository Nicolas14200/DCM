import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { Usecase } from "../Usecase";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { PlotRepository } from "../../../core/domain/repositories/PlotRepository";
import { PlotError } from "../../domain/models/errors/PlotError";

@injectable()
export class DeletePlot implements Usecase<string, boolean> {
  constructor(
    @inject(DCMIdentifiers.plotRepository)
    private readonly _plotRepository: PlotRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    const isDelete = await this._plotRepository.delete(id);
    if (!isDelete) {
      throw new PlotError.PlotDeleteFailed("Delete failed");
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
