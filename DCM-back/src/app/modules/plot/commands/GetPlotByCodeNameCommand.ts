import { IsString } from "class-validator";
export class GetPlotByCodeNameCommand {
    
    @IsString()
    codeName: string;
}