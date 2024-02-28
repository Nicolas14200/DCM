import { IsEmail, IsString, Length } from "class-validator";

export class UpdateUserCommand {
    @IsString()
    id: string;
    
    @IsEmail()
    email: string;

    @Length(8, 30)
    password : string ;

    @Length(0, 30)
    name: string;

}