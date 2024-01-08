import 'reflect-metadata';
import { Plot } from "../../domain/entities/plot/Plot";
import { PlotRepository } from "../../domain/repositories/PlotRepository";
import {GetAllPlot} from "../../usecase/plot/GetAllPlot"
import { InMemoryPlotRepository } from "../adapters/inMemory/InMemoryPlotRepository";

describe("GetAllPlot - Unit", () => {
    let plotRepo : PlotRepository;
    let getAllPlot: GetAllPlot;
    let plot01: Plot;
    let plot02: Plot;
    let plot03: Plot;
    beforeAll( async () => {
        plotRepo = new InMemoryPlotRepository(new Map());
        getAllPlot = new GetAllPlot(plotRepo); 
        plot01 = Plot.create({
            name: "Parcelle 0001",
            codeName: "code alpha romero bétasoid",
            heigth: 10,
            width: 5,
            pebbles: 1,
            ph: 1,
            plank: 50,
        })        
        plot02 = Plot.create({
            name: "Parcelle 0002",
            codeName: "la deuz",
            heigth: 10,
            width: 5,
            pebbles: 1,
            ph: 1,
            plank: 50,
        })
        plot03 = Plot.create({
            name: "Parcelle 0003",
            codeName: "le trois",
            heigth: 10,
            width: 5,
            pebbles: 1,
            ph: 1,
            plank: 50,
        })
        await plotRepo.save(plot01)
        await plotRepo.save(plot02)
        await plotRepo.save(plot03)

    })
    it("Should return all plots", async ()=> {
        const allPlot = await getAllPlot.execute()
        expect(allPlot[0].props.codeName).toEqual("code alpha romero bétasoid")
        expect(allPlot[1].props.codeName).toEqual("la deuz")
        expect(allPlot[2].props.codeName).toEqual("le trois")
    })
})