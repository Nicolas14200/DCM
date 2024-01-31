import 'reflect-metadata';
import {connect} from "./connectDb"
import {MysqlPlotRepository} from "../../repositories/mysql/MysqlPlotRepository";
import { Plot } from '../../../core/domain/entities/plot/Plot';

describe("Integration - MysqlPlotRepository", () => {
    let plotRepo : MysqlPlotRepository;
    let plot: Plot;

    beforeAll(async () => {
        plotRepo = new MysqlPlotRepository(await connect);
        await new Promise(resolve => setTimeout(resolve, 1000));
        plot = Plot.create({
            codeName:"ASQDE5874",
            heigth:10,
            name:"name000001",
            pebbles:3,
            ph:3,
            plank:3,
            width:3,
        })
    })

    it("Should return a plot by is code name", async () => {
        const plotExist = await plotRepo.getByCodeName("AAAA000");
        expect(plotExist.props.name).toEqual("first plot");
    })

    it("Should save a serie", async () => {
        plot.addSeries({
            vegetableVariety: "serie TEST",
            nbPlank: 56,
        })
        await plotRepo.save(plot);
        const plotVerify = await plotRepo.getByCodeName(plot.props.codeName);
        expect(plotVerify.props.series[0].vegetableVariety).toEqual("serie TEST");
    })
})