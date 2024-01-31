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
exports.AuthenticationMiddleware = void 0;
const AuthenticationError_1 = require("../../core/domain/models/errors/AuthenticationError");
const inversify_1 = require("inversify");
const DCMIdentifiers_1 = require("../../core/usecase/DCMIdentifiers");
let AuthenticationMiddleware = class AuthenticationMiddleware {
    _identityGateway;
    constructor(_identityGateway) {
        this._identityGateway = _identityGateway;
    }
    async use(request, response, next) {
        try {
            const result = await this._identityGateway.decode(request.header('Authorization'));
            if (!result) {
                throw new AuthenticationError_1.AuthenticationError.AuthenticationFailed("UNAUTHORIZED");
            }
            request.identity = result;
            next();
        }
        catch (e) {
            return response.status(401).send(e.message);
        }
    }
};
AuthenticationMiddleware = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(DCMIdentifiers_1.DCMIdentifiers.identityGateway)),
    __metadata("design:paramtypes", [Object])
], AuthenticationMiddleware);
exports.AuthenticationMiddleware = AuthenticationMiddleware;
