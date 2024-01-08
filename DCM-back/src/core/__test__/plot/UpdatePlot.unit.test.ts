import 'reflect-metadata';
import { InMemoryPlotRepository } from "../adapters/inMemory/InMemoryPlotRepository";
import { Plot } from "../../domain/entities/plot/Plot";
import { UpdatePlot } from "../../usecase/plot/UpdatePlot"

describe("Unit - UpdatePlot", () => {
    let plotRepo: InMemoryPlotRepository;
    let plot: Plot;
    let updatePlot: UpdatePlot;

    beforeAll(async () => {
        plotRepo = new InMemoryPlotRepository(new Map())
        updatePlot = new UpdatePlot(plotRepo)
        plot = Plot.create({
            name: "Parcelle 0001",
            codeName: "code alpha romero bétasoid",
            heigth: 10,
            width: 5,
            pebbles: 1,
            ph: 1,
            plank: 50,
        })
        await plotRepo.save(plot)
    })
    it ("Should Update a plot", async () => {
        const plotUpdate: Plot = await updatePlot.execute({
            id: plot.props.id,
            name: "Name Update"
        })
        expect(plotUpdate.props.name).toEqual("Name Update")
    })
})