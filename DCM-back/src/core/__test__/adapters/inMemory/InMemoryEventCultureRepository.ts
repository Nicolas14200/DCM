import { EventCulture } from "../../../../core/domain/entities/eventCulture/EventCulture";
import { EventCultureRepository } from "../../../../core/domain/repositories/EventCultureRepository";

export class InMemoryEventCultureRepository implements EventCultureRepository {
  constructor(readonly eventCultureMap: Map<string, EventCulture>) {}

  async update(eventCulture: EventCulture): Promise<EventCulture> {
    const plotExist = this.eventCultureMap.set(eventCulture.props.id, eventCulture);
    if (!plotExist) {
      return null;
    }
    return this.eventCultureMap.get(eventCulture.props.id);
  }

  async delete(id: string): Promise<boolean> {
    return this.eventCultureMap.delete(id);
  }

  async getEventCultureByPlotId(plotId: string): Promise<EventCulture[]> {
    return [...this.eventCultureMap.values()].filter(
      (eventCulture) => eventCulture.props.plotId === plotId
    );
  }
  
  async save(eventCulture: EventCulture): Promise<EventCulture> {
    this.eventCultureMap.set(eventCulture.props.id, eventCulture);
    return eventCulture;
  }

  async getById(id: string): Promise<EventCulture> {
    const eventCulture: EventCulture = this.eventCultureMap.get(id);
    if (!eventCulture) {
      return null;
    }
    return this.eventCultureMap.get(id);
  }
}
