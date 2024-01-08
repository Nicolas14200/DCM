import 'reflect-metadata';
import { InMemoryEventCultureRepository } from "../../__test__/adapters/inMemory/InMemoryEventCultureRepository";
import { EventCulture } from "../../domain/entities/eventCulture/EventCulture";
import { GetEventCultureById } from "../../usecase/eventCulture/GetEventCultureById";

describe('Unit - GetEventCultureById', () => {
    let eventCultureRepo: InMemoryEventCultureRepository;
    let getEventCultureById: GetEventCultureById;
    let eventCulture: EventCulture;
    beforeAll(async () => {
        eventCultureRepo = new InMemoryEventCultureRepository(new Map());
        getEventCultureById = new GetEventCultureById(eventCultureRepo);
        eventCulture = EventCulture.create({
            note: "NOTE",
            plotId: "PLOT_ID",
        })
        await eventCultureRepo.save(eventCulture)
    })

    it("Should return a Event Culture By Id", async () => {
        const eventCultureExist: EventCulture = await getEventCultureById.execute(eventCulture.props.id)
        expect(eventCultureExist.props.note).toEqual("NOTE")
    })
    
})