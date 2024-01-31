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
exports.EventCultureController = void 0;
const inversify_1 = require("inversify");
const routing_controllers_1 = require("routing-controllers");
const EventCultureApiResponseMapper_1 = require("./dto/EventCultureApiResponseMapper");
const CreateEventCultureCommand_1 = require("./commands/CreateEventCultureCommand");
const CreateEventCulture_1 = require("../../../core/usecase/eventCulture/CreateEventCulture");
const GetEventsCulturesByPlotIdCommand_1 = require("./commands/GetEventsCulturesByPlotIdCommand");
const GetEventsCulturesByPlotId_1 = require("../../../core/usecase/eventCulture/GetEventsCulturesByPlotId");
const GetEventsCulturesByIdCommand_1 = require("./commands/GetEventsCulturesByIdCommand");
const GetEventCultureById_1 = require("../../../core/usecase/eventCulture/GetEventCultureById");
const DeleteEventCulture_1 = require("../../../core/usecase/eventCulture/DeleteEventCulture");
const DeleteEventsCulturesByIdCommand_1 = require("./commands/DeleteEventsCulturesByIdCommand");
const UpdateEventCulture_1 = require("../../../core/usecase/eventCulture/UpdateEventCulture");
const UpdateEventCultureCommand_1 = require("./commands/UpdateEventCultureCommand");
let EventCultureController = class EventCultureController {
    _createEventCulture;
    _getEventCultureById;
    _getEventsCulturesByPlotId;
    _deleteEventCulture;
    _updateEventCulture;
    eventCultureApiResponseMapper = new EventCultureApiResponseMapper_1.EventCultureApiResponseMapper();
    constructor(_createEventCulture, _getEventCultureById, _getEventsCulturesByPlotId, _deleteEventCulture, _updateEventCulture) {
        this._createEventCulture = _createEventCulture;
        this._getEventCultureById = _getEventCultureById;
        this._getEventsCulturesByPlotId = _getEventsCulturesByPlotId;
        this._deleteEventCulture = _deleteEventCulture;
        this._updateEventCulture = _updateEventCulture;
    }
    async createEventCulture(response, cmd) {
        try {
            const eventCulture = await this._createEventCulture.execute({
                note: cmd.note,
                plotId: cmd.plotId,
                typeEventCulture: cmd.typeEventCulture,
                machine: cmd.machine,
                bringType: cmd.bringType,
                quantity: cmd.quantity,
                vegetable: cmd.vegetable,
                method: cmd.method,
                nbHuman: cmd.nbHuman,
                nbHours: cmd.nbHours,
                succes: cmd.succes,
                disease: cmd.disease,
                bug: cmd.bug,
            });
            return response.status(201).send({
                ...this.eventCultureApiResponseMapper.fromDomain(eventCulture),
            });
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
    async getEventsCulturesById(response, cmd) {
        try {
            const eventCulture = await this._getEventCultureById.execute(cmd.id);
            return response.status(200).send({
                ...this.eventCultureApiResponseMapper.fromDomain(eventCulture),
            });
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
    async getEventsCulturesByPlotId(response, cmd) {
        try {
            const eventCultureArray = await this._getEventsCulturesByPlotId.execute(cmd.plotId);
            const eventCultureResponse = eventCultureArray.map((eventCulture) => this.eventCultureApiResponseMapper.fromDomain(eventCulture));
            return response.status(200).send({
                eventCultureResponse,
            });
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
    async deleteEventCultureById(response, cmd) {
        try {
            await this._deleteEventCulture.execute(cmd.id);
            return response.sendStatus(200);
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
    async updateEventCulture(response, cmd) {
        try {
            const newEventCulture = await this._updateEventCulture.execute({
                id: cmd.id,
                note: cmd.note,
            });
            return response.status(200).send({
                ...this.eventCultureApiResponseMapper.fromDomain(newEventCulture)
            });
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
};
__decorate([
    (0, routing_controllers_1.Post)("/create"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateEventCultureCommand_1.CreateEventCultureCommand]),
    __metadata("design:returntype", Promise)
], EventCultureController.prototype, "createEventCulture", null);
__decorate([
    (0, routing_controllers_1.Post)("/getbyid"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, GetEventsCulturesByIdCommand_1.GetEventsCulturesByIdCommand]),
    __metadata("design:returntype", Promise)
], EventCultureController.prototype, "getEventsCulturesById", null);
__decorate([
    (0, routing_controllers_1.Post)("/getbyplotid"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, GetEventsCulturesByPlotIdCommand_1.GetEventsCulturesByPlotIdCommand]),
    __metadata("design:returntype", Promise)
], EventCultureController.prototype, "getEventsCulturesByPlotId", null);
__decorate([
    (0, routing_controllers_1.Delete)("/delete"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, DeleteEventsCulturesByIdCommand_1.DeleteEventsCulturesByIdCommand]),
    __metadata("design:returntype", Promise)
], EventCultureController.prototype, "deleteEventCultureById", null);
__decorate([
    (0, routing_controllers_1.Put)("/update"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateEventCultureCommand_1.UpdateEventCultureCommand]),
    __metadata("design:returntype", Promise)
], EventCultureController.prototype, "updateEventCulture", null);
EventCultureController = __decorate([
    (0, routing_controllers_1.JsonController)("/event"),
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [CreateEventCulture_1.CreateEventCulture,
        GetEventCultureById_1.GetEventCultureById,
        GetEventsCulturesByPlotId_1.GetEventsCulturesByPlotId,
        DeleteEventCulture_1.DeleteEventCulture,
        UpdateEventCulture_1.UpdateEventCulture])
], EventCultureController);
exports.EventCultureController = EventCultureController;
