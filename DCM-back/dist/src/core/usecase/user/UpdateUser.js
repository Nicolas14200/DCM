"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = void 0;
const inversify_1 = require("inversify");
const DCMIdentifiers_1 = require("../DCMIdentifiers");
const Password_1 = require("../../../core/domain/valueObjects/Password");
const UserError_1 = require("../../domain/models/errors/UserError");
let UpdateUser = class UpdateUser {
    userRepository;
    passwordGateway;
    constructor(userRepository, passwordGateway) {
        this.userRepository = userRepository;
        this.passwordGateway = passwordGateway;
    }
    async execute(payload) {
        const user = await this.userRepository.getById(payload.id);
        const password = new Password_1.Password(payload.password).value;
        const hash = await this.passwordGateway.encrypt(password);
        if (!user) {
            throw new UserError_1.UserError.UpdateFailed("User not found");
        }
        user.update({
            name: payload.name,
            password: hash,
            id: user.props.id,
            email: payload.email
        });
        this.userRepository.update({
            id: user.props.id,
            name: user.props.name,
            password: user.props.password,
            email: user.props.email
        });
        return user;
    }
    async canExecute(identity) {
        if (identity.role === "ADMIN" || identity.role === "PROLO") {
            return true;
        }
        return false;
    }
};
exports.UpdateUser = UpdateUser;
exports.UpdateUser = UpdateUser = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(DCMIdentifiers_1.DCMIdentifiers.userRepository)),
    __param(1, (0, inversify_1.inject)(DCMIdentifiers_1.DCMIdentifiers.passwordGateway)),
    __metadata("design:paramtypes", [Object, Object])
], UpdateUser);
