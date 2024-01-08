import { IsString, IsEmail } from "class-validator";

export class ResetPasswordCommand {

    @IsString()
    newPassword: string;

    @IsEmail()
    email: string;

    @IsString()
    securityCode: string;
}


