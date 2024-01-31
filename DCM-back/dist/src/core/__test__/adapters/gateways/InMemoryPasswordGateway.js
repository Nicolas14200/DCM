"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPasswordGateway = void 0;
class InMemoryPasswordGateway {
    async encrypt(password) {
        return password;
    }
    async comparePassword(password, passwordHash) {
        return password === passwordHash;
    }
}
exports.InMemoryPasswordGateway = InMemoryPasswordGateway;
