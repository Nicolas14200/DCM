import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { Usecase } from "../Usecase";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { PlotRepository } from "../../../core/domain/repositories/PlotRepository";

export interface AddSubPlotProps {
  currentId: string;
  plotIdToAdd: string;
}

@injectable()
export class AddSubPlot implements Usecase<AddSubPlotProps, void> {
  constructor(
    @inject(DCMIdentifiers.plotRepository)
    private readonly _plotRepository: PlotRepository
  ) {}

  async execute(addSubPlotProps: AddSubPlotProps): Promise<void> {
    const plot = await this._plotRepository.getById(addSubPlotProps.currentId);
    
    plot.addSubPlot(addSubPlotProps.plotIdToAdd);
    await this._plotRepository.update(plot);
  }

  async canExecute(identity: Identity): Promise<boolean> {
    if (identity.role === "ADMIN" || identity.role === "PROLO") {
      return true;
    }
    return false;
  }
}
