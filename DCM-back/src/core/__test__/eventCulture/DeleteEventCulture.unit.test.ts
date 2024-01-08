import 'reflect-metadata';
import { EventCulture } from "../../domain/entities/eventCulture/EventCulture";
import { InMemoryEventCultureRepository } from "../adapters/inMemory/InMemoryEventCultureRepository";
import { DeleteEventCulture } from "../../usecase/eventCulture/DeleteEventCulture"
describe("Unit - DeleteEventCulture", () => {
    let eventCultureRepo: InMemoryEventCultureRepository;
    let deleteEventCulture: DeleteEventCulture;
    let eventCulture: EventCulture;
    beforeAll(async () => {
        eventCultureRepo = new InMemoryEventCultureRepository(new Map());
        deleteEventCulture = new DeleteEventCulture(eventCultureRepo)
        eventCulture = EventCulture.create({
            note: "NOTE",
            plotId: "PLOT_ID",
        })
        await eventCultureRepo.save(eventCulture)
    })
    it('Should delete a eventCulture', async () => {
        await deleteEventCulture.execute(eventCulture.props.id);
        const eventCultureExist = eventCultureRepo.getById(eventCulture.props.id)
        expect(eventCultureExist).rejects.toThrow("EVENT_CULTURE_NOT_FOUND");
    })
})