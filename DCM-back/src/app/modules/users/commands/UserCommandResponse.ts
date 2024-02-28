import { IsEmail, IsString, Length } from "class-validator";
import { Role } from "../../../../core/domain/valueObjects/Role";

export class UserCommandResponse {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  role: Role;
}
