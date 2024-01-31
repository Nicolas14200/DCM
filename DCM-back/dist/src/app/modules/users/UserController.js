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
exports.UserController = void 0;
const routing_controllers_1 = require("routing-controllers");
const CreateUserCommand_1 = require("./commands/CreateUserCommand");
const CreateUser_1 = require("../../../core/usecase/user/CreateUser");
const UserApiResponseMappper_1 = require("./dto/UserApiResponseMappper");
const inversify_1 = require("inversify");
const UpdateUserCommand_1 = require("./commands/UpdateUserCommand");
const UpdateUser_1 = require("../../../core/usecase/user/UpdateUser");
const GetUserById_1 = require("../../../core/usecase/user/GetUserById");
const DeleteUser_1 = require("../../../core/usecase/user/DeleteUser");
const DeleteUserCommand_1 = require("./commands/DeleteUserCommand");
const DCMIdentifiers_1 = require("../../../core/usecase/DCMIdentifiers");
const SignInCommand_1 = require("./commands/SignInCommand");
const SignIn_1 = require("../../../core/usecase/user/SignIn");
const AuthenticationMiddleware_1 = require("../../../app/middlewares/AuthenticationMiddleware");
const GeneratePasswordRecovery_1 = require("../../../core/usecase/user/password/GeneratePasswordRecovery");
const ResetPassword_1 = require("../../../core/usecase/user/password/ResetPassword");
const GeneratePasswordRecoveryCommand_1 = require("./commands/GeneratePasswordRecoveryCommand");
const ResetPasswordCommand_1 = require("./commands/ResetPasswordCommand");
let UserController = class UserController {
    _identityGateway;
    _createUser;
    _signIn;
    _updateUser;
    _getUserById;
    _deleteUser;
    _generatePasswordRecovery;
    _resetPassword;
    userApiResponseMapper = new UserApiResponseMappper_1.UserApiResponseMapper();
    constructor(_identityGateway, _createUser, _signIn, _updateUser, _getUserById, _deleteUser, _generatePasswordRecovery, _resetPassword) {
        this._identityGateway = _identityGateway;
        this._createUser = _createUser;
        this._signIn = _signIn;
        this._updateUser = _updateUser;
        this._getUserById = _getUserById;
        this._deleteUser = _deleteUser;
        this._generatePasswordRecovery = _generatePasswordRecovery;
        this._resetPassword = _resetPassword;
    }
    async user(response) {
        try {
            return response.statusCode = 200;
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
    async generatePasswordRecovery(response, cmd) {
        try {
            await this._generatePasswordRecovery.execute(cmd.email);
            return response.statusCode = 200;
        }
        catch (error) {
            return response.status(400).send({
                message: error.message,
            });
        }
    }
    async resetPassword(response, cmd) {
        try {
            await this._resetPassword.execute({
                newPassword: cmd.newPassword,
                email: cmd.email,
                securityCode: cmd.securityCode
            });
            return response.statusCode = 200;
        }
        catch (error) {
            return response.status(400).send({
                message: error.message,
            });
        }
    }
    async createUser(response, cmd) {
        try {
            const payload = {
                email: cmd.email,
                name: cmd.name,
                password: cmd.password,
                role: cmd.role,
            };
            const user = await this._createUser.execute(payload);
            const token = await this._identityGateway.generate({
                id: user.props.id,
                role: user.props.role,
            });
            return response.status(201).send({
                ...this.userApiResponseMapper.fromDomain(user),
                token
            });
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
    async signIn(response, cmd) {
        try {
            const user = await this._signIn.execute({
                email: cmd.email,
                password: cmd.password,
            });
            const token = await this._identityGateway.generate({
                id: user.props.id,
                role: user.props.role,
            });
            return response.status(200).send({
                ...this.userApiResponseMapper.fromDomain(user),
                token
            });
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
    async updateUser(response, cmd) {
        try {
            const user = await this._updateUser.execute({
                id: cmd.id,
                name: cmd.name,
                password: cmd.password,
                email: cmd.email
            });
            return response.status(200).send({
                ...this.userApiResponseMapper.fromDomain(user),
            });
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
    async getUserById(request, response) {
        try {
            const user = await this._getUserById.execute(request.params.id);
            return response.status(200).send({
                ...this.userApiResponseMapper.fromDomain(user),
            });
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
    async deleteUser(cmd, response) {
        try {
            await this._deleteUser.execute(cmd.id);
            return response.sendStatus(204);
        }
        catch (e) {
            return response.status(400).send({
                message: e.message,
            });
        }
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/"),
    __param(0, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "user", null);
__decorate([
    (0, routing_controllers_1.Post)("/generatePasswordRecovery"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, GeneratePasswordRecoveryCommand_1.GeneratePasswordRecoveryCommand]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "generatePasswordRecovery", null);
__decorate([
    (0, routing_controllers_1.Post)("/resetPassword"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, ResetPasswordCommand_1.ResetPasswordCommand]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
__decorate([
    (0, routing_controllers_1.Post)("/create"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateUserCommand_1.CreateUserCommand]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, routing_controllers_1.Post)("/signin"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, SignInCommand_1.SignInCommand]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "signIn", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(AuthenticationMiddleware_1.AuthenticationMiddleware),
    (0, routing_controllers_1.Put)("/"),
    __param(0, (0, routing_controllers_1.Res)()),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, UpdateUserCommand_1.UpdateUserCommand]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(AuthenticationMiddleware_1.AuthenticationMiddleware),
    (0, routing_controllers_1.Get)("/:id"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, routing_controllers_1.UseBefore)(AuthenticationMiddleware_1.AuthenticationMiddleware),
    (0, routing_controllers_1.Delete)("/"),
    __param(0, (0, routing_controllers_1.Body)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [DeleteUserCommand_1.DeleteUserCommand, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
UserController = __decorate([
    (0, routing_controllers_1.JsonController)("/user"),
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(DCMIdentifiers_1.DCMIdentifiers.identityGateway)),
    __metadata("design:paramtypes", [Object, CreateUser_1.CreateUser,
        SignIn_1.SignIn,
        UpdateUser_1.UpdateUser,
        GetUserById_1.GetUserById,
        DeleteUser_1.DeleteUser,
        GeneratePasswordRecovery_1.GeneratePasswordRecovery,
        ResetPassword_1.ResetPassword])
], UserController);
exports.UserController = UserController;
