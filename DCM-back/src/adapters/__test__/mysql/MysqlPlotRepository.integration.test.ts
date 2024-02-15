import "reflect-metadata";
import { connect } from "./connectDb";
import { MysqlPlotRepository } from "../../repositories/mysql/MysqlPlotRepository";
import { Plot } from "../../../core/domain/entities/plot/Plot";
import { v4 } from "uuid";

describe("Integration - MysqlPlotRepository", () => {
  let plotRepo: MysqlPlotRepository;
  let plot: Plot;

  beforeAll(async () => {
    plotRepo = new MysqlPlotRepository(await connect);
    plot = Plot.create({
      codeName: "ASQDE7874",
      heigth: 10,
      name: "name000001",
      pebbles: 3,
      ph: 3,
      plank: 3,
      width: 3,
    });
    await plotRepo.save(plot);
  });

  it("Should save a plot", async () => {
    const result = await plotRepo.save(plot);
    expect(result.props.codeName).toEqual("ASQDE7874");
  });

  it("Should return a plot by is code name", async () => {
    const plotExist = await plotRepo.getByCodeName(plot.props.codeName);
    expect(plotExist.props.name).toEqual("name000001");
  });

  it("Should return a plot by is id", async () => {
    const plotById = Plot.create({
      codeName: v4(),
      heigth: 10,
      name: "nameget by id" + v4(),
      pebbles: 3,
      ph: 3,
      plank: 3,
      width: 3,
    });
    await plotRepo.save(plotById);
    const plotExist = await plotRepo.getById(plotById.props.id);
    expect(plotExist.props.name).toEqual(plotById.props.name);
  });

  it("Should update a plot", async () => {
    plot.props.name = "New name";
    const result = await plotRepo.update(plot);
    expect(result.props.name).toEqual("New name");
  });

  it("Should return all plots", async () => {
    const result = await plotRepo.getAll();
    expect(result[0].props.name).toBeDefined();
  });

  it("Should delete plot", async () => {
    const result = await plotRepo.delete(plot.props.id);
    expect(result).toEqual(true);
  });

  it("Should save serie", async () => {
    const plotSeries =  Plot.create({
        codeName: v4(),
        heigth: 10,
        name: "add series",
        pebbles: 3,
        ph: 3,
        plank: 3,
        width: 3,
      });
      plotSeries.addSeries({
      nbPlank: 10,
      vegetableVariety: "carotte",
    });

    await plotRepo.save(plotSeries);
    const plotExist = await plotRepo.getByCodeName(plotSeries.props.codeName);
    expect(plotExist.props.series[0]).toBeDefined();
    expect(plotExist.props.series[0].vegetableVariety).toEqual("carotte");
  });
});
