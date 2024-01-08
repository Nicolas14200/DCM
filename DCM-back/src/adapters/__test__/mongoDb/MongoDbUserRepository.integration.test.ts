import mongoose from "mongoose";
import { Role } from "../../../core/domain/valueObjects/Role";
import { v4 } from "uuid";
import { User } from "../../../core/domain/entities/user/User";
import { MongoDbUserRepository } from "../../repositories/mongoDb/MongoDbUserRepository";

describe('Integration - MongoDbUserRepository', () => {
    let userRepo : MongoDbUserRepository;
    let user : User;
    beforeAll(async ()=>{
        userRepo = new MongoDbUserRepository();
        await mongoose.connect(`mongodb://127.0.0.1:27017/DCM`);
        user = User.create({
            email:`benjamin${v4()}@yopmaiol.com`,
            name:"Ban",
            password:"azzearrt4522787",
            role:Role.admin,
        })
    })
    it("should save a user in a mongodb repository", async () => {
        await userRepo.save(user);
        const userExist: User = await userRepo.getById(user.props.id)
        expect(userExist.props.name).toEqual("Ban")
    })
    it("should return a user via is email", async () => {
        const userExist: User = await userRepo.getByEmail(user.props.email)
        expect(userExist.props.name).toEqual("Ban")
    })
})