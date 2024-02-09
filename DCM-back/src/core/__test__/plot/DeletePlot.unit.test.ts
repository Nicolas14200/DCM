import "reflect-metadata";
import { Plot } from "../../domain/entities/plot/Plot";
import { InMemoryPlotRepository } from "../adapters/inMemory/InMemoryPlotRepository";
import { DeletePlot } from "../../usecase/plot/DeletePlot";
import { PlotError } from "../../domain/models/errors/PlotError";

describe("Unit - DeletePlot", () => {
  let plotRepo: InMemoryPlotRepository;
  let deletePlot: DeletePlot;

  beforeAll(() => {
    plotRepo = new InMemoryPlotRepository(new Map());
    deletePlot = new DeletePlot(plotRepo);
  });

  it("Should delete a plot", async () => {
    const plot: Plot = Plot.create({
      name: "Parcelle 0002",
      codeName: "azerty",
      heigth: 10,
      width: 5,
      pebbles: 1,
      ph: 1,
      plank: 50,
    });
    await plotRepo.save(plot);
    const result = await deletePlot.execute(plot.props.id);
    expect(result).toEqual(true);
  });

  
  it("Should return a error if plot not exist", async () => {
    const result = deletePlot.execute("fake id");
    expect(result).rejects.toThrow(PlotError.PlotDeleteFailed)
  });
});
