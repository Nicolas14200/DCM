import { EventCulture } from "../entities/eventCulture/EventCulture";

export interface EventCultureRepository {
    save(eventCulture: EventCulture): Promise<EventCulture>;
    getById(id: string) : Promise <EventCulture>;
    getEventCultureByPlotId(plotId: string): Promise <EventCulture[]>;
    delete(id: string): void;
}