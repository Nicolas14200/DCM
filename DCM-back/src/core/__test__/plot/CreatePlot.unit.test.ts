import "reflect-metadata";
import { PlotRepository } from "../../domain/repositories/PlotRepository";
import { InMemoryPlotRepository } from "../adapters/inMemory/InMemoryPlotRepository";
import { CreatePlot } from "../../usecase/plot/CreatePlot";
import { Plot } from "../../domain/entities/plot/Plot";
import { PlotError } from "../../domain/models/errors/PlotError";

describe("Unit - createPlot", () => {
  let plotRepo: PlotRepository;
  let createPlot: CreatePlot;
  beforeAll(() => {
    plotRepo = new InMemoryPlotRepository(new Map());
    createPlot = new CreatePlot(plotRepo);
  });

  it("Should create a plot and save him in memory", async () => {
    const plot = await createPlot.execute({
      name: "Parcelle 0001",
      codeName: "code alpha romero bétasoid",
      heigth: 10,
      width: 5,
      pebbles: 1,
      ph: 1,
      plank: 50,
    });
    const plotExist: Plot = await plotRepo.getById(plot.props.id);
    expect(plotExist.props.name).toEqual("Parcelle 0001");
  });

  it("Should return an error if plot exist", async () => {
    await createPlot.execute({
      name: "Parcelle 0002",
      codeName: "azerty",
      heigth: 10,
      width: 5,
      pebbles: 1,
      ph: 1,
      plank: 50,
    });
    const plot = createPlot.execute({
      name: "Parcelle 0002",
      codeName: "azerty",
      heigth: 10,
      width: 5,
      pebbles: 1,
      ph: 1,
      plank: 50,
    });
    await expect(plot).rejects.toThrow(PlotError.PlotExist);
  });
});
