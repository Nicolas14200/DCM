import { IsString } from "class-validator";

export class UpdateEventCultureCommand {

    @IsString()
    id: string

    @IsString()
    note: string

}