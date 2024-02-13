"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryEventCultureRepository = void 0;
class InMemoryEventCultureRepository {
    eventCultureMap;
    constructor(eventCultureMap) {
        this.eventCultureMap = eventCultureMap;
    }
    async update(eventCulture) {
        const plotExist = this.eventCultureMap.set(eventCulture.props.id, eventCulture);
        if (!plotExist) {
            return null;
        }
        return this.eventCultureMap.get(eventCulture.props.id);
    }
    async delete(id) {
        return this.eventCultureMap.delete(id);
    }
    async getEventCultureByPlotId(plotId) {
        return [...this.eventCultureMap.values()].filter((eventCulture) => eventCulture.props.plotId === plotId);
    }
    async save(eventCulture) {
        this.eventCultureMap.set(eventCulture.props.id, eventCulture);
        return eventCulture;
    }
    async getById(id) {
        const eventCulture = this.eventCultureMap.get(id);
        if (!eventCulture) {
            return null;
        }
        return this.eventCultureMap.get(id);
    }
}
exports.InMemoryEventCultureRepository = InMemoryEventCultureRepository;
