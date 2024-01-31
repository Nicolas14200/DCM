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
const MongoDbPlotMapper_1 = require("./mappers/MongoDbPlotMapper");
const PlotModel_1 = require("./models/PlotModel");
const PlotError_1 = require("../../../core/domain/models/errors/PlotError");
let MongoDbPlotRepository = class MongoDbPlotRepository {
    mongoDbPlotMapper = new MongoDbPlotMapper_1.MongoDbPlotMapper();
    async getAll() {
        const allPlot = await PlotModel_1.PlotModel.find();
        return allPlot.map((plot) => {
            return this.mongoDbPlotMapper.toDomain(plot);
        });
    }
    async save(plot) {
        const plotModelmapped = this.mongoDbPlotMapper.fromDomain(plot);
        try {
            await PlotModel_1.PlotModel.findOneAndUpdate({
                id: plot.props.id
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
                    series: plot.props.series,
                    subPlot: plot.props.subPlot,
                    eventCulture: plotModelmapped.eventCulture.map((elem) => elem)
                }
            }, {
                upsert: true,
            });
            return plot;
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async update(plot) {
        const plotModelmapped = this.mongoDbPlotMapper.fromDomain(plot);
        await PlotModel_1.PlotModel.findOneAndUpdate({
            id: plot.props.id
        }, {
            $set: {
                id: plotModelmapped.id,
                name: plotModelmapped.name,
                codeName: plotModelmapped.codeName,
                width: plotModelmapped.width,
                heigth: plotModelmapped.heigth,
                area: plotModelmapped.area,
                ph: plotModelmapped.ph,
                pebbles: plotModelmapped.pebbles,
                plank: plotModelmapped.plank,
                series: plotModelmapped.series,
                subPlot: plotModelmapped.subPlot,
                eventCulture: plotModelmapped.eventCulture.map((elem) => elem)
            }
        }, {
            upsert: true,
        });
        return plot;
    }
    async getById(id) {
        const plot = await PlotModel_1.PlotModel.findOne({
            id: id
        });
        if (plot) {
            return this.mongoDbPlotMapper.toDomain(plot);
        }
    }
    async getByCodeName(codeName) {
        const plot = await PlotModel_1.PlotModel.findOne({
            codeName: codeName
        });
        if (plot) {
            return this.mongoDbPlotMapper.toDomain(plot);
        }
        throw new PlotError_1.PlotError.GetByCodeNameFailed("PLOT_NOT_FOUND");
    }
    async delete(id) {
        await PlotModel_1.PlotModel.findOneAndDelete({ id });
    }
};
MongoDbPlotRepository = __decorate([
    (0, inversify_1.injectable)()
], MongoDbPlotRepository);
exports.MongoDbPlotRepository = MongoDbPlotRepository;
