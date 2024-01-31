"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbEventCultureMapper = void 0;
const EventCulture_1 = require("../../../../core/domain/entities/eventCulture/EventCulture");
class MongoDbEventCultureMapper {
    toDomain(raw) {
        return new EventCulture_1.EventCulture({
            id: raw.id,
            date: raw.date,
            note: raw.note,
            plotId: raw.plotId,
            typeEventCulture: raw.typeEventCulture,
            machine: raw.machine,
            bringType: raw.bringType,
            quantity: raw.quantity,
            vegetable: raw.vegetable,
            method: raw.method,
            nbHuman: raw.nbHuman,
            nbHours: raw.nbHours,
            succes: raw.succes,
            disease: raw.disease,
            bug: raw.bug,
        });
    }
}
exports.MongoDbEventCultureMapper = MongoDbEventCultureMapper;
