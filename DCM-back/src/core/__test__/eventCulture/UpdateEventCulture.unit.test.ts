import 'reflect-metadata';
import { EventCulture } from "../../domain/entities/eventCulture/EventCulture";
import { InMemoryEventCultureRepository } from "../adapters/inMemory/InMemoryEventCultureRepository";
import { UpdateEventCulture } from "../../usecase/eventCulture/UpdateEventCulture"

describe('Unit - UpdateEventCulture', () => {
    let eventCultureRepo: InMemoryEventCultureRepository;
    let eventCulture: EventCulture;
    let updateEventCulture: UpdateEventCulture;
    beforeAll(async () => {
        eventCultureRepo = new InMemoryEventCultureRepository(new Map());
        updateEventCulture = new UpdateEventCulture(eventCultureRepo)
        eventCulture = EventCulture.create({
            note: "NOTE",
            plotId: "PLOT_ID",
        })
        await eventCultureRepo.save(eventCulture)
    })
    
    it("Should Update a Event culture", async () => {
        await updateEventCulture.execute({
            id: eventCulture.props.id,
            note: "NEW NOTE"
        })
        const newUpdateEventCulture = await eventCultureRepo.getById(eventCulture.props.id);
        expect(newUpdateEventCulture.props.note).toEqual("NEW NOTE")
    })
})