import { DomainError } from "./DomainError";

export namespace AuthenticationError {
    export class SignInFailed extends DomainError {} 
    export class AuthenticationFailed extends DomainError {}
    export class ResetPasswordFailed extends DomainError {}
 }