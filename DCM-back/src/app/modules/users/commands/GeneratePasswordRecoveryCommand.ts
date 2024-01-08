import { IsEmail } from "class-validator";
export class GeneratePasswordRecoveryCommand {
    
    @IsEmail()
    email: string;
}


