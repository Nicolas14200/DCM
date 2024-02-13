"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
class InMemoryUserRepository {
    userMap;
    constructor(userMap) {
        this.userMap = userMap;
    }
    async save(user) {
        this.userMap.set(user.props.id, user);
        return user;
    }
    async update(payload) {
        const { id, ...updateData } = payload;
        const userUpdate = this.userMap.get(id);
        if (!userUpdate) {
            return null;
        }
        return userUpdate;
    }
    async getById(id) {
        const user = this.userMap.get(id);
        if (!user) {
            return null;
        }
        return user;
    }
    async getByEmail(email) {
        for (let [id, user] of this.userMap) {
            if (user.props.email === email) {
                return this.userMap.get(id);
            }
        }
        return null;
    }
    async delete(id) {
        return this.userMap.delete(id);
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
