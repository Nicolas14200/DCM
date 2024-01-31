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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailJetGateway = void 0;
const DCMIdentifiers_1 = require("../../../core/usecase/DCMIdentifiers");
const inversify_1 = require("inversify");
const node_mailjet_1 = __importDefault(require("node-mailjet"));
let MailJetGateway = class MailJetGateway {
    mailjet;
    constructor(mailjet) {
        this.mailjet = mailjet;
    }
    async send(msg) {
        await this.mailjet.post("send", { version: "v3.1" }).request({
            Messages: [msg],
        });
    }
};
MailJetGateway = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(DCMIdentifiers_1.DCMIdentifiers.mailjet)),
    __metadata("design:paramtypes", [node_mailjet_1.default])
], MailJetGateway);
exports.MailJetGateway = MailJetGateway;
