import 'reflect-metadata';
import { Plot } from "../../domain/entities/plot/Plot";
import { InMemoryPlotRepository } from "../adapters/inMemory/InMemoryPlotRepository";

describe("Unit - AddSubPlot", () => {

    let plot1: Plot;
    let plot2: Plot;
    let plotRepo: InMemoryPlotRepository;

    beforeAll(async () => {
        plotRepo = new InMemoryPlotRepository(new Map())
        plot1 = Plot.create({
            name: "Parcelle 0001",
            codeName: "code alpha romero bétasoid",
            heigth: 10,
            width: 5,
            pebbles: 1,
            ph: 1,
            plank: 50,
        });

        plot2 = Plot.create({
            name: "Parcelle 0002",
            codeName: "code alpha romero bétasoid",
            heigth: 10,
            width: 5,
            pebbles: 1,
            ph: 1,
            plank: 50,
        });

        await plotRepo.save(plot1);
        await plotRepo.save(plot2);
    })

    it("Should add a id to the subPlot array of a plot", async () => {
        plot1.addSubPlot(plot2.props.id);
        await plotRepo.save(plot1);
        expect(plot1.props.subPlot[0]).toEqual(plot2.props.id)
    })
})