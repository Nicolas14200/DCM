import 'reflect-metadata';
import { User } from "../../../core/domain/entities/user/User";
import { UserRepository } from "../../../core/domain/repositories/UserRepository";
import { UserModel } from "./models/UserModel";
import { MongoDbUserMappper, MongoDbUserMappperProps } from "./mappers/mongoDbUserMappper";
import { UserError } from "../../../core/domain/models/errors/UserError";
import { injectable } from "inversify";
import { UpdateUserProps } from '@src/core/usecase/user/UpdateUser';

@injectable()
export class MongoDbUserRepository implements UserRepository {
    update(payload: UpdateUserProps): Promise<void> {
        throw new Error('Method not implemented.');
    }

    private mongoDbUserMappper: MongoDbUserMappper = new MongoDbUserMappper();

    async save(user: User): Promise<User> {
        if(!user.props.email || !user.props.name){
            throw new UserError.MissingInformation("MISSING INFORATION")
        }
        await UserModel.findOneAndUpdate(
            {
                id: user.props.id
            },
            {
                $set: {
                    email: user.props.email,
                    id: user.props.id,
                    name: user.props.name,
                    password: user.props.password,
                    role: user.props.role,
                    securityCode: user.props.securityCode
                }
            },
            {
                upsert: true,
            }
        )
        return user;
    }
    async getByEmail(email: string): Promise<User> {
        const result: MongoDbUserMappperProps = await UserModel.findOne({
            email: email
        });
        if (result){
            return this.mongoDbUserMappper.toDomain(result);
        }  
        throw new UserError.GetByEmailFailed("USER_NOT_FOUND")
    }

    async getById(id: string): Promise<User> {
        const result: MongoDbUserMappperProps = await UserModel.findOne({
            id: id
        });
        if (result){
            return this.mongoDbUserMappper.toDomain(result);
        }
        throw new UserError.GetByIdFailed("USER_NOT_FOUND")
    }
    
    async delete(id: string): Promise<void> {
        await UserModel.findOneAndDelete({id});  
    }
    
}