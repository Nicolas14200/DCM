import mongoose, { Connection } from "mongoose";
import { Plot } from "../../../core/domain/entities/plot/Plot";
import { MongoDbPlotRepository } from "../../repositories/mongoDb/MongoDbPlotRepository";
import { StarsLevel } from "../../../core/domain/valueObjects/StarsLevel";
import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { AddSeriesToPlot } from "../../../core/usecase/plot/AddSeriesToPlot";

describe("Integration - MongoDbPlotRepository", () => {
  let PlotRepo: MongoDbPlotRepository;
  let plot01: Plot;
  let eventCulture1: EventCulture;
  let addSeriesToPlot: AddSeriesToPlot;

  beforeAll(async () => {
    PlotRepo = new MongoDbPlotRepository();
    addSeriesToPlot = new AddSeriesToPlot(PlotRepo);
    await mongoose.connect(`mongodb://127.0.0.1:27017/DCM`);
    mongoose.createConnection(`mongodb://127.0.0.1:27017/DCM`);
    plot01 = Plot.create({
      name: "parcelle 01",
      codeName: "ASX45",
      width: 10,
      heigth: 10,
      ph: 1,
      pebbles: StarsLevel.one,
      plank: 2,
    });
    eventCulture1 = EventCulture.create({
      note: "NOTE1",
      plotId: plot01.props.id,
    });
    plot01.addEventCulture(eventCulture1.props.id);
    plot01.addSeries({
      vegetableVariety: "carotte",
      nbPlank: 10,
    });
  });

  it("Should save a plot", async () => {
    const plotExist: Plot = await PlotRepo.save(plot01);
    expect(plotExist.props.name).toEqual("parcelle 01");
    expect(plotExist.props.codeName).toEqual("ASX45");
    expect(plotExist.props.eventCulture[0]).toEqual(eventCulture1.props.id);
  });
  it("Should update a plot", async () => {
    const plotExist: Plot = await PlotRepo.update(plot01);
    expect(plotExist.props.name).toEqual("parcelle 01");
    expect(plotExist.props.codeName).toEqual("ASX45");
    expect(plotExist.props.eventCulture[0]).toEqual(eventCulture1.props.id);
  });
  it("Should return all plot", async () => {
    const allPlot: Plot[] = await PlotRepo.getAll();
    expect(allPlot[0].props.codeName).toEqual("AZERTY666");
  });

  it("Should return a plot by is id", async () => {
    const plotById: Plot = await PlotRepo.getById(plot01.props.id);
    expect(plotById.props.codeName).toEqual("ASX45");
  });

  it("Should return a plot by is codeName", async () => {
    const plotByCodeName: Plot = await PlotRepo.getByCodeName("ASX45");
    expect(plotByCodeName.props.codeName).toEqual("ASX45");
  });

  it("Should delelete a plot", async () => {
    const plotToDelete: boolean = await PlotRepo.delete(plot01.props.id);
    expect(plotToDelete).toEqual(true);
  });
});
