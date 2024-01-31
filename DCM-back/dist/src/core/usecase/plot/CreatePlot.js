"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePlot = void 0;
const Plot_1 = require("../../../core/domain/entities/plot/Plot");
const inversify_1 = require("inversify");
const DCMIdentifiers_1 = require("../DCMIdentifiers");
const PlotError_1 = require("../../../core/domain/models/errors/PlotError");
let CreatePlot = class CreatePlot {
    _plotRepository;
    constructor(_plotRepository) {
        this._plotRepository = _plotRepository;
    }
    async execute(payload) {
        try {
            const plotExist = await this._plotRepository.getByCodeName(payload.codeName);
            if (plotExist) {
                throw new PlotError_1.PlotError.PlotExist("PLOT_EXIST");
            }
        }
        catch (e) {
            if (e.message === "PLOT_NOT_FOUND") {
                const plot = Plot_1.Plot.create({
                    name: payload.name,
                    codeName: payload.codeName,
                    width: payload.width,
                    heigth: payload.heigth,
                    ph: payload.ph,
                    pebbles: payload.pebbles,
                    plank: payload.plank,
                });
                await this._plotRepository.save(plot);
                return plot;
            }
            throw e;
        }
    }
    async canExecute(identity) {
        if (identity.role === "ADMIN" || identity.role === "PROLO") {
            return true;
        }
        return false;
    }
};
CreatePlot = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(DCMIdentifiers_1.DCMIdentifiers.plotRepository)),
    __metadata("design:paramtypes", [Object])
], CreatePlot);
exports.CreatePlot = CreatePlot;
