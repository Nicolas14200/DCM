"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
const UserError_1 = require("../../../../core/domain/models/errors/UserError");
class InMemoryUserRepository {
    userMap;
    constructor(userMap) {
        this.userMap = userMap;
    }
    update(payload) {
        throw new Error("Method not implemented.");
    }
    async getById(id) {
        const user = this.userMap.get(id);
        if (!user) {
            throw new UserError_1.UserError.GetByIdFailed("USER_NOT_FOUND");
        }
        return user;
    }
    async save(user) {
        this.userMap.set(user.props.id, user);
        return user;
    }
    async getByEmail(email) {
        for (let [id, user] of this.userMap) {
            if (user.props.email === email) {
                return this.userMap.get(id);
            }
        }
        throw new UserError_1.UserError.GetByEmailFailed("USER_NOT_FOUND");
    }
    async delete(id) {
        this.userMap.delete(id);
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
