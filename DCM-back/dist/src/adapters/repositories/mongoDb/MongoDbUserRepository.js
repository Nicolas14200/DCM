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
const User_1 = require("../../../core/domain/entities/user/User");
const UserModel_1 = require("./models/UserModel");
const mongoDbUserMappper_1 = require("./mappers/mongoDbUserMappper");
const inversify_1 = require("inversify");
let MongoDbUserRepository = class MongoDbUserRepository {
    mongoDbUserMappper = new mongoDbUserMappper_1.MongoDbUserMappper();
    async save(user) {
        const userModel = new UserModel_1.UserModel({
            email: user.props.email,
            id: user.props.id,
            name: user.props.name,
            password: user.props.password,
            role: user.props.role,
            securityCode: user.props.securityCode,
        });
        await userModel.save();
        return new User_1.User({
            email: userModel.email,
            id: userModel.id,
            name: userModel.name,
            password: userModel.password,
            role: userModel.role,
            securityCode: userModel.securityCode,
        });
    }
    async update(payload) {
        const result = await UserModel_1.UserModel.findOneAndUpdate({
            id: payload.id,
        }, {
            $set: {
                email: payload.email,
                id: payload.id,
                name: payload.name,
                password: payload.password,
            },
        }, {
            upsert: true,
        });
        if (!result) {
            return null;
        }
        return this.mongoDbUserMappper.toDomain(result);
    }
    async getByEmail(email) {
        const result = await UserModel_1.UserModel.findOne({
            email: email,
        });
        if (!result) {
            return null;
        }
        return this.mongoDbUserMappper.toDomain(result);
    }
    async getById(id) {
        const result = await UserModel_1.UserModel.findOne({
            id: id,
        });
        if (result) {
            return this.mongoDbUserMappper.toDomain(result);
        }
        return null;
    }
    async delete(id) {
        await UserModel_1.UserModel.findOneAndDelete({ id });
        return true;
    }
};
exports.MongoDbUserRepository = MongoDbUserRepository;
exports.MongoDbUserRepository = MongoDbUserRepository = __decorate([
    (0, inversify_1.injectable)()
], MongoDbUserRepository);
