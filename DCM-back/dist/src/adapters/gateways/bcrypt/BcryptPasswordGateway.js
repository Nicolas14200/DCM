"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptPasswordGateway = void 0;
const bcrypt_1 = require("bcrypt");
class BcryptPasswordGateway {
    saltRounds = (0, bcrypt_1.genSaltSync)(10);
    async encrypt(password) {
        return (0, bcrypt_1.hashSync)(password, this.saltRounds);
    }
    async comparePassword(password, passwordHash) {
        return (0, bcrypt_1.compare)(password, passwordHash);
    }
}
exports.BcryptPasswordGateway = BcryptPasswordGateway;
