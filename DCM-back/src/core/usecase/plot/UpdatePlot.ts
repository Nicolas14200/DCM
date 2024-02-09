import { PlotRepository } from "../../../core/domain/repositories/PlotRepository";
import { Usecase } from "../Usecase";
import { Plot } from "../../../core/domain/entities/plot/Plot";
import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { StarsLevel } from "../../../core/domain/valueObjects/StarsLevel";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { PlotError } from "../../domain/models/errors/PlotError";

export interface UpdatePlotProps {
  id: string;
  name?: string;
  codeName?: string;
  ph?: number;
  pebbles?: StarsLevel;
  plank?: number;
  width?: number;
  heigth?: number;
}

@injectable()
export class UpdatePlot implements Usecase<UpdatePlotProps, Plot> {
  constructor(
    @inject(DCMIdentifiers.plotRepository)
    private readonly plotRepository: PlotRepository
  ) {}

  async execute(payload: UpdatePlotProps): Promise<Plot> {
    const plot = await this.plotRepository.getById(payload.id);
    if (!plot) {
      throw new PlotError.GetByIdFailed("Get by id failed");
    }
    plot.update({
      name: payload.name,
      codeName: payload.codeName,
      pebbles: payload.pebbles,
      ph: payload.ph,
      plank: payload.plank,
      width: payload.width,
      heigth: payload.heigth,
    });
    this.plotRepository.update(plot);
    return plot;
  }

  async canExecute(identity: Identity): Promise<boolean> {
    if (identity.role === "ADMIN" || identity.role === "PROLO") {
      return true;
    }
    return false;
  }
}
