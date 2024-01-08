import 'reflect-metadata';
import { BcryptPasswordGateway } from "../../../adapters/gateways/bcrypt/BcryptPasswordGateway";
import { Role } from "../../domain/valueObjects/Role";
import { UpdateUser } from "../../usecase/user/UpdateUser";
import { InMemoryUserRepository } from "../adapters/inMemory/InMemoryUserRepository";
import { User } from '../../domain/entities/user/User';

describe('Unit - UpdateUser', () => {
    let userRepo: InMemoryUserRepository;
    let bcryptPasswordGateway: BcryptPasswordGateway;
    let user: User;
    let updateUser: UpdateUser;
    beforeAll(async () => {
        userRepo = new InMemoryUserRepository(new Map());
        bcryptPasswordGateway = new BcryptPasswordGateway();
        updateUser = new UpdateUser(userRepo, bcryptPasswordGateway)
        user = User.create({
            email:"ben@yopmail.com",
            name:"BEN",
            password:"Passw0rd123456789",
            role:Role.admin,
        })
        await userRepo.save(user);
    })
    it("Should Update a User", async () => {
        await updateUser.execute({
            id:user.props.id,
            name:"ELO",
            password:"N0uvoPass0rd123456",
        })
        const userUpdate = await userRepo.getById(user.props.id);
        expect(userUpdate.props.name).toEqual("ELO")
    })
})