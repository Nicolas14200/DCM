import { Plot } from "../../../../core/domain/entities/plot/Plot";
import { PlotRepository } from "../../../../core/domain/repositories/PlotRepository";

export class InMemoryPlotRepository implements PlotRepository {
  constructor(readonly plotMap: Map<string, Plot>) {}

  async getAll(): Promise<Plot[]> {
    const plots: Plot[] = Array.from(this.plotMap.values());
    return plots;
  }

  async getById(id: string): Promise<Plot> {
    const plot: Plot = this.plotMap.get(id);
    if (!plot) {
      return null;
    }
    return this.plotMap.get(id);
  }

  async save(plot: Plot): Promise<Plot> {
    this.plotMap.set(plot.props.id, plot);
    return plot;
  }

  async update(plot: Plot): Promise<Plot> {
    const plotExist = this.plotMap.set(plot.props.id, plot);
    if (!plotExist) {
      return null;
    }
    return this.plotMap.get(plot.props.id);
  }

  async getByCodeName(codeName: string): Promise<Plot> {
    for (let [id, plot] of this.plotMap) {
      if (plot.props.codeName === codeName) {
        return this.plotMap.get(id);
      }
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    return this.plotMap.delete(id);
  }
}
