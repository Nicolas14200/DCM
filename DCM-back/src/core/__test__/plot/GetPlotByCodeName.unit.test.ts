import 'reflect-metadata';
import { Plot } from "../../domain/entities/plot/Plot";
import { GetPlotByCodeName } from "../../usecase/plot/GetPlotByCodeName";
import { InMemoryPlotRepository } from '../adapters/inMemory/InMemoryPlotRepository';

describe('Unit - GetPlotByCodeName', () => {
    let plotRepo : InMemoryPlotRepository;
    let getPlotByCodeName: GetPlotByCodeName;
    let plot: Plot;
    beforeAll(async () => {
        plotRepo = new InMemoryPlotRepository(new Map());
        getPlotByCodeName = new GetPlotByCodeName(plotRepo);
        plot = Plot.create({
            name: "Parcelle 0001",
            codeName: "code alpha romero bétasoid",
            heigth: 10,
            width: 5,
            pebbles: 1,
            ph: 1,
            plank: 50,
        })
        await plotRepo.save(plot);
    })
    it("Should return a plot by is CodeName", async () => {
        const plotByCodeName = await getPlotByCodeName.execute("code alpha romero bétasoid")
        expect(plotByCodeName.props.name).toEqual("Parcelle 0001")
    })
})