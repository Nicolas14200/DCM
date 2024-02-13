"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbPlotRepository = void 0;
require("reflect-metadata");
const inversify_1 = require("inversify");
const Plot_1 = require("../../../core/domain/entities/plot/Plot");
const MongoDbPlotMapper_1 = require("./mappers/MongoDbPlotMapper");
const PlotModel_1 = require("./models/PlotModel");
let MongoDbPlotRepository = class MongoDbPlotRepository {
    mongoDbPlotMapper = new MongoDbPlotMapper_1.MongoDbPlotMapper();
    async getAll() {
        const allPlot = await PlotModel_1.PlotModel.find();
        return allPlot.map((plot) => {
            return this.mongoDbPlotMapper.toDomain(plot);
        });
    }
    async save(plot) {
        const plotModel = new PlotModel_1.PlotModel({
            id: plot.props.id,
            name: plot.props.name,
            codeName: plot.props.codeName,
            width: plot.props.width,
            heigth: plot.props.heigth,
            area: plot.props.area,
            ph: plot.props.ph,
            pebbles: plot.props.pebbles,
            plank: plot.props.plank,
            series: plot.props.series.map((elem) => elem),
            subPlot: plot.props.subPlot,
            eventCulture: plot.props.eventCulture.map((elem) => elem),
        });
        plotModel.save();
        return new Plot_1.Plot({
            id: plotModel.id,
            name: plotModel.name,
            codeName: plotModel.codeName,
            width: plotModel.width,
            heigth: plotModel.heigth,
            area: plotModel.area,
            ph: plotModel.ph,
            pebbles: plotModel.pebbles,
            plank: plotModel.plank,
            series: plotModel.series.map((elem) => elem),
            subPlot: plotModel.subPlot,
            eventCulture: plotModel.eventCulture.map((elem) => elem),
        });
    }
    async update(plot) {
        const plotToUpdate = await PlotModel_1.PlotModel.findOneAndUpdate({
            id: plot.props.id,
        }, {
            $set: {
                id: plot.props.id,
                name: plot.props.name,
                codeName: plot.props.codeName,
                width: plot.props.width,
                heigth: plot.props.heigth,
                area: plot.props.area,
                ph: plot.props.ph,
                pebbles: plot.props.pebbles,
                plank: plot.props.plank,
                series: plot.props.series.map((elem) => elem),
                subPlot: plot.props.subPlot,
                eventCulture: plot.props.eventCulture.map((elem) => elem),
            },
        }, {
            upsert: true,
        });
        if (!plotToUpdate) {
            return null;
        }
        return this.mongoDbPlotMapper.toDomain(plotToUpdate);
    }
    async getById(id) {
        const plot = await PlotModel_1.PlotModel.findOne({
            id: id,
        });
        if (!plot) {
            return null;
        }
        return this.mongoDbPlotMapper.toDomain(plot);
    }
    async getByCodeName(codeName) {
        const plot = await PlotModel_1.PlotModel.findOne({
            codeName: codeName,
        });
        if (!plot) {
            return null;
        }
        return this.mongoDbPlotMapper.toDomain(plot);
    }
    async delete(id) {
        await PlotModel_1.PlotModel.findOneAndDelete({ id });
        return true;
    }
};
exports.MongoDbPlotRepository = MongoDbPlotRepository;
exports.MongoDbPlotRepository = MongoDbPlotRepository = __decorate([
    (0, inversify_1.injectable)()
], MongoDbPlotRepository);
