import { IsNumber, IsString } from "class-validator";

export class DeleteUserCommand {
    @IsString()
    id: string;
}