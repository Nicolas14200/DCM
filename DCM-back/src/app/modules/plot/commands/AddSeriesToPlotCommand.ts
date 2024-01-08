import { IsString, IsNumber } from "class-validator";

class SeriesCommand {
    @IsNumber()
    nbPlank: number
    @IsString()
    vegetableVariety: string
}
export class AddSeriesToPlotCommand {
    
    @IsString()
    plotId: string;

    series: SeriesCommand;
}