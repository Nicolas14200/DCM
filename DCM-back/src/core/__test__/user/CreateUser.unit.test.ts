import "reflect-metadata";
import { BcryptPasswordGateway } from "../../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import { Role } from "../../domain/valueObjects/Role";
import { CreateUser } from "../../usecase/user/CreateUser";
import { InMemoryUserRepository } from "../adapters/inMemory/InMemoryUserRepository";
import { User } from "../../domain/entities/user/User";
import { UserError } from "../../domain/models/errors/UserError";

describe("Unit - CreateUser", () => {
  let userRepo: InMemoryUserRepository;
  let createUser: CreateUser;
  let bcryptPasswordGateway: BcryptPasswordGateway;

  beforeAll(() => {
    userRepo = new InMemoryUserRepository(new Map());
    bcryptPasswordGateway = new BcryptPasswordGateway();
    createUser = new CreateUser(userRepo, bcryptPasswordGateway);
  });

  it("should create a user a save in the inMemeory repo", async () => {
    const user = await createUser.execute({
      name: "Ben",
      email: "benjamon@yopmail.com",
      password: "azerty0123456",
      role: Role.admin,
    });
    const userExist: User = await userRepo.getByEmail(user.props.email);
    expect(userExist.props.email).toEqual("benjamon@yopmail.com");
  });
  it("should return an error if user exist", async () => {
    await createUser.execute({
      name: "Ben",
      email: "gardin@yopmail.com",
      password: "azerty0123456",
      role: Role.admin,
    });
    const user = createUser.execute({
      name: "Ben",
      email: "gardin@yopmail.com",
      password: "azerty0123456",
      role: Role.admin,
    });
    expect(user).rejects.toThrow(UserError.UserExist);
  });
});
