import { IsNumber, IsString } from "class-validator";
import { StarsLevel } from "../../../../core/domain/valueObjects/StarsLevel";

export class UpdatePlotCommand {
    @IsString()
    id: string;

    @IsString()
    name?: string;

    @IsString()
    codeName?: string;

    @IsNumber()
    ph?: number;

    @IsNumber()
    pebbles?: StarsLevel;
    
    @IsNumber()
    plank?: number;

    @IsNumber()
    heigth?: number;

    @IsNumber()
    width?: number;
}