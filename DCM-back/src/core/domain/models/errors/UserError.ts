import { DomainError } from "./DomainError";

export namespace UserError {
    export class GetByEmailFailed extends DomainError{}
    export class GetByIdFailed extends DomainError{}
    export class UserExist extends DomainError{}
    export class MissingInformation extends DomainError{}
   }