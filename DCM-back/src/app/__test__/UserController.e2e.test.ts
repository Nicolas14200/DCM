import 'reflect-metadata';
import mongoose, { Connection } from "mongoose";
import { v4 } from "uuid";
import request from "supertest";
import express from "express";
import { configureExpress } from "../config/configureExpress"
import { CreateUser } from "../../core/usecase/user/CreateUser";
import { User } from '../../core/domain/entities/user/User';
import { MongoDbUserRepository } from '../../adapters/repositories/mongoDb/MongoDbUserRepository';
import { Role } from '../../core/domain/valueObjects/Role';
import { UpdateUser } from '../../core/usecase/user/UpdateUser';
import { GetUserById } from '../../core/usecase/user/GetUserById';
import { DeleteUser } from '../../core/usecase/user/DeleteUser';
import { GeneratePasswordRecovery } from "../../core/usecase/user/password/GeneratePasswordRecovery"
import { ResetPassword } from '../../core/usecase/user/password/ResetPassword';
const app = express();

configureExpress(app);

describe("e2e - UserController", () => {

    let user : User;
    let userToDelete: User;
    let userRepo: MongoDbUserRepository;
    let connection: Connection;
    
    beforeAll(async () => {

        await mongoose.connect(`mongodb://127.0.0.1:27017/DCM_test_e2e`);
        connection = mongoose.createConnection(
            `mongodb://127.0.0.1:27017/DCM`
          );
        userRepo = new MongoDbUserRepository()
        
        user = User.create({
            email:`${v4()}nostradanar@outlook.com`,
            name:"BEN",
            password:"Passw0rd123456789",
            role:Role.admin,
        })
        user.setSecurityCode(`azerty`)
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
        await connection.dropDatabase();
        await connection.close(true);
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
        
        .expect( response => {
            console.log(CreateUser.name, response.body)
        })
        .expect(201)
    })

    it("Should update a user", async () => {
        await request(app)
        .put("/user/")
        .send({
            id: user.props.id,
            password: "Passworchanged123456789",
            name: "ELO",
        })
        .expect(200)
        .expect( response => {
            console.log(UpdateUser.name, response.body)
        })
    })

    it("Should return a user via is ID", async () => {
        await request(app)
        .get(`/user/${user.props.id}`)
        .expect(200)
        .expect(response => {
            console.log(GetUserById.name, response.body)
        })
    })

    it('Should return 200 and send a email', async () => {
        await request(app)
        .post("/user/generatePasswordRecovery")
        .send({
            email : "nostradanar@outlook.com"
        })
        .expect(response => {
            console.log(GeneratePasswordRecovery.name, response.body)
        })
        .expect(200)

    })

    it("Should return 200 and reset user's password", async () => {
        await request(app)
        .post("/user/resetPassword")
        .send({
            newPassword: "NEWPASssword12015478",
            email: user.props.email,
            securityCode:user.props.securityCode
        })
        .expect(response => {
            console.log(ResetPassword.name, response.error)
        })
        .expect(200)
    })

    it("Should delete a user via is id", async () => {
        await request(app)
        .delete(`/user`)
        .send({
            id: userToDelete.props.id,
        })
        .expect(response => {
            console.log(DeleteUser.name, response.error)
        })
        .expect(204)
    })
})