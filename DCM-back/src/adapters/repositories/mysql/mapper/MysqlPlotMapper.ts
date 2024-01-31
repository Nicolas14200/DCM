import { Series } from "../../../../core/domain/valueObjects/Series";
import { Mapper } from "../../../../core/domain/Mapper";
import { Plot } from "../../../../core/domain/entities/plot/Plot";

export interface MysqlPlotMapperProps {
    codeName: string,
    area: number,
    eventCulture: [],
    id: string,
    name: string,
    subPlot: string[],
    heigth:number,
    pebbles: number,
    ph: number,
    plank: number,
    width: number,
    series: Series[]
}

export class MysqlPlotMapper implements Mapper< Plot, MysqlPlotMapperProps >{
    toDomain(raw: MysqlPlotMapperProps): Plot {
        return new Plot({
            codeName: raw.codeName,
            area: raw.area,
            id: raw.id,
            name: raw.name,
            subPlot: raw.subPlot,
            heigth:raw.heigth,
            pebbles: raw.pebbles,
            ph: raw.ph,
            plank: raw.plank,
            width: raw.width,
            eventCulture: [],
            series: []
        })
    }
}