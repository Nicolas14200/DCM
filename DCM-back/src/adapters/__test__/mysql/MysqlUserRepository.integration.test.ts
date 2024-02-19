import 'reflect-metadata';
import { MysqlUserRepository } from "../../repositories/mysql/MysqlUserRepository";
import { User } from '../../../core/domain/entities/user/User';
import { Role } from '../../../core/domain/valueObjects/Role';
import { v4 } from 'uuid';
import { connect } from "./connectDb";
import { Connection } from 'mysql2';

describe("Integration - MySqlUserRepository", () => {
    let userRepo: MysqlUserRepository;
    let user: User;
    let connection: Connection;
    
    beforeAll(async () => {
        connection = await connect;
        userRepo = new MysqlUserRepository(connection);

        user = User.create({
            email: `nicolas${v4()}@yopmaiol.com`,
            name: "Ban",
            password: "azzearrt4522787",
            role: Role.admin,
        });
    });

    afterAll(async () => {
        connection.end()
      });

    it('Should save a user', async () => {
        await userRepo.save(user);
        const userExist = await userRepo.getByEmail(user.props.email);
        expect(userExist.props.name).toEqual("Ban")
    })

    it('Should return user by id', async () => {
        const userExist = await userRepo.getById(user.props.id);
        expect(userExist.props.name).toEqual("Ban");
    })

    it('Should return user by email', async () => {
        const userExist = await userRepo.getByEmail(user.props.email);
        expect(userExist.props.name).toEqual("Ban");
    })

    it('Should update a user', async () => {
        await userRepo.update({ 
            id: user.props.id,
            name:"nouvoName",
            password:user.props.password,
            email:user.props.password});
        const updateUser = await userRepo.getById(user.props.id);
        expect(updateUser.props.name).toEqual("nouvoName");

    })


})