"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const AuthenticationError_1 = require("../../models/errors/AuthenticationError");
const Email_1 = require("../../valueObjects/Email");
const uuid_1 = require("uuid");
class User {
    props;
    constructor(props) {
        this.props = props;
    }
    static create(props) {
        return new User({
            id: (0, uuid_1.v4)(),
            email: new Email_1.Email(props.email).value,
            name: props.name,
            password: props.password,
            role: props.role,
        });
    }
    update(payload) {
        this.props.name = payload.name,
            this.props.password = payload.password,
            this.props.email = payload.email;
    }
    setSecurityCode(securityCode) {
        this.props.securityCode = securityCode;
    }
    resetPassword(securityCode, newPassword) {
        if (securityCode != this.props.securityCode) {
            throw new AuthenticationError_1.AuthenticationError.ResetPasswordFailed("SECURITY_CODE_NOT_VALID");
        }
        this.props.password = newPassword;
        this.props.securityCode = null;
    }
}
exports.User = User;
