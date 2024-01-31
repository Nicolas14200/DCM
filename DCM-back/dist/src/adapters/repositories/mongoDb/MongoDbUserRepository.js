"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbUserRepository = void 0;
require("reflect-metadata");
const UserModel_1 = require("./models/UserModel");
const mongoDbUserMappper_1 = require("./mappers/mongoDbUserMappper");
const UserError_1 = require("../../../core/domain/models/errors/UserError");
const inversify_1 = require("inversify");
let MongoDbUserRepository = class MongoDbUserRepository {
    update(payload) {
        throw new Error('Method not implemented.');
    }
    mongoDbUserMappper = new mongoDbUserMappper_1.MongoDbUserMappper();
    async save(user) {
        if (!user.props.email || !user.props.name) {
            throw new UserError_1.UserError.MissingInformation("MISSING INFORATION");
        }
        await UserModel_1.UserModel.findOneAndUpdate({
            id: user.props.id
        }, {
            $set: {
                email: user.props.email,
                id: user.props.id,
                name: user.props.name,
                password: user.props.password,
                role: user.props.role,
                securityCode: user.props.securityCode
            }
        }, {
            upsert: true,
        });
        return user;
    }
    async getByEmail(email) {
        const result = await UserModel_1.UserModel.findOne({
            email: email
        });
        if (result) {
            return this.mongoDbUserMappper.toDomain(result);
        }
        throw new UserError_1.UserError.GetByEmailFailed("USER_NOT_FOUND");
    }
    async getById(id) {
        const result = await UserModel_1.UserModel.findOne({
            id: id
        });
        if (result) {
            return this.mongoDbUserMappper.toDomain(result);
        }
        throw new UserError_1.UserError.GetByIdFailed("USER_NOT_FOUND");
    }
    async delete(id) {
        await UserModel_1.UserModel.findOneAndDelete({ id });
    }
};
MongoDbUserRepository = __decorate([
    (0, inversify_1.injectable)()
], MongoDbUserRepository);
exports.MongoDbUserRepository = MongoDbUserRepository;
