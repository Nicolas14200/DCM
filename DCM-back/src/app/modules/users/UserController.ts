import {
  Body,
  Delete,
  Get,
  JsonController,
  Post,
  Put,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { CreateUserCommand } from "./commands/CreateUserCommand";
import { Request, Response } from "express";
import {
  CreateUser,
  CreateUserProps,
} from "../../../core/usecase/user/CreateUser";
import { UserApiResponseMapper } from "./dto/UserApiResponseMappper";
import { inject, injectable } from "inversify";
import { UpdateUserCommand } from "./commands/UpdateUserCommand";
import { UpdateUser } from "../../../core/usecase/user/UpdateUser";
import { GetUserById } from "../../../core/usecase/user/GetUserById";
import { DeleteUser } from "../../../core/usecase/user/DeleteUser";
import { DeleteUserCommand } from "./commands/DeleteUserCommand";
import { IdentityGateway } from "../../../core/domain/gateways/IdentityGateway";
import { DCMIdentifiers } from "../../../core/usecase/DCMIdentifiers";
import { SignInCommand } from "./commands/SignInCommand";
import { SignIn } from "../../../core/usecase/user/SignIn";
import { AuthenticationMiddleware } from "../../../app/middlewares/AuthenticationMiddleware";
import { GeneratePasswordRecovery } from "../../../core/usecase/user/password/GeneratePasswordRecovery";
import { ResetPassword } from "../../../core/usecase/user/password/ResetPassword";
import { GeneratePasswordRecoveryCommand } from "./commands/GeneratePasswordRecoveryCommand";
import { ResetPasswordCommand } from "./commands/ResetPasswordCommand";

@JsonController("/user")
@injectable()
export class UserController {
  private userApiResponseMapper: UserApiResponseMapper =
    new UserApiResponseMapper();
  constructor(
    @inject(DCMIdentifiers.identityGateway)
    private readonly _identityGateway: IdentityGateway,
    private readonly _createUser: CreateUser,
    private readonly _signIn: SignIn,
    private readonly _updateUser: UpdateUser,
    private readonly _getUserById: GetUserById,
    private readonly _deleteUser: DeleteUser,
    private readonly _generatePasswordRecovery: GeneratePasswordRecovery,
    private readonly _resetPassword: ResetPassword
  ) {}

  @Get("/")
  async user(@Res() response: Response) {
    try {
      return (response.statusCode = 200);
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }

  @Post("/generatePasswordRecovery")
  async generatePasswordRecovery(
    @Res() response: Response,
    @Body() cmd: GeneratePasswordRecoveryCommand
  ) {
    try {
      await this._generatePasswordRecovery.execute(cmd.email);
      return (response.statusCode = 200);
    } catch (error) {
      return response.status(400).send({
        message: error.message,
      });
    }
  }

  @Post("/resetPassword")
  async resetPassword(
    @Res() response: Response,
    @Body() cmd: ResetPasswordCommand
  ) {
    try {
      await this._resetPassword.execute({
        newPassword: cmd.newPassword,
        email: cmd.email,
        securityCode: cmd.securityCode,
      });
      return (response.statusCode = 200);
    } catch (error) {
      return response.status(400).send({
        message: error.message,
      });
    }
  }

  @Post("/create")
  async createUser(@Res() response: Response, @Body() cmd: CreateUserCommand) {
    try {
      const payload: CreateUserProps = {
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
        token,
      });
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }

  @Post("/signin")
  async signIn(@Res() response: Response, @Body() cmd: SignInCommand) {
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
        token,
      });
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }

  @UseBefore(AuthenticationMiddleware)
  @Put("/")
  async updateUser(@Res() response: Response, @Body() cmd: UpdateUserCommand) {
    try {
      const user = await this._updateUser.execute({
        id: cmd.id,
        name: cmd.name,
        password: cmd.password,
        email: cmd.email,
      });
      return response.status(200).send({
        ...this.userApiResponseMapper.fromDomain(user),
      });
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }

  @UseBefore(AuthenticationMiddleware)
  @Get("/:id")
  async getUserById(@Req() request: Request, @Res() response: Response) {
    try {
      const user = await this._getUserById.execute(request.params.id);
      return response.status(200).send({
        ...this.userApiResponseMapper.fromDomain(user),
      });
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }

  @UseBefore(AuthenticationMiddleware)
  @Delete("/")
  async deleteUser(@Body() cmd: DeleteUserCommand, @Res() response: Response) {
    try {
      await this._deleteUser.execute(cmd.id);
      return response.sendStatus(204);
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }
}
