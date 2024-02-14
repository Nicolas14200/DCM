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
            codeName:"ASQDE7874",
            heigth:10,
            name:"name000001",
            pebbles:3,
            ph:3,
            plank:3,
            width:3,
        });
        await plotRepo.save(plot);
    })

    it("Should save a plot", async () => {
        const result = await plotRepo.save(plot);
        expect(result.props.codeName).toEqual("ASQDE7874");
    })

    it("Should return a plot by is code name", async () => {
        const plotExist = await plotRepo.getByCodeName(plot.props.codeName);
        expect(plotExist.props.name).toEqual("New name");
    })

    it("Should return a plot by is id", async () => {
        const plotExist = await plotRepo.getById(plot.props.id);

          expect(plotExist.props.name).toEqual("New name");

      });

    it("Should update a plot", async () => {
        plot.props.name = "New name";
        const result = await plotRepo.update(plot);
        expect(result.props.name).toEqual("New name");
    })
})