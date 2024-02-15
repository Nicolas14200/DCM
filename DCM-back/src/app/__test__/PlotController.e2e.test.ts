import "reflect-metadata";
import mongoose from "mongoose";
import express from "express";
import { configureExpress } from "../config/configureExpress";
import { MongoDbPlotRepository } from "../../adapters/repositories/mongoDb/MongoDbPlotRepository";
import { Plot } from "../../core/domain/entities/plot/Plot";
import { StarsLevel } from "../../core/domain/valueObjects/StarsLevel";
import request from "supertest";
import { CreatePlot } from "../../core/usecase/plot/CreatePlot";
import { v4 } from "uuid";
import { UpdatePlot } from "../../core/usecase/plot/UpdatePlot";
import { DeletePlot } from "../../core/usecase/plot/DeletePlot";
import { EventCulture } from "../../core/domain/entities/eventCulture/EventCulture";
import { MongoDbEventCultureRepository } from "../../adapters/repositories/mongoDb/MongoDbEventCultureRepository";
import { AddSeriesToPlot } from "../../core/usecase/plot/AddSeriesToPlot";
import { Series } from "../../core/domain/valueObjects/Series";

const app = express();

configureExpress(app);

describe("e2e - PlotController", () => {
  let plotRepo: MongoDbPlotRepository;
  let eventCultureRepo: MongoDbEventCultureRepository;
  let plot: Plot;
  let plotToDelete: Plot;
  let subPlot: Plot;
  let eventCulture: EventCulture;
  let series: Series;

  beforeAll(async () => {
    await mongoose.connect(`mongodb://127.0.0.1:27017/DCM`);
    plotRepo = new MongoDbPlotRepository();
    eventCultureRepo = new MongoDbEventCultureRepository();

    plotToDelete = Plot.create({
      name: `${v4()}`,
      codeName: `PLOT TO DELETE`,
      heigth: 1,
      width: 1,
      pebbles: StarsLevel.one,
      ph: 1,
      plank: 1,
    });
    
    plot = Plot.create({
      name: `${v4()}`,
      codeName: `QSDFG123`,
      heigth: 1,
      width: 1,
      pebbles: StarsLevel.one,
      ph: 1,
      plank: 1,
    });

    subPlot = Plot.create({
      name: `${v4()}`,
      codeName: `${v4()}`,
      heigth: 1,
      width: 1,
      pebbles: StarsLevel.one,
      ph: 1,
      plank: 1,
    });

    eventCulture = EventCulture.create({
      note: "NOTE",
      plotId: plot.props.id,
    });
    await eventCultureRepo.save(eventCulture);
    plot.addEventCulture(eventCulture.props.id);

    series = {
      nbPlank: 10,
      vegetableVariety: "COURGETTE",
    };

    await plotRepo.save(plot);
    await plotRepo.save(plotToDelete);
    await plotRepo.save(subPlot);
  });

  it("Should return 200 and return a plot by is code Name", async () => {
    await request(app)
      .post("/plot/getplotbycodename")
      .send({ 
        codeName: plot.props.codeName 
        })
      .expect((response) => {
        console.log(response.body);
        expect(response.body.props.codeName).toEqual("QSDFG123");
      })
      .expect(200);
  });
  
  it("Should return 201 and create a plot", async () => {
    await request(app)
      .post("/plot/create")
      .send({
        name: `${v4()}`,
        codeName: `${v4()}`,
        width: 10,
        heigth: 10,
        ph: 1,
        pebbles: StarsLevel.one,
        plank: 2,
      })
      .expect((response) => {
        console.log(CreatePlot.name, response.body);
      })
      .expect(201);
  });

  it("Should return 201 and update a plot", async () => {
    await request(app)
      .put("/plot/")
      .send({
        id: plot.props.id,
        codeName: "AZERTY666",
        name: "NEW_NAME",
        pebbles: plot.props.pebbles,
        ph: plot.props.ph,
        plank: plot.props.plank,
        heigth: plot.props.heigth,
        width: plot.props.width,
      })

      .expect((response) => {
        console.log(UpdatePlot.name, response.body);
      })
      .expect(201);
  });

  it("Should return 200 and a plot via is Id", async () => {
    await request(app)
      .get(`/plot/${plot.props.id}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.eventCulture[0]).toEqual(eventCulture.props.id);
      });
  });

  it("Should add a serries to an existing plot", async () => {
    await request(app)
      .post("/plot/addseries")
      .send({
        plotId: plot.props.id,
        series: {
          nbPlank: series.nbPlank,
          vegetableVariety: series.vegetableVariety,
        },
      })
      .expect((response) => {
        console.log(AddSeriesToPlot.name, response.body);
      })
      .expect(200);
  });

  it("Should delete a plot", async () => {
    await request(app)
      .delete(`/plot/${plotToDelete.props.id}`)
      .expect(200)
      .expect((response) => {
        console.log(DeletePlot.name, response.body);
      });
  });

  it("Should return 200 and add a subplot", async () => {
    await request(app)
      .post("/plot/addsubplot")
      .send({
        currentId: plot.props.id,
        plotIdToAdd: subPlot.props.id,
      })
      .expect((response) => {
        expect(response.body.props.subPlot[0]).toEqual(subPlot.props.id);
      })
      .expect(200);
  });

  it("Should return 200 and return all plot", async () => {
    await request(app)
      .post("/plot/all")
      .expect(200)
      .expect((response) => {
        expect(response.body[0].codeName).toEqual("AZERTY666");
      });
  });
  

});
