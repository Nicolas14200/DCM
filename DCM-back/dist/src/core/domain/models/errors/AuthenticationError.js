"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
const DomainError_1 = require("./DomainError");
var AuthenticationError;
(function (AuthenticationError) {
    class SignInFailed extends DomainError_1.DomainError {
    }
    AuthenticationError.SignInFailed = SignInFailed;
    class AuthenticationFailed extends DomainError_1.DomainError {
    }
    AuthenticationError.AuthenticationFailed = AuthenticationFailed;
    class ResetPasswordFailed extends DomainError_1.DomainError {
    }
    AuthenticationError.ResetPasswordFailed = ResetPasswordFailed;
})(AuthenticationError || (exports.AuthenticationError = AuthenticationError = {}));
