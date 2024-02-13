"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbEventCultureRepository = void 0;
require("reflect-metadata");
const MongoDbEventCultureMapper_1 = require("./mappers/MongoDbEventCultureMapper");
const EventCultureModel_1 = require("./models/EventCultureModel");
const EventCulture_1 = require("../../../core/domain/entities/eventCulture/EventCulture");
const inversify_1 = require("inversify");
let MongoDbEventCultureRepository = class MongoDbEventCultureRepository {
    mongoDbEventCultureMapper = new MongoDbEventCultureMapper_1.MongoDbEventCultureMapper();
    async delete(id) {
        await EventCultureModel_1.EventCultureModel.findOneAndDelete({ id });
        return true;
    }
    async getEventCultureByPlotId(plotId) {
        const results = await EventCultureModel_1.EventCultureModel.find({
            plotId: plotId
        });
        const eventCultureArray = results.map((result) => this.mongoDbEventCultureMapper.toDomain(result));
        return eventCultureArray;
    }
    async save(eventCulture) {
        const eventCultureModel = new EventCultureModel_1.EventCultureModel({
            id: eventCulture.props.id,
            date: eventCulture.props.date,
            note: eventCulture.props.note,
            plotId: eventCulture.props.plotId,
            machine: eventCulture.props.machine,
            typeEventCulture: eventCulture.props.typeEventCulture,
            bringType: eventCulture.props.bringType,
            quantity: eventCulture.props.quantity,
            vegetable: eventCulture.props.vegetable,
            method: eventCulture.props.method,
            nbHuman: eventCulture.props.nbHuman,
            nbHours: eventCulture.props.nbHours,
            succes: eventCulture.props.succes,
            disease: eventCulture.props.disease,
            bug: eventCulture.props.bug,
        });
        await eventCultureModel.save();
        return new EventCulture_1.EventCulture({
            id: eventCultureModel.id,
            date: eventCultureModel.date,
            note: eventCultureModel.note,
            plotId: eventCultureModel.plotId,
            machine: eventCultureModel.machine,
            typeEventCulture: eventCultureModel.typeEventCulture,
            bringType: eventCultureModel.bringType,
            quantity: eventCultureModel.quantity,
            vegetable: eventCultureModel.vegetable,
            method: eventCultureModel.method,
            nbHuman: eventCultureModel.nbHuman,
            nbHours: eventCultureModel.nbHours,
            succes: eventCultureModel.succes,
            disease: eventCultureModel.disease,
            bug: eventCultureModel.bug,
        });
    }
    async getById(id) {
        const result = await EventCultureModel_1.EventCultureModel.findOne({
            id: id
        });
        if (result) {
            return this.mongoDbEventCultureMapper.toDomain(result);
        }
        return null;
    }
    async update(eventCulture) {
        await EventCultureModel_1.EventCultureModel.findOneAndUpdate({
            id: eventCulture.props.id
        }, {
            $set: {
                id: eventCulture.props.id,
                date: eventCulture.props.date,
                note: eventCulture.props.note,
                plotId: eventCulture.props.plotId,
                machine: eventCulture.props.machine,
                typeEventCulture: eventCulture.props.typeEventCulture,
                bringType: eventCulture.props.bringType,
                quantity: eventCulture.props.quantity,
                vegetable: eventCulture.props.vegetable,
                method: eventCulture.props.method,
                nbHuman: eventCulture.props.nbHuman,
                nbHours: eventCulture.props.nbHours,
                succes: eventCulture.props.succes,
                disease: eventCulture.props.disease,
                bug: eventCulture.props.bug,
            }
        }, {
            upsert: true,
        });
        return eventCulture;
    }
};
exports.MongoDbEventCultureRepository = MongoDbEventCultureRepository;
exports.MongoDbEventCultureRepository = MongoDbEventCultureRepository = __decorate([
    (0, inversify_1.injectable)()
], MongoDbEventCultureRepository);
