"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPlotRepository = void 0;
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
            return null;
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
            return null;
        }
        return this.plotMap.get(plot.props.id);
    }
    async getByCodeName(codeName) {
        for (let [id, plot] of this.plotMap) {
            if (plot.props.codeName === codeName) {
                return this.plotMap.get(id);
            }
        }
        return null;
    }
    async delete(id) {
        return this.plotMap.delete(id);
    }
}
exports.InMemoryPlotRepository = InMemoryPlotRepository;
