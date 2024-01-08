import { IsString } from "class-validator";
export class GetEventsCulturesByIdCommand {
    @IsString()
    id: string
}