import mongoose from "mongoose";
import { Role } from "../../../core/domain/valueObjects/Role";
import { v4 } from "uuid";
import { User } from "../../../core/domain/entities/user/User";
import { MongoDbUserRepository } from "../../repositories/mongoDb/MongoDbUserRepository";

describe("Integration - MongoDbUserRepository", () => {
  let userRepo: MongoDbUserRepository;
  let user: User;

  beforeAll(async () => {
    userRepo = new MongoDbUserRepository();
    await mongoose.connect(`mongodb://127.0.0.1:27017/DCM`);
    user = User.create({
      email: `benjamin${v4()}@yopmaiol.com`,
      name: "Ban",
      password: "azzearrt4522787",
      role: Role.admin,
    });
    await userRepo.save(user);
  });

  it("should save a user in a mongodb repository", async () => {
    const antoherUser = User.create({
      email: `nico${v4()}@yopmaiol.com`,
      name: "nico",
      password: "azzearrt4522787",
      role: Role.admin,
    });
    const userExist: User = await userRepo.save(antoherUser);
    expect(userExist.props.name).toEqual("nico");
  });

  it("should return a user via is email", async () => {
    const getByEmailUser: User = await userRepo.getByEmail(user.props.email);
    expect(getByEmailUser.props.name).toEqual("Ban");
  });

  it("should return a user via is id", async () => {
    const getByEmailUser: User = await userRepo.getById(user.props.id);
    expect(getByEmailUser.props.name).toEqual("Ban");
  });

  it("should delete a user", async () => {
    const userToDelete = User.create({
      email: `nico${v4()}@yopmaiol.com`,
      name: "nico",
      password: "azzearrt4522787",
      role: Role.admin,
    });
    const result = await userRepo.delete(userToDelete.props.id);
    expect(result).toEqual(true);
  });

  it("should update a user", async () => {
    await userRepo.update({
      id: user.props.id,
      name: "New name for update",
      password: user.props.password,
      email: user.props.email,
    });
    const userExist: User = await userRepo.getById(user.props.id);
    expect(userExist.props.name).toEqual("New name for update");
  });
});
