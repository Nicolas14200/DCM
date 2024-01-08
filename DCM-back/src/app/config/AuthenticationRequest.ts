import { Identity } from "../../core/domain/entities/apiResponse/Identity";
import { Request } from "express";

export interface AuthenticatedRequest extends Request {
  identity: Identity;
}
