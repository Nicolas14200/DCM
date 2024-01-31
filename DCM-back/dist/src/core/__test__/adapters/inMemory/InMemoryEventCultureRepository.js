"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryEventCultureRepository = void 0;
const EventCultureError_1 = require("../../../../core/domain/models/errors/EventCultureError");
class InMemoryEventCultureRepository {
    eventCultureMap;
    constructor(eventCultureMap) {
        this.eventCultureMap = eventCultureMap;
    }
    delete(id) {
        this.eventCultureMap.delete(id);
    }
    async getEventCultureByPlotId(plotId) {
        let id = "";
        let envetCultureArray = [];
        for (const [key, value] of this.eventCultureMap.entries()) {
            if (value.props.plotId === plotId) {
                id = key;
                envetCultureArray.push(this.eventCultureMap.get(id));
            }
        }
        return envetCultureArray;
    }
    async save(eventCulture) {
        this.eventCultureMap.set(eventCulture.props.id, eventCulture);
        return eventCulture;
    }
    async getById(id) {
        const eventCulture = this.eventCultureMap.get(id);
        if (!eventCulture) {
            throw new EventCultureError_1.EventCultureError.GetByIdFailed("EVENT_CULTURE_NOT_FOUND");
        }
        return this.eventCultureMap.get(id);
    }
}
exports.InMemoryEventCultureRepository = InMemoryEventCultureRepository;
