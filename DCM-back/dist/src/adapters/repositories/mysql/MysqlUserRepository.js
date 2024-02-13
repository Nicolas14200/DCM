"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlUserRepository = void 0;
const UserError_1 = require("../../../../src/core/domain/models/errors/UserError");
const User_1 = require("../../../../src/core/domain/entities/user/User");
const inversify_1 = require("inversify");
const mysql2_1 = __importDefault(require("mysql2"));
let MysqlUserRepository = class MysqlUserRepository {
    connect;
    constructor(connect) {
        this.connect = connect;
        this.connect = connect;
    }
    async save(user) {
        this.connect.query(`INSERT INTO users (id, name, email, password, role, security_code)
            VALUES (?, ?, ?, ?, ?, ?)`, [
            user.props.id,
            user.props.name,
            user.props.email,
            user.props.password,
            user.props.role,
            user.props.securityCode || null,
        ]);
        return user;
    }
    async getByEmail(email) {
        const [results] = await this.connect.promise().query('SELECT * FROM users WHERE email = ?', [email]);
        if (results && results.length > 0) {
            return User_1.User.create({
                email: results[0].email,
                name: results[0].name,
                password: results[0].password,
                role: results[0].role,
            });
        }
        else {
            throw new UserError_1.UserError.GetByEmailFailed("USER_NOT_FOUND");
        }
    }
    async getById(id) {
        const [results] = await this.connect.promise().query('SELECT * FROM users WHERE id = ?', [id]);
        if (results && results.length > 0) {
            return new User_1.User({
                id: results[0].id,
                email: results[0].email,
                name: results[0].name,
                password: results[0].password,
                role: results[0].role,
            });
        }
        else {
            throw new UserError_1.UserError.GetByEmailFailed("USER_NOT_FOUND");
        }
    }
    async delete(id) {
        await this.connect.promise().query('DELETE FROM users WHERE id = ?', [id]);
    }
    async update(payload) {
        try {
            await this.connect.promise().query(`UPDATE users SET name = ?, password = ?, email = ? WHERE id = ?`, [payload.name, payload.password, payload.email, payload.id]);
        }
        catch (e) {
            throw e;
        }
    }
};
exports.MysqlUserRepository = MysqlUserRepository;
exports.MysqlUserRepository = MysqlUserRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [Object])
], MysqlUserRepository);
