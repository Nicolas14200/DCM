import { Series } from "../valuesObject/Series";

export interface PlotModel {
    id:string;
    name: string;
    codeName: string;
    width: number;
    heigth: number;
    area: number;
    ph: number;
    pebbles: number;
    plank: number;
    series: Series[];
    subPlot: string[];
    eventCulture: string[];
}