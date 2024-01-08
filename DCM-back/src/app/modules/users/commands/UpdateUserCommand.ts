import { Length } from "class-validator";

export class UpdateUserCommand {

    id: string;
    
    @Length(8, 30)
    password : string ;

    @Length(0, 30)
    name: string;

}