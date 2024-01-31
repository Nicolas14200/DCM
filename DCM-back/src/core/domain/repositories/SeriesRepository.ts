import { Series } from "../entities/Series";

export interface SeriesRepository {
    save(series: Series): Promise<Series>;
    getById(id: string) : Promise <Series>;
    getSerieByPlotId(plotId: string): Promise <Series[]>;
    delete(id: string): void;
}