import 'reflect-metadata';
import { User } from "../../domain/entities/user/User";
import { InMemoryUserRepository } from "../adapters/inMemory/InMemoryUserRepository";
import { ResetPassword } from "../../usecase/user/password/ResetPassword";
import { InMemoryPasswordGateway } from "../adapters/gateways/InMemoryPasswordGateway";
import { Role } from "../../domain/valueObjects/Role";

describe('Unit - ResetPassword', () => {
    
    let userRepo: InMemoryUserRepository;
    let user: User;
    let resetPassword: ResetPassword;
    let passwordGateway: InMemoryPasswordGateway;

    beforeAll(async () => {
        userRepo = new InMemoryUserRepository(new Map());
        passwordGateway = new InMemoryPasswordGateway();
        resetPassword = new ResetPassword(userRepo, passwordGateway );
        user = User.create({
            name:"bibi",
            email:"ben@yopmail.com",
            password:"Passw0rd123456789",
            role:Role.admin,
        })
        user.setSecurityCode("azerty123")
        await userRepo.save(user)
    })

    it("Should reset password of user", async () => {
        await resetPassword.execute({
            email:"ben@yopmail.com",
            newPassword:"NEWPASSword123456789",
            securityCode:"azerty123"
        })
        expect("NEWPASSword123456789").toEqual(user.props.password);
        expect(null).toEqual(user.props.securityCode);
    }) 
})