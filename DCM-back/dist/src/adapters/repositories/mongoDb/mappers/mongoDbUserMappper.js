"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDbUserMappper = void 0;
const User_1 = require("../../../../core/domain/entities/user/User");
class MongoDbUserMappper {
    toDomain(raw) {
        return new User_1.User({
            name: raw.name,
            id: raw.id,
            email: raw.email,
            password: raw.password,
            role: raw.role,
            securityCode: raw.securityCode
        });
    }
}
exports.MongoDbUserMappper = MongoDbUserMappper;
