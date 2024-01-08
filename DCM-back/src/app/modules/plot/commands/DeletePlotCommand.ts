import { IsString } from "class-validator";
export class DeletePlotCommand {
    
    @IsString()
    id: string;
}