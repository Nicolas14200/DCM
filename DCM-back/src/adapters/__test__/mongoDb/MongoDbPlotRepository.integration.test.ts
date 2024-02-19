import mongoose from "mongoose";
import { Plot } from "../../../core/domain/entities/plot/Plot";
import { MongoDbPlotRepository } from "../../repositories/mongoDb/MongoDbPlotRepository";
import { StarsLevel } from "../../../core/domain/valueObjects/StarsLevel";

describe("Integration - MongoDbPlotRepository", () => {
  let plotRepo: MongoDbPlotRepository;
  let plot: Plot;
  let plotToUpdate: Plot;

  beforeAll(async () => {
    plotRepo = new MongoDbPlotRepository();
    await mongoose.connect(`mongodb://127.0.0.1:27017/DCM`);
    plot = Plot.create({
      name: "parcelle 01",
      codeName: "DEKF25",
      width: 10,
      heigth: 10,
      ph: 1,
      pebbles: StarsLevel.one,
      plank: 2,
    });
    plotToUpdate = Plot.create({
      name: "parcelle 01",
      codeName: "VFOR22",
      width: 10,
      heigth: 10,
      ph: 1,
      pebbles: StarsLevel.one,
      plank: 2,
    });
    await plotRepo.save(plotToUpdate);
    await plotRepo.save(plot);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("Should save a plot", async () => {
    const plot01 = Plot.create({
      name: "parcelle 02",
      codeName: "EPRK45",
      width: 10,
      heigth: 10,
      ph: 1,
      pebbles: StarsLevel.one,
      plank: 2,
    });
    const plotExist: Plot = await plotRepo.save(plot01);
    expect(plotExist.props.name).toEqual(plot01.props.name);
    expect(plotExist.props.codeName).toEqual(plot01.props.codeName);
  });

  it("Should update a plot", async () => {
    plotToUpdate.addSeries({
      vegetableVariety: "carotte",
      nbPlank: 10,
    });
    const plotExist: Plot = await plotRepo.update(plotToUpdate);
    expect(plotExist.props.series[0].vegetableVariety).toEqual(plotToUpdate.props.series[0].vegetableVariety);
  });

  it("Should return all plot", async () => {
    const allPlot: Plot[] = await plotRepo.getAll();
    expect(allPlot.length > 0).toEqual(true);
  });

  it("Should return a plot by is id", async () => {
    const plotById: Plot = await plotRepo.getById(plot.props.id);
    expect(plotById.props.name).toEqual(plot.props.name);
  });

  it("Should return a plot by is codeName", async () => {
    const plotByCodeName: Plot = await plotRepo.getByCodeName(
      plot.props.codeName
    );
    expect(plotByCodeName.props.codeName).toEqual(plot.props.codeName);
  });

  it("Should delete a plot", async () => {
    const plotToDelete: boolean = await plotRepo.delete(plot.props.id);
    expect(plotToDelete).toEqual(true);
  });


});
