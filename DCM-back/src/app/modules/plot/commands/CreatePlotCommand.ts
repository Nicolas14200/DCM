import { IsNumber, IsString } from "class-validator";

export class CreatePlotCommand {
    @IsString()
    name: string;

    @IsString()
    codeName: string;

    @IsNumber()
    width: number;

    @IsNumber()
    heigth: number;

    @IsNumber()
    ph: number;
    
    @IsNumber()
    pebbles: number;

    @IsNumber()
    plank: number;

}