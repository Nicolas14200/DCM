import "reflect-metadata";
import { EventCulture } from "../../domain/entities/eventCulture/EventCulture";
import { Plot } from "../../domain/entities/plot/Plot";
import { InMemoryPlotRepository } from "../adapters/inMemory/InMemoryPlotRepository";
import { InMemoryEventCultureRepository } from "../adapters/inMemory/InMemoryEventCultureRepository";
import { GetEventsCulturesByPlotId } from "../../usecase/eventCulture/GetEventsCulturesByPlotId";
import { EventCultureError } from "../../domain/models/errors/EventCultureError";

describe("Unit - GetEventsCulturesByPlotId", () => {
  let plotRepo: InMemoryPlotRepository;
  let plot: Plot;

  let eventCultureRepo: InMemoryEventCultureRepository;
  let eventCulture: EventCulture;

  let getEventsCulturesByPlotId: GetEventsCulturesByPlotId;

  beforeAll(async () => {
    plotRepo = new InMemoryPlotRepository(new Map());
    eventCultureRepo = new InMemoryEventCultureRepository(new Map());
    getEventsCulturesByPlotId = new GetEventsCulturesByPlotId(eventCultureRepo);

    plot = Plot.create({
      name: "Parcelle 0001",
      codeName: "code alpha romero bétasoid",
      heigth: 10,
      width: 5,
      pebbles: 1,
      ph: 1,
      plank: 50,
    });
    await plotRepo.save(plot);

    eventCulture = EventCulture.create({
      note: "NOTE",
      plotId: plot.props.id,
    });
    await eventCultureRepo.save(eventCulture);
  });
  it("Should return an array of event culture with a plot ID", async () => {
    const result = await getEventsCulturesByPlotId.execute(plot.props.id);
    expect(result[0].props.note).toEqual("NOTE");
  });

  it("Should return a error if deleted plot failed", async () => {
    const result = getEventsCulturesByPlotId.execute("FAKE_ID");
    expect(result).rejects.toThrow(EventCultureError.NoEventCulture);
  });
});
