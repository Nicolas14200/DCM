import { Series } from "../../../../core/domain/valueObjects/Series";
import { StarsLevel } from "../../../../core/domain/valueObjects/StarsLevel";

export interface PlotResponse {
    id:string;
    name: string;
    codeName: string;
    width: number;
    heigth: number;
    area: number;
    ph: number;
    pebbles: StarsLevel;
    plank: number;
    series: Series[];
    subPlot: string[];
    eventCulture: string[];
}