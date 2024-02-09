import "reflect-metadata";
import { Plot } from "../../domain/entities/plot/Plot";
import { InMemoryPlotRepository } from "../adapters/inMemory/InMemoryPlotRepository";
import { AddEventCulture } from "../../usecase/plot/AddEventCulture";
import { PlotError } from "../../domain/models/errors/PlotError";

describe("Unit - AddEnventCulture", () => {
  let plot: Plot;
  let plotRepo: InMemoryPlotRepository;
  let addEventCulture: AddEventCulture;

  beforeAll(() => {
    plotRepo = new InMemoryPlotRepository(new Map());
    addEventCulture = new AddEventCulture(plotRepo);
    plot = Plot.create({
      name: "Parcelle 0001",
      codeName: "code alpha romero bétasoid",
      heigth: 10,
      width: 5,
      pebbles: 1,
      ph: 1,
      plank: 50,
    });

    plotRepo.save(plot);
  });
  it("Add event culture to a plot", async () => {
    await addEventCulture.execute({
      eventCultureId: "EVENT_CULTUR_ID",
      plotId: plot.props.id,
    });
    expect(plot.props.eventCulture[0]).toEqual("EVENT_CULTUR_ID");
  });

  it("Should return a error if plot not exist", async () => {
    const result = addEventCulture.execute({
      eventCultureId: "EVENT_CULTUR_ID",
      plotId: "FAKE_ID",
    });
    expect(result).rejects.toThrow(PlotError.GetByIdFailed);
  });
});
