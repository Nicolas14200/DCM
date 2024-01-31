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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtIdentityGateway = void 0;
const inversify_1 = require("inversify");
const jsonwebtoken_1 = require("jsonwebtoken");
let JwtIdentityGateway = class JwtIdentityGateway {
    secretKey;
    constructor(secretKey) {
        this.secretKey = secretKey;
    }
    async generate(payload) {
        return (0, jsonwebtoken_1.sign)({
            id: payload.id,
            role: payload.role,
        }, this.secretKey, { expiresIn: "1d" });
    }
    async decode(token) {
        const result = (0, jsonwebtoken_1.verify)(token, this.secretKey);
        return {
            id: result.id,
            role: result.role,
        };
    }
};
JwtIdentityGateway = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [String])
], JwtIdentityGateway);
exports.JwtIdentityGateway = JwtIdentityGateway;
