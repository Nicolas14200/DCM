import { DomainError } from "./DomainError";

export namespace EventCultureError {
    export class GetByIdFailed extends DomainError{}
    export class CreateeventCultureFailed extends DomainError{}
    export class DeletedEventCultureFailed extends DomainError{}
    export class NoEventCulture extends DomainError{}
   }