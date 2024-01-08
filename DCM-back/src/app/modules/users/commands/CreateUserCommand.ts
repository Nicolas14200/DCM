import { IsEmail, IsString, Length, } from "class-validator";
import { Role } from "../../../../core/domain/valueObjects/Role";

export class CreateUserCommand {

    @IsEmail()
    email: string;

    @Length(8, 30)
    password : string ;

    @Length(1, 30)
    name: string;

    @IsString()
    role: Role
}
