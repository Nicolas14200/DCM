import 'reflect-metadata';
import mongoose from "mongoose";
import { v4 } from "uuid";
import request from "supertest";
import express from "express";
import { configureExpress } from "../config/configureExpress"
import { User } from '../../core/domain/entities/user/User';
import { MongoDbUserRepository } from '../../adapters/repositories/mongoDb/MongoDbUserRepository';
import { Role } from '../../core/domain/valueObjects/Role';
import { JwtIdentityGateway } from '../../adapters/gateways/jwt/JwtIdentityGateway';
import { DCMIdentifiers } from '../../core/usecase/DCMIdentifiers';
import { AppDependencies } from '../config/AppDependencies';

const app = express();

describe("e2e - UserController", () => {
    let user : User;
    let userToDelete: User;
    let userRepo: MongoDbUserRepository;
    let token: string;
    let jwtIdentityGateway: JwtIdentityGateway;
    let container : AppDependencies;

    beforeAll(async () => {
        container = await configureExpress(app);
        mongoose.connect(`mongodb://127.0.0.1:27017/DCM`);
        jwtIdentityGateway = await container.get(DCMIdentifiers.identityGateway);

        userRepo = new MongoDbUserRepository();
        
        user = User.create({
            email:`${v4()}nostradanar@outlook.com`,
            name:"BEN",
            password:"Passw0rd123456789",
            role:Role.admin,
        });

        token = await jwtIdentityGateway.generate({
            id: user.props.id,
            role: user.props.role,
        })

        user.setSecurityCode(`azerty`);
        await userRepo.save(user);

        userToDelete = User.create({
            email:`${v4()}nostradanar@outlook.com`,
            name:"BEN",
            password:"Passw0rd123456789",
            role:Role.admin,
        })
        await userRepo.save(userToDelete);
    });
    
    afterAll(async () => {
        await mongoose.disconnect();
      });

    it("Should save a user in mnogoDb", async () => {
        await request(app)
        .post("/user/create")
        .send({
            email:`${v4()}@doe.com`,
            password: "Passw0rd1425783",
            role: "ADMIN",
            name: "DALAM",
        })
        .expect(201)
    })

    it("Should update a user", async () => {
        const userToUpdate = User.create({
            email:`${v4()}nostradanar@outlook.com`,
            name:"BEN",
            password:"Passw0rd123456789",
            role:Role.admin,
        })
        await userRepo.save(userToUpdate);
        await request(app)
        .put("/user")
        .set({ 
            Authorization: token 
        })
        .send({
            id: userToUpdate.props.id,
            password: "Passworchanged123456789",
            name: "ELO",
            email: userToUpdate.props.email
        })
        .expect(200)
    })

    it("Should return a user via is ID", async () => {
        await request(app)
        .get(`/user/${user.props.id}`)
        .set({ 
            Authorization: token 
        })
        .expect(200)
    })

    it('Should return 200 and send a email', async () => {
        await request(app)
        .post("/user/generatePasswordRecovery")
        .set({ 
            Authorization: token 
        })
        .send({
            email : user.props.email
        })
        .expect(200)
    })

    it("Should return 200 and reset user's password", async () => {
        await request(app)
        .post("/user/resetPassword")
        .set({ 
            Authorization: token 
        })
        .send({
            newPassword: "NEWPASssword12015478",
            email: user.props.email,
            securityCode:user.props.securityCode
        })
        .expect(200)
    })

    it("Should delete a user via is id", async () => {
        await request(app)
        .delete(`/user`)
        .set({ 
            Authorization: token 
        })
        .send({
            id: userToDelete.props.id,
        })
        .expect(204)
    })
})