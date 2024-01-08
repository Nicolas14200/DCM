import { Identity } from "../domain/valueObjects/Identitty"

export interface Usecase<I,O>{
    execute(payload?:I): Promise<O> | O
    canExecute?(identity: Identity, payload? :I): Promise<boolean>
} 