
import { Series } from "../../../../core/domain/entities/Series";
import { SeriesRepository } from "../../../../core/domain/repositories/SeriesRepository";

export class InMemorySeriesRepository implements SeriesRepository{
    constructor(readonly seriesMap: Map < string, Series > ){}

    async save(series: Series): Promise<Series> {
        this.seriesMap.set(series.props.id, series);
        return series;
    }
    getById(id: string): Promise<Series> {
        throw new Error("Method not implemented.");
    }
    getSerieByPlotId(plotId: string): Promise<Series[]> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): void {
        throw new Error("Method not implemented.");
    }

}