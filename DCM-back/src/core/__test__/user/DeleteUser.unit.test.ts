import "reflect-metadata";
import { User } from "../../domain/entities/user/User";
import { Role } from "../../domain/valueObjects/Role";
import { InMemoryUserRepository } from "../adapters/inMemory/InMemoryUserRepository";
import { DeleteUser } from "../../usecase/../usecase/user/DeleteUser";
import { UserError } from "../../domain/models/errors/UserError";

describe("Unit - DeleteUser", () => {
  let userRepo: InMemoryUserRepository;
  let user: User;
  let deleteUser: DeleteUser;

  beforeAll(async () => {
    userRepo = new InMemoryUserRepository(new Map());
    deleteUser = new DeleteUser(userRepo);
    user = User.create({
      name: "bibi",
      email: "ben@yopmail.com",
      password: "Passw0rd123456789",
      role: Role.admin,
    });
    await userRepo.save(user);
  });

  it("Should delete a user", async () => {
    const result = await deleteUser.execute(user.props.id);
    expect(result).toEqual(true)
  });

  it("Should return a error if user not exist", async () => {
    const result = deleteUser.execute("fake id");
    expect(result).rejects.toThrow(UserError.DeleteUserFailed)
  });
});
