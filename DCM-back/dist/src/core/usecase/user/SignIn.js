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
exports.SignIn = void 0;
const AuthenticationError_1 = require("../../../core/domain/models/errors/AuthenticationError");
const inversify_1 = require("inversify");
const DCMIdentifiers_1 = require("../DCMIdentifiers");
let SignIn = class SignIn {
    userRepository;
    passwordGateway;
    constructor(userRepository, passwordGateway) {
        this.userRepository = userRepository;
        this.passwordGateway = passwordGateway;
    }
    async execute(payload) {
        try {
            const user = await this.userRepository.getByEmail(payload.email);
            const passwordCheck = await this.passwordGateway.comparePassword(payload.password, user.props.password);
            if (passwordCheck) {
                return user;
            }
        }
        catch (e) {
            throw new AuthenticationError_1.AuthenticationError.SignInFailed("SIGNIN_FAILED");
        }
    }
};
exports.SignIn = SignIn;
exports.SignIn = SignIn = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(DCMIdentifiers_1.DCMIdentifiers.userRepository)),
    __param(1, (0, inversify_1.inject)(DCMIdentifiers_1.DCMIdentifiers.passwordGateway)),
    __metadata("design:paramtypes", [Object, Object])
], SignIn);
