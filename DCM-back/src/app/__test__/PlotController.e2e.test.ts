import "reflect-metadata";
import mongoose, { Connection } from "mongoose";
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
import { AddSeriesToPlot } from "../../core/usecase/plot/AddSeriesToPlot";

const app = express();

configureExpress(app);

describe("e2e - PlotController", () => {
  let plotRepo: MongoDbPlotRepository;
  let plot: Plot;
  let connection: Connection;
  
  beforeEach(async () => {
    await mongoose.connect(`mongodb://127.0.0.1:27017/DCM`);    
    connection = mongoose.createConnection("mongodb://127.0.0.1:27017/DCM");
    plotRepo = new MongoDbPlotRepository();
    plot = Plot.create({
      name: `${v4()}`,
      codeName: `QSDFG123`,
      heigth: 1,
      width: 1,
      pebbles: StarsLevel.one,
      ph: 1,
      plank: 1,
    });
    await plotRepo.save(plot);
    setTimeout(()=>{}, 50000);
  });

  afterAll(async () => {
    await connection.close();
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
        console.log(CreatePlot.name, response.error);
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

  it("Should delete a plot", async () => {
     const plotToDelete = Plot.create({
      name: `${v4()}`,
      codeName: `PLOT TO DELETE`,
      heigth: 1,
      width: 1,
      pebbles: StarsLevel.one,
      ph: 1,
      plank: 1,
    });
    await plotRepo.save(plotToDelete);
    setTimeout(()=>{}, 20000);
    await request(app)
      .delete(`/plot/${plotToDelete.props.id}`)
      .expect(200)
      .expect((response) => {
        console.log(DeletePlot.name, response.body);
      });
  });

  it("Should return 200 and a plot via is Id", async () => {
    await request(app)
      .get(`/plot/${plot.props.id}`)
      .expect(200)
      .expect((response) => {
        expect(response.body.name).toEqual(plot.props.name);
      });
  });

  it("Should return 200 and return a plot by is code Name", async () => {
    await request(app)
      .post("/plot/getplotbycodename")
      .send({ 
        codeName: plot.props.codeName 
        })
      .expect((response) => {
        console.log(response.body);
        expect(response.body.props.codeName).toEqual(plot.props.codeName );
      })
      .expect(200);
  });

  it("Should add a serries to an existing plot", async () => {
    await request(app)
      .post("/plot/addseries")
      .send({
        plotId: plot.props.id,
        series: {
          nbPlank: 10,
          vegetableVariety: "carotte",
        },
      })
      .expect((response) => {
        console.log(AddSeriesToPlot.name, response.body);
      })
      .expect(200);
  });

  it("Should return 200 and return all plot", async () => {
    await request(app)
      .post("/plot/all")
      .expect(200)
      .expect((response) => {
        expect(response.body[0].codeName).toEqual(plot.props.codeName);
      });
  });

  it("Should return 200 and add a subplot", async () => {
    await request(app)
      .post("/plot/addsubplot")
      .send({
        currentId: plot.props.id,
        plotIdToAdd: "subPlotId",
      })
      .expect(200)
  });
});


