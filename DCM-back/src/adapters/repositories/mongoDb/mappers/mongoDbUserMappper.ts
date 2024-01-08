import { Mapper } from "../../../../core/domain/Mapper";
import { Role } from "../../../../core/domain/valueObjects/Role";
import { User } from "../../../../core/domain/entities/user/User";

export interface MongoDbUserMappperProps {
    name: string;
    id : string;
    email : string;
    password : string;
    role : Role;
    securityCode:string
}

export class MongoDbUserMappper implements Mapper<User, MongoDbUserMappperProps>{
  toDomain(raw: MongoDbUserMappperProps): User {
    return new User({
        name: raw.name,
        id : raw.id,
        email : raw.email,
        password : raw.password,
        role : raw.role,
        securityCode: raw.securityCode
    });
  }
}
