import { IsString } from "class-validator";
export class GetEventsCulturesByPlotIdCommand {
    @IsString()
    plotId: string
}