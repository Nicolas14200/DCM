import "reflect-metadata";
import { User } from "../../../core/domain/entities/user/User";
import { UserRepository } from "../../../core/domain/repositories/UserRepository";
import { UserModel } from "./models/UserModel";
import {
  MongoDbUserMappper,
  MongoDbUserMappperProps,
} from "./mappers/mongoDbUserMappper";
import { injectable } from "inversify";
import { UpdateUserProps } from "@src/core/usecase/user/UpdateUser";
import { Role } from "../../../core/domain/valueObjects/Role";

@injectable()
export class MongoDbUserRepository implements UserRepository {
  private mongoDbUserMappper: MongoDbUserMappper = new MongoDbUserMappper();

  async save(user: User): Promise<User> {
    const userModel = new UserModel({
      email: user.props.email,
      id: user.props.id,
      name: user.props.name,
      password: user.props.password,
      role: user.props.role,
      securityCode: user.props.securityCode,
    });
    try {
      await userModel.save();
    } catch (e) {
      console.error(e);
    }

    return new User({
      email: userModel.email,
      id: userModel.id,
      name: userModel.name,
      password: userModel.password,
      role: userModel.role as Role,
      securityCode: userModel.securityCode,
    });
  }

  async update(payload: UpdateUserProps): Promise<User> {
    const result: MongoDbUserMappperProps = await UserModel.findOneAndUpdate(
      {
        id: payload.id,
      },
      {
        $set: {
          email: payload.email,
          id: payload.id,
          name: payload.name,
          password: payload.password,
        },
      },
      {
        upsert: true,
      }
    );
    if (!result) {
      return null;
    }

    return this.mongoDbUserMappper.toDomain(result);
  }

  async getByEmail(email: string): Promise<User> {
    const result: MongoDbUserMappperProps = await UserModel.findOne({
      email: email,
    });

    if (!result) {
      return null;
    }
    return this.mongoDbUserMappper.toDomain(result);
  }

  async getById(id: string): Promise<User> {
    const result: MongoDbUserMappperProps = await UserModel.findOne({
      id: id,
    });
    if (result) {
      return this.mongoDbUserMappper.toDomain(result);
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    await UserModel.findOneAndDelete({ id });
    return true;
  }
}
