"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
class Password {
    value;
    constructor(password) {
        const passwordValidate = this.passwordValid(password);
        if (!passwordValidate) {
            throw new Error("INVALID_PASSWORD_FORMAT");
        }
        this.value = password;
    }
    passwordValid(password) {
        const regexp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm);
        return regexp.test(password);
    }
}
exports.Password = Password;
