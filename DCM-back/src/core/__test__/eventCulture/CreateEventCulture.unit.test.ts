import "reflect-metadata";
import { InMemoryEventCultureRepository } from "../adapters/inMemory/InMemoryEventCultureRepository";
import { InMemoryPlotRepository } from "../adapters/inMemory/InMemoryPlotRepository";
import { CreateEventCulture } from "../../usecase/eventCulture/CreateEventCulture";
import { Plot } from "../../domain/entities/plot/Plot";
import { EventCulture } from "../../domain/entities/eventCulture/EventCulture";
import { v4 } from "uuid";
import { PlotError } from "../../domain/models/errors/PlotError";
import { AddEventCulture } from "../../usecase/plot/AddEventCulture";

describe("Unit - CreateEventCulture", () => {
  let eventCultureRepo: InMemoryEventCultureRepository;
  let plotRepo: InMemoryPlotRepository;
  let createEventCulture: CreateEventCulture;
  let plot: Plot;
  let eventCulture: EventCulture;
  let addEventCulture: AddEventCulture;
  
  beforeAll(async () => {
    eventCultureRepo = new InMemoryEventCultureRepository(new Map());
    plotRepo = new InMemoryPlotRepository(new Map());
    addEventCulture = new AddEventCulture(plotRepo);
    createEventCulture = new CreateEventCulture(eventCultureRepo, plotRepo, addEventCulture);
    plot = Plot.create({
      name: "Parcelle 0001",
      codeName: v4(),
      heigth: 10,
      width: 5,
      pebbles: 1,
      ph: 1,
      plank: 50,
    });
    await plotRepo.save(plot);
  });

  it("Should create an Event Culture", async () => {
    eventCulture = await createEventCulture.execute({
      note: "First Note",
      plotId: plot.props.id,
    });
    expect(eventCulture.props.note).toEqual("First Note");
    expect(eventCulture.props.plotId).toBeDefined();
  });

  it("Should return a error if plot not found", async () => {
    const result  =  createEventCulture.execute({
        note: "First Note",
        plotId: "FAKE ID",
      });
    expect(result).rejects.toThrow(PlotError.GetByIdFailed);
  });
});
