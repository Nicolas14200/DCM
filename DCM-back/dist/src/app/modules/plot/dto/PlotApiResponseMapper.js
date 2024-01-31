"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotApiResponseMapper = void 0;
class PlotApiResponseMapper {
    fromDomain(plot) {
        return {
            id: plot.props.id,
            name: plot.props.name,
            codeName: plot.props.codeName,
            width: plot.props.width,
            heigth: plot.props.heigth,
            area: plot.props.area,
            ph: plot.props.ph,
            pebbles: plot.props.pebbles,
            plank: plot.props.plank,
            series: plot.props.series,
            subPlot: plot.props.subPlot,
            eventCulture: plot.props.eventCulture.map((event) => {
                return event;
            })
        };
    }
}
exports.PlotApiResponseMapper = PlotApiResponseMapper;
