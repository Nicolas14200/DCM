import { Plot } from "../entities/plot/Plot";

export interface PlotRepository {
    save(plot: Plot): Promise<Plot>;
    update(plot: Plot):Promise<Plot>;
    getById(id: string) : Promise <Plot>;
    getByCodeName(codeName: string): Promise<Plot>;
    delete(id: string):Promise<void>;
    getAll():Promise<Plot[]>;
} 