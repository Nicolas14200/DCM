import { EventCulture } from "../../../../core/domain/entities/eventCulture/EventCulture";
import { EventCultureError } from "../../../../core/domain/models/errors/EventCultureError";
import { EventCultureRepository } from "../../../../core/domain/repositories/EventCultureRepository";

export class InMemoryEventCultureRepository implements EventCultureRepository {

    constructor(readonly eventCultureMap: Map < string, EventCulture > ){}
    
    delete(id: string): void {
      this.eventCultureMap.delete(id);
    }
    
    async getEventCultureByPlotId(plotId: string): Promise<EventCulture[]> {
        let id : string = "";
        let envetCultureArray: EventCulture[] = [];
        for (const [key, value] of this.eventCultureMap.entries()) {
          if (value.props.plotId === plotId) {
            id = key;
            envetCultureArray.push(this.eventCultureMap.get(id))
          }
        }
        return envetCultureArray;
    }
    async save(eventCulture: EventCulture): Promise<EventCulture> {
        this.eventCultureMap.set(eventCulture.props.id, eventCulture);     
        return eventCulture;
    }
    async getById(id: string): Promise<EventCulture> {
        const eventCulture: EventCulture = this.eventCultureMap.get(id)
        if (!eventCulture) {
            throw new EventCultureError.GetByIdFailed("EVENT_CULTURE_NOT_FOUND")
          }
        return this.eventCultureMap.get(id);
    }

}