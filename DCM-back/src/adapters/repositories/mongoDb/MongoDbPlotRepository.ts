import "reflect-metadata";
import { injectable } from "inversify";
import { Plot } from "../../../core/domain/entities/plot/Plot";
import { PlotRepository } from "../../../core/domain/repositories/PlotRepository";
import {
  MongoDbPlotMapper,
  MongoDbPlotMapperProps,
} from "./mappers/MongoDbPlotMapper";
import { PlotModel } from "./models/PlotModel";
import { PlotError } from "../../../core/domain/models/errors/PlotError";
import { Series } from "../../../core/domain/valueObjects/Series";

@injectable()
export class MongoDbPlotRepository implements PlotRepository {
  private mongoDbPlotMapper: MongoDbPlotMapper = new MongoDbPlotMapper();

  async getAll(): Promise<Plot[]> {
    const allPlot: MongoDbPlotMapperProps[] = await PlotModel.find();
    return allPlot.map((plot: MongoDbPlotMapperProps) => {
      return this.mongoDbPlotMapper.toDomain(plot);
    });
  }

  async save(plot: Plot): Promise<Plot> {
    const plotModel = new PlotModel({
      id: plot.props.id,
      name: plot.props.name,
      codeName: plot.props.codeName,
      width: plot.props.width,
      heigth: plot.props.heigth,
      area: plot.props.area,
      ph: plot.props.ph,
      pebbles: plot.props.pebbles,
      plank: plot.props.plank,
      series: plot.props.series.map((elem) => elem),
      subPlot: plot.props.subPlot,
      eventCulture: plot.props.eventCulture.map((elem) => elem),
    });

    plotModel.save();

    return new Plot({
      id: plotModel.id,
      name: plotModel.name,
      codeName: plotModel.codeName,
      width: plotModel.width,
      heigth: plotModel.heigth,
      area: plotModel.area,
      ph: plotModel.ph,
      pebbles: plotModel.pebbles,
      plank: plotModel.plank,
      series: plotModel.series.map((elem) => elem) as Series[],
      subPlot: plot.props.subPlot.map((elem) => elem),
      eventCulture: plotModel.eventCulture.map((elem) => elem),
    });
  }

  async update(plot: Plot): Promise<Plot> {
    const plotToUpdate: MongoDbPlotMapperProps =
      await PlotModel.findOneAndUpdate(
        {
          id: plot.props.id,
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
            series: plot.props.series.map((elem) => elem) as Series[],
            subPlot: plot.props.subPlot.map((elem) => elem),
            eventCulture: plot.props.eventCulture.map((elem) => elem),
          },
        },
        {
          upsert: true,
        }
      );
    if (!plotToUpdate) {
      return null;
    }
    return this.mongoDbPlotMapper.toDomain(plotToUpdate);
  }

  async getById(id: string): Promise<Plot> {
    const plot: MongoDbPlotMapperProps = await PlotModel.findOne({
      id: id,
    });
    if (!plot) {
      return null;
    }
    return this.mongoDbPlotMapper.toDomain(plot);
  }

  async getByCodeName(codeName: string): Promise<Plot> {
    const plot: MongoDbPlotMapperProps = await PlotModel.findOne({
      codeName: codeName,
    });
    if (!plot) {
      return null;
    }
    return this.mongoDbPlotMapper.toDomain(plot);
  }

  async delete(id: string): Promise<boolean> {
    await PlotModel.findOneAndDelete({ id });
    return true;
  }
}
