"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryUserRepository = void 0;
class InMemoryUserRepository {
    userMap;
    constructor(userMap) {
        this.userMap = userMap;
    }
    async update(payload) {
        const { id, ...updateData } = payload;
        const userToUpdate = this.userMap.get(id);
        if (!userToUpdate) {
            return null;
        }
        return;
    }
    async getById(id) {
        const user = this.userMap.get(id);
        if (!user) {
            return null;
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
        return null;
    }
    async delete(id) {
        return this.userMap.delete(id);
    }
}
exports.InMemoryUserRepository = InMemoryUserRepository;
