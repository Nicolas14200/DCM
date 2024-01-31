"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbPlotMapper = void 0;
const Plot_1 = require("../../../../core/domain/entities/plot/Plot");
class MongoDbPlotMapper {
    toDomain(raw) {
        return new Plot_1.Plot({
            id: raw.id,
            name: raw.name,
            codeName: raw.codeName,
            width: raw.width,
            heigth: raw.heigth,
            area: raw.area,
            ph: raw.ph,
            pebbles: raw.pebbles,
            plank: raw.plank,
            subPlot: raw.subPlot,
            series: raw.series.map((series) => {
                return {
                    nbPlank: series.nbPlank,
                    vegetableVariety: series.vegetableVariety,
                };
            }),
            eventCulture: raw.eventCulture.map((eventCulture) => {
                return eventCulture;
            }),
        });
    }
    fromDomain(plot) {
        return {
            area: plot.props.area,
            codeName: plot.props.codeName,
            heigth: plot.props.heigth,
            id: plot.props.id,
            name: plot.props.name,
            pebbles: plot.props.pebbles,
            ph: plot.props.ph,
            plank: plot.props.plank,
            subPlot: plot.props.subPlot,
            width: plot.props.width,
            series: plot.props.series.map((series) => {
                return {
                    nbPlank: series.nbPlank,
                    vegetableVariety: series.vegetableVariety,
                };
            }),
            eventCulture: plot.props.eventCulture.map((eventCulture) => {
                return eventCulture;
            })
        };
    }
}
exports.MongoDbPlotMapper = MongoDbPlotMapper;
