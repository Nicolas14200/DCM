import "reflect-metadata";
import { BcryptPasswordGateway } from "../../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import { Role } from "../../domain/valueObjects/Role";
import { UpdateUser } from "../../usecase/user/UpdateUser";
import { InMemoryUserRepository } from "../adapters/inMemory/InMemoryUserRepository";
import { User } from "../../domain/entities/user/User";
import { UserError } from "../../domain/models/errors/UserError";

describe("Unit - UpdateUser", () => {
  let userRepo: InMemoryUserRepository;
  let bcryptPasswordGateway: BcryptPasswordGateway;
  let user: User;
  let updateUser: UpdateUser;

  beforeAll(async () => {
    userRepo = new InMemoryUserRepository(new Map());
    bcryptPasswordGateway = new BcryptPasswordGateway();
    updateUser = new UpdateUser(userRepo, bcryptPasswordGateway);
    user = User.create({
      email: "ben@yopmail.com",
      name: "BEN",
      password: "Passw0rd123456789",
      role: Role.admin,
    });
    await userRepo.save(user);
  });

  it("Should Update a User", async () => {
    const userUpdate = await updateUser.execute({
      id: user.props.id,
      name: "ELO",
      password: "N0uvoPass0rd123456",
      email: "nouvoEmail@yopmail.com",
    });

    expect(userUpdate.props.name).toEqual("ELO");
  });

  it("should return an error if user not found", async () => {
    const userUpdate = updateUser.execute({
      id: "FAKE ID",
      name: "ELO",
      password: "N0uvoPass0rd123456",
      email: "nouvoEmail@yopmail.com",
    });

    expect(userUpdate).rejects.toThrow(UserError.UpdateFailed);
  });
});
