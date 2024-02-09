import "reflect-metadata";
import { User } from "../../../core/domain/entities/user/User";
import { InMemoryUserRepository } from "../adapters/inMemory/InMemoryUserRepository";
import { Role } from "../../../core/domain/valueObjects/Role";
import { GetUserById } from "../../usecase/user/GetUserById";
import { UserError } from "../../domain/models/errors/UserError";

describe("Unit - GetUserById", () => {
  let userRepo: InMemoryUserRepository;
  let user: User;
  let getUserById: GetUserById;

  beforeAll(async () => {
    userRepo = new InMemoryUserRepository(new Map());
    getUserById = new GetUserById(userRepo);
    user = User.create({
      name: "bibi",
      email: "ben@yopmail.com",
      password: "Passw0rd123456789",
      role: Role.admin,
    });
    await userRepo.save(user);
  });

  it("Should return a user via is ID", async () => {
    const userExist = await getUserById.execute(user.props.id);
    expect(userExist.props.name).toEqual("bibi");
  });

  it("should return an error if user not found", async () => {
    const userExist = getUserById.execute("FAKE ID");
    expect(userExist).rejects.toThrow(UserError.GetByIdFailed);
  });
});
