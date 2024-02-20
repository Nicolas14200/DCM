import { ExpressMiddlewareInterface } from "routing-controllers";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../config/AuthenticationRequest";
import { AuthenticationError } from "../../core/domain/models/errors/AuthenticationError";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../../core/usecase/DCMIdentifiers";
import { IdentityGateway } from "../../core/domain/gateways/IdentityGateway";

@injectable()
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {
  constructor(
    @inject(DCMIdentifiers.identityGateway)
    private _identityGateway: IdentityGateway
  ) {}
  async use(
    request: AuthenticatedRequest,
    response: Response,
    next?: NextFunction
  ): Promise<any> {
    try {
      const token = request.header("Authorization") as string;
      if (!token) {
        throw new AuthenticationError.AuthenticationFailed("No token provided");
      }

      const decodedToken = await this._identityGateway.decode(
        request.header("Authorization") as string
      );
      if (!decodedToken) {
        throw new AuthenticationError.AuthenticationFailed("UNAUTHORIZED");
      }

      request.identity = decodedToken;

      next();
    } catch (e) {
      return response.status(401).send(e.message);
    }
  }
}
