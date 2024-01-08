import { User } from "../../../core/domain/entities/user/User";
import { InMemoryUserRepository } from "../adapters/inMemory/InMemoryUserRepository";
import { Role } from "../../../core/domain/valueObjects/Role";

describe("Unit - GetUserById", () => {
    let userRepo: InMemoryUserRepository;
    let user: User;
    beforeAll(async () => {
        userRepo = new InMemoryUserRepository(new Map());
        user = User.create({
            name:"bibi",
            email:"ben@yopmail.com",
            password:"Passw0rd123456789",
            role:Role.admin,
        })
        await userRepo.save(user)
    })
    it("Should return a user via is ID", async () => {
        const userExist = await userRepo.getById(user.props.id);
        expect(userExist.props.name).toEqual("bibi")
    })
})