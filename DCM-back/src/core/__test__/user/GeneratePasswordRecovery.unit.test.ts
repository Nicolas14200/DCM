import 'reflect-metadata';
import { User } from "../../domain/entities/user/User";
import { InMemoryUserRepository } from "../adapters/inMemory/InMemoryUserRepository"
import{ GeneratePasswordRecovery } from "../../usecase/user/password/GeneratePasswordRecovery"
import { Role } from "../../domain/valueObjects/Role";
import {InMemoryEmailGateway} from "../adapters/gateways/InMemoryEmailGateway";

describe('Unit - GeneratePasswordRecovery', () => {
    let userRepo: InMemoryUserRepository;
    let user: User;
    let generatePasswordRecovery: GeneratePasswordRecovery;
    let emailGateway: InMemoryEmailGateway;

    beforeAll(async () => {
        userRepo = new InMemoryUserRepository(new Map());
        emailGateway = new InMemoryEmailGateway()
        generatePasswordRecovery  = new GeneratePasswordRecovery(userRepo, emailGateway);
        user = User.create({
            name:"bibi",
            email:"ben@yopmail.com",
            password:"Passw0rd123456789",
            role:Role.admin,
        })
        await userRepo.save(user);
    })
    
    it("Should save a security code in props's user", async () => {
        const code = await generatePasswordRecovery.execute("ben@yopmail.com")
        expect(code).toEqual(user.props.securityCode)
    })
})