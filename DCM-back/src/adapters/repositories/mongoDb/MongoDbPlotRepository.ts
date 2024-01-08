import 'reflect-metadata';
import { injectable } from "inversify";
import { Plot } from "../../../core/domain/entities/plot/Plot";
import { PlotRepository } from "../../../core/domain/repositories/PlotRepository";
import { MongoDbPlotMapper, MongoDbPlotMapperProps } from "./mappers/MongoDbPlotMapper";
import { PlotModel } from "./models/PlotModel";
import { PlotError } from '../../../core/domain/models/errors/PlotError';

@injectable()
export class MongoDbPlotRepository implements PlotRepository {


    private mongoDbPlotMapper: MongoDbPlotMapper = new MongoDbPlotMapper()
    

    async getAll(): Promise<Plot[]> {
        const allPlot: MongoDbPlotMapperProps[] = await PlotModel.find()
        return allPlot.map((plot: MongoDbPlotMapperProps)=> {
            return this.mongoDbPlotMapper.toDomain(plot); 
        });
    }

    async save(plot: Plot): Promise<Plot> {

        const plotModelmapped = this.mongoDbPlotMapper.fromDomain(plot);
        try{
            await PlotModel.findOneAndUpdate(
                {
                    id: plot.props.id
                },
                {
                    $set: {
                        id: plot.props.id,
                        name: plot.props.name,
                        codeName: plot.props.codeName,
                        width: plot.props.width,
                        heigth: plot.props.heigth,
                        area: plot.props.area,
                        ph: plot.props.ph,
                        pebbles: plot.props.pebbles,
                        plank: plot.props.plank,
                        series: plot.props.series,
                        subPlot: plot.props.subPlot,
                        eventCulture: plotModelmapped.eventCulture.map((elem)=>elem)
                    }
                },
                {
                    upsert: true,
                }
            )
            return plot;

        }catch(e){
            throw new Error(e);
        }
    }

    async update(plot: Plot): Promise<Plot> {
        const plotModelmapped = this.mongoDbPlotMapper.fromDomain(plot);
        await PlotModel.findOneAndUpdate(
            {
                id: plot.props.id
            },
            {
                $set: {
                    id: plotModelmapped.id,
                    name: plotModelmapped.name,
                    codeName: plotModelmapped.codeName,
                    width: plotModelmapped.width,
                    heigth: plotModelmapped.heigth,
                    area: plotModelmapped.area,
                    ph: plotModelmapped.ph,
                    pebbles: plotModelmapped.pebbles,
                    plank: plotModelmapped.plank,
                    series: plotModelmapped.series,
                    subPlot: plotModelmapped.subPlot,
                    eventCulture: plotModelmapped.eventCulture.map((elem)=>elem)
                }
            },
            {
                upsert: true,
            }
        )
        return plot;
    }

    async getById(id: string): Promise<Plot> {
        const plot: MongoDbPlotMapperProps = await PlotModel.findOne({
            id: id
        });
        if (plot){
            return this.mongoDbPlotMapper.toDomain(plot);
        }
    }

    async getByCodeName(codeName: string): Promise<Plot> {
        const plot: MongoDbPlotMapperProps = await PlotModel.findOne({
            codeName: codeName
        });
        if (plot){
            return this.mongoDbPlotMapper.toDomain(plot);
        }
        throw new PlotError.GetByCodeNameFailed("PLOT_NOT_FOUND")
    }

    async delete(id: string): Promise<void> {
        await PlotModel.findOneAndDelete({id});  
    }
}