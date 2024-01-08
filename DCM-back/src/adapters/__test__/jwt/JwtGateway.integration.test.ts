import 'reflect-metadata';
import { Role } from "../../../core/domain/valueObjects/Role";
import { IdentityGateway } from "../../../core/domain/gateways/IdentityGateway";
import { JwtIdentityGateway } from "../../gateways/jwt/JwtIdentityGateway";

describe("Integration - Jwt", () => {
  let jwt: IdentityGateway;
  let token: string;
  beforeAll(async () => {
    jwt = new JwtIdentityGateway("12345678");
  });
  it("should genrate a token", async () => {
    const result = await jwt.generate({
      id: "12345677890",
      role: Role.admin,
    });
    token = result
    expect(typeof result).toEqual("string");
  });

  it("should verify if the token is valid", async () =>{
    const result = jwt.decode(token);
    expect(result).toBeTruthy();
  });
});
