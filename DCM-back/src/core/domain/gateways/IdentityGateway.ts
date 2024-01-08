import { Identity } from "../valueObjects/Identitty"

export interface IdentityGateway {
    generate(payload : Identity) : Promise <string>
    decode(token : string, secretKey?: string): Promise<Identity>
}