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
        const [results] = await this.connect.promise().query(`INSERT INTO user (id, name, email, password, role, security_code)
            VALUES (?, ?, ?, ?, ?, ?)`, [
            user.props.id,
            user.props.name,
            user.props.email,
            user.props.password,
            user.props.role,
            user.props.securityCode || null,
        ]);
        if (results) {
            return user;
        }
        return null;
    }
    async getByEmail(email) {
        const [results] = await this.connect
            .promise()
            .query("SELECT * FROM user WHERE email = ?", [email]);
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
            return null;
        }
    }
    async getById(id) {
        const [results] = await this.connect
            .promise()
            .query("SELECT * FROM user WHERE id = ?", [id]);
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
            return null;
        }
    }
    async delete(id) {
        await this.connect
            .promise()
            .query("DELETE FROM users WHERE id = ?", [id]);
        return true;
    }
    async update(payload) {
        const results = await this.connect
            .promise()
            .query(`UPDATE user SET name = ?, password = ?, email = ? WHERE id = ?`, [payload.name, payload.password, payload.email, payload.id]);
        if (results && results.length > 0) {
            return new User_1.User({
                id: payload.id,
                email: payload.email,
                name: payload.name,
                password: payload.password,
                securityCode: null,
                role: null,
            });
        }
        else {
            return null;
        }
    }
};
exports.MysqlUserRepository = MysqlUserRepository;
exports.MysqlUserRepository = MysqlUserRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [Object])
], MysqlUserRepository);
