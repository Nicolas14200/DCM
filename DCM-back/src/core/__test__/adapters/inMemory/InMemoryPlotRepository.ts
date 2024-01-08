import { Plot } from "../../../../core/domain/entities/plot/Plot";
import { PlotError } from "../../../../core/domain/models/errors/PlotError";
import { PlotRepository } from "../../../../core/domain/repositories/PlotRepository";

export class InMemoryPlotRepository implements PlotRepository {

    constructor(readonly plotMap: Map < string, Plot > ){
    }
    
    async getAll(): Promise<Plot[]> {
        const plots: Plot[] = Array.from(this.plotMap.values());
        return plots;
    }
    
    async getById(id: string): Promise<Plot> {
            const plot: Plot = this.plotMap.get(id)
            if (!plot) {
                throw new PlotError.GetByIdFailed("PLOT_NOT_FOUND")
              }
            return this.plotMap.get(id);
    }

    async save(plot: Plot): Promise<Plot> {
        this.plotMap.set(plot.props.id, plot);
        return plot;     
    }

    async update(plot: Plot): Promise<Plot> { 
        const plotExist = this.plotMap.set(plot.props.id, plot);
        if(!plotExist){
            throw new PlotError.PlotExist("PLOT_NOT_FOUND")
        }
        return this.plotMap.get(plot.props.id);
    }

    async getByCodeName(codeName: string): Promise<Plot> {
        for (let [id, plot] of this.plotMap){
            if (plot.props.codeName === codeName){
                return this.plotMap.get(id);
            }
        }
        throw new PlotError.GetByCodeNameFailed("PLOT_NOT_FOUND")
    }

    async delete(id: string): Promise<void> {
        this.plotMap.delete(id);
        return;
    }

}

