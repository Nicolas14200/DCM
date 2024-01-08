import 'reflect-metadata';
import { User } from "../../domain/entities/user/User";
import { Role } from "../../domain/valueObjects/Role";
import { InMemoryUserRepository } from "../adapters/inMemory/InMemoryUserRepository";
import { DeleteUser } from "../../usecase/../usecase/user/DeleteUser"
describe("Unit - DeleteUser", () => {
    let userRepo: InMemoryUserRepository;
    let user: User;
    let deleteUser: DeleteUser;
    beforeAll(async () => {
        userRepo = new InMemoryUserRepository(new Map());
        deleteUser  = new DeleteUser(userRepo);
        user = User.create({
            name:"bibi",
            email:"ben@yopmail.com",
            password:"Passw0rd123456789",
            role:Role.admin,
        })
        await userRepo.save(user);
    })
    it("Should delete a user", async () => {
        await deleteUser.execute(user.props.id);
        const userExist = userRepo.getById(user.props.id)
        expect(userExist).rejects.toThrow("USER_NOT_FOUND");
    })
})