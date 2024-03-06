import "reflect-metadata";
import { EventCulture } from "../../domain/entities/eventCulture/EventCulture";
import { InMemoryEventCultureRepository } from "../adapters/inMemory/InMemoryEventCultureRepository";
import { DeleteEventCulture } from "../../usecase/eventCulture/DeleteEventCulture";
import { EventCultureError } from "../../domain/models/errors/EventCultureError";
import { InMemoryPlotRepository } from "../adapters/inMemory/InMemoryPlotRepository";
import { Plot } from "../../domain/entities/plot/Plot";

describe("Unit - DeleteEventCulture", () => {
  let eventCultureRepo: InMemoryEventCultureRepository;
  let plotRepo: InMemoryPlotRepository;
  let deleteEventCulture: DeleteEventCulture;
  let eventCulture: EventCulture;
  let plot: Plot;

  beforeAll(async () => {
    eventCultureRepo = new InMemoryEventCultureRepository(new Map());
    plotRepo = new InMemoryPlotRepository(new Map());
    deleteEventCulture = new DeleteEventCulture(eventCultureRepo, plotRepo);
    plot = Plot.create({
      name: "Parcelle 0001",
      codeName: "code alpha romero bétasoid",
      heigth: 10,
      width: 5,
      pebbles: 1,
      ph: 1,
      plank: 50,
    });

    eventCulture = EventCulture.create({
      note: "NOTE",
      plotId: plot.props.id,
    });
    plot.props.eventCulture.push(eventCulture.props.id);
    await plotRepo.save(plot);
    await eventCultureRepo.save(eventCulture);
  });

  it("Should delete a eventCulture", async () => {

    const isDeleted = await deleteEventCulture.execute({
      id: eventCulture.props.id,
      plotId: plot.props.id
    });
    expect(plot.props.eventCulture.length).toEqual(0);
    expect(isDeleted).toEqual(true);
  });

  it("Should return a error if deleted plot failed", async () => {
    const result = deleteEventCulture.execute({
      id: "FakeId",
      plotId: plot.props.id
    });
    expect(result).rejects.toThrow(EventCultureError.DeletedEventCultureFailed);
  });
});
