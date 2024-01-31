"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserError = void 0;
const DomainError_1 = require("./DomainError");
var UserError;
(function (UserError) {
    class GetByEmailFailed extends DomainError_1.DomainError {
    }
    UserError.GetByEmailFailed = GetByEmailFailed;
    class GetByIdFailed extends DomainError_1.DomainError {
    }
    UserError.GetByIdFailed = GetByIdFailed;
    class UserExist extends DomainError_1.DomainError {
    }
    UserError.UserExist = UserExist;
    class MissingInformation extends DomainError_1.DomainError {
    }
    UserError.MissingInformation = MissingInformation;
})(UserError = exports.UserError || (exports.UserError = {}));
