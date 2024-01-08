import { IsString } from "class-validator";
export class AddSubPlotCommand {
    
    @IsString()
    currentId: string;

    @IsString()
    plotIdToAdd: string;
}