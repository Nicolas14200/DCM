import 'reflect-metadata';
import { Plot } from "../../domain/entities/plot/Plot"
import { InMemoryPlotRepository } from "../adapters/inMemory/InMemoryPlotRepository"
import { DeletePlot } from "../../usecase/plot/DeletePlot"
describe("Unit - DeletePlot", () => {
    it('Should delete a plot', async () => {
        const plotRepo: InMemoryPlotRepository = new InMemoryPlotRepository(new Map());
        const deletePlot: DeletePlot = new DeletePlot(plotRepo)
        const plot: Plot = Plot.create({
            name: "Parcelle 0002",
            codeName: "azerty",
            heigth: 10,
            width: 5,
            pebbles: 1,
            ph: 1,
            plank: 50,
        })
        await plotRepo.save(plot);
        await deletePlot.execute(plot.props.id);
        const userExist = plotRepo.getById(plot.props.id)
        expect(userExist).rejects.toThrow("PLOT_NOT_FOUND");
    })
})