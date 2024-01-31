"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlPlotMapper = void 0;
const Plot_1 = require("../../../../core/domain/entities/plot/Plot");
class MysqlPlotMapper {
    toDomain(raw) {
        return new Plot_1.Plot({
            codeName: raw.codeName,
            area: raw.area,
            id: raw.id,
            name: raw.name,
            subPlot: raw.subPlot,
            heigth: raw.heigth,
            pebbles: raw.pebbles,
            ph: raw.ph,
            plank: raw.plank,
            width: raw.width,
            eventCulture: [],
            series: []
        });
    }
}
exports.MysqlPlotMapper = MysqlPlotMapper;
