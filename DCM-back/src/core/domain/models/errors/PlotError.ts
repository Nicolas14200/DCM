import { DomainError } from "./DomainError";

export namespace PlotError {
    export class GetByCodeNameFailed extends DomainError{}
    export class GetByIdFailed extends DomainError{}
    export class PlotExist extends DomainError{}
    export class PlotDeleteFailed extends DomainError{}
   }