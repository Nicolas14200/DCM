"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySeriesRepository = void 0;
class InMemorySeriesRepository {
    seriesMap;
    constructor(seriesMap) {
        this.seriesMap = seriesMap;
    }
    async save(series) {
        this.seriesMap.set(series.props.id, series);
        return series;
    }
    getById(id) {
        throw new Error("Method not implemented.");
    }
    getSerieByPlotId(plotId) {
        throw new Error("Method not implemented.");
    }
    delete(id) {
        throw new Error("Method not implemented.");
    }
}
exports.InMemorySeriesRepository = InMemorySeriesRepository;
