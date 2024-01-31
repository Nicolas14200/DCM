import { UserError } from "../../../../src/core/domain/models/errors/UserError";
import { User } from "../../../../src/core/domain/entities/user/User";
import { UserRepository } from "../../../../src/core/domain/repositories/UserRepository";
import { injectable } from "inversify";
import mysql, { RowDataPacket } from "mysql2";
import { UpdateUserProps } from "../../../../src/core/usecase/user/UpdateUser";

@injectable()
export class MysqlUserRepository implements UserRepository {

    constructor(private readonly connect: mysql.Connection) {
        this.connect = connect;
    }

    async save(user: User): Promise<User> {
        this.connect.query(
            `INSERT INTO users (id, name, email, password, role, security_code)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                user.props.id,
                user.props.name,
                user.props.email,
                user.props.password,
                user.props.role,
                user.props.securityCode || null,
            ]
        );
        return user;
    }

    async getByEmail(email: string): Promise<User> {
        
        const [results] = await this.connect.promise().query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
        if (results && results.length > 0) {
            return User.create({
                email: results[0].email,
                name: results[0].name,
                password: results[0].password,
                role: results[0].role,
            });
        } else {
            throw new UserError.GetByEmailFailed("USER_NOT_FOUND");
        }
    }

    async getById(id: string): Promise<User> {
        const [results] = await this.connect.promise().query<RowDataPacket[]>('SELECT * FROM users WHERE id = ?', [id]);
        if (results && results.length > 0) {
            return new User({
                id: results[0].id,
                email: results[0].email,
                name: results[0].name,
                password: results[0].password,
                role: results[0].role,
                
            });
        } else {
            throw new UserError.GetByEmailFailed("USER_NOT_FOUND");
        }
    }

    async delete(id: string): Promise<void> {
        await this.connect.promise().query<RowDataPacket[]>('DELETE FROM users WHERE id = ?', [id]);
    }

    async update(payload: UpdateUserProps) {
        try {
            await this.connect.promise().query<RowDataPacket[]>(`UPDATE users SET name = ?, password = ?, email = ? WHERE id = ?`, [payload.name, payload.password, payload.email, payload.id]);
        } catch (e) {
            throw e;
        }

    }

}