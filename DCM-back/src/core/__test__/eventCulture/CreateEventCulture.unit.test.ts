import 'reflect-metadata';
import { InMemoryEventCultureRepository } from "../adapters/inMemory/InMemoryEventCultureRepository";
import { InMemoryPlotRepository } from "../adapters/inMemory/InMemoryPlotRepository";
import { CreateEventCulture } from "../../usecase/eventCulture/CreateEventCulture";
import { Plot } from '../../domain/entities/plot/Plot';
import { EventCulture } from '../../domain/entities/eventCulture/EventCulture';
import { v4 } from 'uuid';

describe("Unit - CreateEventCulture", () => {
    let eventCultureRepo: InMemoryEventCultureRepository;
    let plotRepo: InMemoryPlotRepository;
    let createEventCulture: CreateEventCulture;
    let plot: Plot;
    let eventCulture: EventCulture;
    beforeAll(async ()=> {
        eventCultureRepo = new InMemoryEventCultureRepository(new Map());
        plotRepo = new InMemoryPlotRepository(new Map());
        createEventCulture = new CreateEventCulture(eventCultureRepo, plotRepo);
        plot  = Plot.create({
            name: "Parcelle 0001",
            codeName: v4(),
            heigth: 10,
            width: 5,
            pebbles: 1,
            ph: 1,
            plank: 50,
        })
        await plotRepo.save(plot)
        eventCulture = await createEventCulture.execute({
            note: "First Note",
            plotId: plot.props.id,
        })
    })

    it("Should create an Event Culture", async () =>{
        const eventCultureExist = await eventCultureRepo.getById(eventCulture.props.id);
        expect(eventCulture.props.note).toEqual("First Note")
    })

    it('Should push the event culture in the plot', async () => {
        const eventCulture2 = await createEventCulture.execute({
            note: "second Note",
            plotId: plot.props.id,
        })
        const getEventcultureInPlot = await plotRepo.getById(plot.props.id);
        
        expect(getEventcultureInPlot.props.eventCulture[0]).toEqual(eventCulture.props.id)
        expect(getEventcultureInPlot.props.eventCulture[1]).toEqual(eventCulture2.props.id)
    })

})