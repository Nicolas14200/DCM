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
exports.GeneratePasswordRecovery = void 0;
const inversify_1 = require("inversify");
const DCMIdentifiers_1 = require("../../DCMIdentifiers");
const uuid_1 = require("uuid");
let GeneratePasswordRecovery = class GeneratePasswordRecovery {
    userRepository;
    emailGateway;
    constructor(userRepository, emailGateway) {
        this.userRepository = userRepository;
        this.emailGateway = emailGateway;
    }
    async execute(email) {
        const user = await this.userRepository.getByEmail(email);
        user.setSecurityCode((0, uuid_1.v4)());
        await this.emailGateway.send({
            From: {
                Email: email,
                Name: "",
            },
            To: [{
                    Email: email,
                    Name: "",
                }],
            Subject: "Security code",
            TextPart: user.props.securityCode,
            HTMLPart: "",
            CustomID: ""
        });
        return user.props.securityCode;
    }
    async canExecute(identity) {
        if (identity.role === "ADMIN") {
            return true;
        }
        return false;
    }
};
exports.GeneratePasswordRecovery = GeneratePasswordRecovery;
exports.GeneratePasswordRecovery = GeneratePasswordRecovery = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(DCMIdentifiers_1.DCMIdentifiers.userRepository)),
    __param(1, (0, inversify_1.inject)(DCMIdentifiers_1.DCMIdentifiers.emailGateway)),
    __metadata("design:paramtypes", [Object, Object])
], GeneratePasswordRecovery);
