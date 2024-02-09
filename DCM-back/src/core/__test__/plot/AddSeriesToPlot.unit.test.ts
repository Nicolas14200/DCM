import "reflect-metadata";
import { Plot } from "../../domain/entities/plot/Plot";
import { InMemoryPlotRepository } from "../adapters/inMemory/InMemoryPlotRepository";
import { Series } from "../../domain/valueObjects/Series";
import { AddSeriesToPlot } from "../../usecase/plot/AddSeriesToPlot";

describe("Unit - AddSeriesToPlot", () => {
  let plot: Plot;
  let plotRepo: InMemoryPlotRepository;
  let series: Series;
  let addSeriesToPlot: AddSeriesToPlot;

  beforeAll(async () => {
    plotRepo = new InMemoryPlotRepository(new Map());
    addSeriesToPlot = new AddSeriesToPlot(plotRepo);
    plot = Plot.create({
      name: "Parcelle 0001",
      codeName: "code alpha romero bétasoid",
      heigth: 10,
      width: 5,
      pebbles: 1,
      ph: 1,
      plank: 50,
    });
    series = {
      nbPlank: 10,
      vegetableVariety: "CARROTE",
    };
    await plotRepo.save(plot);
    await addSeriesToPlot.execute({
      plotId: plot.props.id,
      series: series,
    });
  });
  
  it("Should Add a series to a plot", async () => {
    const newPlot = await plotRepo.getById(plot.props.id);
    expect(newPlot.props.series[0].vegetableVariety).toEqual("CARROTE");
  });
});
