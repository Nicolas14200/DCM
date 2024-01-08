import 'reflect-metadata';
import { InMemoryUserRepository } from "../adapters/inMemory/InMemoryUserRepository";
import { SignIn } from "../../usecase/user/SignIn";
import { InMemoryPasswordGateway } from "../adapters/gateways/InMemoryPasswordGateway";
import { User } from "../../domain/entities/user/User";
import { Role } from "../../domain/valueObjects/Role";

describe("Unit - SignIn", () => {

    let inMemoryUserRepo: InMemoryUserRepository;
    let signIn: SignIn;
    let passwordGateway: InMemoryPasswordGateway;
    let user : User;

    beforeAll(async () => {
        inMemoryUserRepo = new InMemoryUserRepository(new Map());
        passwordGateway = new InMemoryPasswordGateway();
        signIn = new SignIn(inMemoryUserRepo, passwordGateway);
        user = User.create({
            email: "bsfrydsdn5a@uotlook.com",
            name: "DEDE",
            password: "AZErty132456878",
            role: Role.admin,
        })
        await inMemoryUserRepo.save(user)
    })

    it("Should SignIn a user", async () => {
        const result = await signIn.execute({
            email: "bsfrydsdn5a@uotlook.com",
            password: "AZErty132456878",
        })
        expect(result.props.name).toEqual("DEDE")
    })
})