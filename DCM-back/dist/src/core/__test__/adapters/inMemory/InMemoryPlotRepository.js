"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPlotRepository = void 0;
const PlotError_1 = require("../../../../core/domain/models/errors/PlotError");
class InMemoryPlotRepository {
    plotMap;
    constructor(plotMap) {
        this.plotMap = plotMap;
    }
    async getAll() {
        const plots = Array.from(this.plotMap.values());
        return plots;
    }
    async getById(id) {
        const plot = this.plotMap.get(id);
        if (!plot) {
            throw new PlotError_1.PlotError.GetByIdFailed("PLOT_NOT_FOUND");
        }
        return this.plotMap.get(id);
    }
    async save(plot) {
        this.plotMap.set(plot.props.id, plot);
        return plot;
    }
    async update(plot) {
        const plotExist = this.plotMap.set(plot.props.id, plot);
        if (!plotExist) {
            throw new PlotError_1.PlotError.PlotExist("PLOT_NOT_FOUND");
        }
        return this.plotMap.get(plot.props.id);
    }
    async getByCodeName(codeName) {
        for (let [id, plot] of this.plotMap) {
            if (plot.props.codeName === codeName) {
                return this.plotMap.get(id);
            }
        }
        throw new PlotError_1.PlotError.GetByCodeNameFailed("PLOT_NOT_FOUND");
    }
    async delete(id) {
        this.plotMap.delete(id);
        return;
    }
}
exports.InMemoryPlotRepository = InMemoryPlotRepository;
