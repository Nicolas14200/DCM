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
exports.GetPlotById = void 0;
const inversify_1 = require("inversify");
const DCMIdentifiers_1 = require("../DCMIdentifiers");
const PlotError_1 = require("../../domain/models/errors/PlotError");
let GetPlotById = class GetPlotById {
    _plotRepository;
    constructor(_plotRepository) {
        this._plotRepository = _plotRepository;
    }
    async execute(id) {
        const plot = await this._plotRepository.getById(id);
        if (!plot) {
            throw new PlotError_1.PlotError.GetByIdFailed("Get by id failed");
        }
        return plot;
    }
    async canExecute(identity) {
        if (identity.role === "ADMIN" || identity.role === "PROLO") {
            return true;
        }
        return false;
    }
};
exports.GetPlotById = GetPlotById;
exports.GetPlotById = GetPlotById = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(DCMIdentifiers_1.DCMIdentifiers.plotRepository)),
    __metadata("design:paramtypes", [Object])
], GetPlotById);
