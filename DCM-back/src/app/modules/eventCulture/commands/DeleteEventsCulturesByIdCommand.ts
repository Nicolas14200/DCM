import { IsString } from "class-validator";
export class DeleteEventsCulturesByIdCommand {
    @IsString()
    id: string

    @IsString()
    plotId: string
}