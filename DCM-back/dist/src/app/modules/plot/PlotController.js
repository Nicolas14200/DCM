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
exports.PlotController = void 0;
const CreatePlot_1 = require("../../../core/usecase/plot/CreatePlot");
const inversify_1 = require("inversify");
const routing_controllers_1 = require("routing-controllers");
const CreatePlotCommand_1 = require("./commands/CreatePlotCommand");
const PlotApiResponseMapper_1 = require("./dto/PlotApiResponseMapper");
const UpdatePlotCommand_1 = require("./commands/UpdatePlotCommand");
const UpdatePlot_1 = require("../../../core/usecase/plot/UpdatePlot");
const DeletePlot_1 = require("../../../core/usecase/plot/DeletePlot");
const GetPlotById_1 = require("../../../core/usecase/plot/GetPlotById");
const AddSeriesToPlot_1 = require("../../../core/usecase/plot/AddSeriesToPlot");
const AddSeriesToPlotCommand_1 = require("./commands/AddSeriesToPlotCommand");
const AddSubPlotCommand_1 = require("./commands/AddSubPlotCommand");
const AddSubPlot_1 = require("../../../core/usecase/plot/AddSubPlot");
const MongoDbPlotRepository_1 = require("../../../adapters/repositories/mongoDb/MongoDbPlotRepository");
const DCMIdentifiers_1 = require("../../../core/usecase/DCMIdentifiers");
const GetAllPlot_1 = require("../../../core/usecase/plot/GetAllPlot");
const GetPlotByCodeName_1 = require("../../..//core/usecase/plot/GetPlotByCodeName");
const GetPlotByCodeNameCommand_1 = require("./commands/GetPlotByCodeNameCommand");
let PlotController = class PlotController {
    _createPlot;
    _updatePlot;
    _deletePlot;
    _getPlotById;
    _addSeriesToPlot;
    _addSubPlot;
    _plotRepo;
    _getAllPlot;
    _getPlotByCodeName;
    plotApiResponseMapper = new PlotApiResponseMapper_1.PlotApiResponseMapper();
    constructor(_createPlot, _updatePlot, _deletePlot, _getPlotById, _addSeriesToPlot, _addSubPlot, _plotRepo, _getAllPlot, _getPlotByCodeName) {
        this._createPlot = _createPlot;
        this._updatePlot = _updatePlot;
        this._deletePlot = _deletePlot;
        this._getPlotById = _getPlotById;
        this._addSeriesToPlot = _addSeriesToPlot;
        this._addSubPlot = _addSubPlot;
        this._plotRepo = _plotRepo;
        this._getAllPlot = _getAllPlot;
        this._getPlotByCodeName = _getPlotByCodeName;
    }
    async plot(request, response) {
        try {
            return response.statusCode = 200;
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
    async createPlot(response, cmd) {
        try {
            const payload = {
                name: cmd.name,
                codeName: cmd.codeName,
                width: cmd.width,
                heigth: cmd.heigth,
                ph: cmd.ph,
                pebbles: cmd.pebbles,
                plank: cmd.plank,
            };
            const plot = await this._createPlot.execute(payload);
            return response.status(201).send({
                ...this.plotApiResponseMapper.fromDomain(plot),
            });
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
    async updatePlot(response, cmd) {
        try {
            const plot = await this._updatePlot.execute({
                id: cmd.id,
                codeName: cmd.codeName,
                name: cmd.name,
                pebbles: cmd.pebbles,
                ph: cmd.ph,
                plank: cmd.plank,
                heigth: cmd.heigth,
                width: cmd.width,
            });
            return response.status(201).send({
                ...this.plotApiResponseMapper.fromDomain(plot),
            });
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
    async deletePlot(response, request) {
        this._deletePlot.execute(request.params.id);
        return response.sendStatus(200);
    }
    async getPlotById(response, request) {
        const plot = await this._getPlotById.execute(request.params.id);
        return response.status(200).send({
            ...this.plotApiResponseMapper.fromDomain(plot)
        });
    }
    async addSeriesToPlot(response, cmd) {
        await this._addSeriesToPlot.execute({
            plotId: cmd.plotId,
            series: {
                nbPlank: cmd.series.nbPlank,
                vegetableVariety: cmd.series.vegetableVariety,
            },
        });
        return response.sendStatus(200);
    }
    async addSubPlot(response, cmd) {
        try {
            await this._addSubPlot.execute({
                currentId: cmd.currentId,
                plotIdToAdd: cmd.plotIdToAdd
            });
            return response.status(200).send(await this._plotRepo.getById(cmd.currentId));
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
    async getAllPlot(response) {
        try {
            const allPlot = await this._getAllPlot.execute();
            return response.status(200).send(allPlot.map((plot) => {
                return this.plotApiResponseMapper.fromDomain(plot);
            }));
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
    async getPlotByCodeName(response, cmd) {
        try {
            const PlotByCodeName = await this._getPlotByCodeName.execute(cmd.codeName);
            return response.status(200).send(PlotByCodeName);
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlotController.prototype, "plot", null);
__decorate([
    (0, routing_controllers_1.Post)("/create"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreatePlotCommand_1.CreatePlotCommand]),
    __metadata("design:returntype", Promise)
], PlotController.prototype, "createPlot", null);
__decorate([
    (0, routing_controllers_1.Put)("/"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdatePlotCommand_1.UpdatePlotCommand]),
    __metadata("design:returntype", Promise)
], PlotController.prototype, "updatePlot", null);
__decorate([
    (0, routing_controllers_1.Delete)("/:id"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlotController.prototype, "deletePlot", null);
__decorate([
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PlotController.prototype, "getPlotById", null);
__decorate([
    (0, routing_controllers_1.Post)("/addseries"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, AddSeriesToPlotCommand_1.AddSeriesToPlotCommand]),
    __metadata("design:returntype", Promise)
], PlotController.prototype, "addSeriesToPlot", null);
__decorate([
    (0, routing_controllers_1.Post)("/addsubplot"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, AddSubPlotCommand_1.AddSubPlotCommand]),
    __metadata("design:returntype", Promise)
], PlotController.prototype, "addSubPlot", null);
__decorate([
    (0, routing_controllers_1.Post)("/all"),
    __param(0, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PlotController.prototype, "getAllPlot", null);
__decorate([
    (0, routing_controllers_1.Post)("/getplotbycodename"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, GetPlotByCodeNameCommand_1.GetPlotByCodeNameCommand]),
    __metadata("design:returntype", Promise)
], PlotController.prototype, "getPlotByCodeName", null);
PlotController = __decorate([
    (0, routing_controllers_1.JsonController)("/plot"),
    (0, inversify_1.injectable)(),
    __param(6, (0, inversify_1.inject)(DCMIdentifiers_1.DCMIdentifiers.plotRepository)),
    __metadata("design:paramtypes", [CreatePlot_1.CreatePlot,
        UpdatePlot_1.UpdatePlot,
        DeletePlot_1.DeletePlot,
        GetPlotById_1.GetPlotById,
        AddSeriesToPlot_1.AddSeriesToPlot,
        AddSubPlot_1.AddSubPlot,
        MongoDbPlotRepository_1.MongoDbPlotRepository,
        GetAllPlot_1.GetAllPlot,
        GetPlotByCodeName_1.GetPlotByCodeName])
], PlotController);
exports.PlotController = PlotController;
