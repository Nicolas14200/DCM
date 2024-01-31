"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plot = void 0;
const uuid_1 = require("uuid");
class Plot {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        return new Plot({
            ...props,
            id: (0, uuid_1.v4)(),
            area: props.width * props.heigth,
            series: [],
            subPlot: [],
            eventCulture: [],
        });
    }
    update(props) {
        this.props.name = props.name,
            this.props.codeName = props.codeName,
            this.props.ph = props.ph,
            this.props.pebbles = props.pebbles,
            this.props.plank = props.plank,
            this.props.width = props.width,
            this.props.heigth = props.heigth;
    }
    addEventCulture(newEventCultureId) {
        this.props.eventCulture.push(newEventCultureId);
    }
    addSeries(series) {
        this.props.series.push(series);
    }
    addSubPlot(plotId) {
        this.props.subPlot.push(plotId);
    }
}
exports.Plot = Plot;
