import { injectable } from "inversify";
import { Identity } from "../../../core/domain/entities/apiResponse/Identity";
import { IdentityGateway } from "../../../core/domain/gateways/IdentityGateway";
import { JwtPayload, sign, verify } from "jsonwebtoken";

@injectable()
export class JwtIdentityGateway implements IdentityGateway {
  constructor(private secretKey: string) {}
  async generate(payload: Identity): Promise<string> {
    return sign(
      {
        id: payload.id,
        role: payload.role,
      },
      this.secretKey,
      { expiresIn: "1d" }
    );
  }
async decode(token: string): Promise<Identity> {
    
    const result: JwtPayload = verify(token, this.secretKey) as JwtPayload
    return {
      id: result.id,
      role: result.role,
    };
  }
}
