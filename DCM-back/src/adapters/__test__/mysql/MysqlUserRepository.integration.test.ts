import 'reflect-metadata';
import { MysqlUserRepository } from "../../repositories/mysql/MysqlUserRepository";
import { User } from '../../../core/domain/entities/user/User';
import { Role } from '../../../core/domain/valueObjects/Role';
import { v4 } from 'uuid';
import mysql, { ConnectionOptions } from 'mysql2';

const createDb = async (): Promise<mysql.Connection> => {
    try {
        const access: ConnectionOptions = {
            host: '127.0.0.1',
            user: 'root',
            password: 'root',
            database: 'DCM',
            port: 3306,
            authPlugins: {
            },
        };
        const conn = mysql.createConnection(access);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return conn;
    } catch (e) {
        throw e;
    }
}

describe("Integration - MySqlUserRepository", () => {
    let userRepo: MysqlUserRepository;
    let user: User;
    beforeAll(async () => {
        userRepo = new MysqlUserRepository(await createDb() as mysql.Connection);

        user = User.create({
            email: `nicolas${v4()}@yopmaiol.com`,
            name: "Ban",
            password: "azzearrt4522787",
            role: Role.admin,
        });
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