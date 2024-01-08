import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { Usecase } from "../Usecase";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { EventCultureRepository } from "../../../core/domain/repositories/EventCultureRepository";
import { inject, injectable } from "inversify";

@injectable()
export class DeleteEventCulture implements Usecase<string, void> {
    constructor(        
        @inject(DCMIdentifiers.eventCultureRepository)
        private readonly _eventCultureRepository : EventCultureRepository){}

    async execute(id: string): Promise<void> {
        await this._eventCultureRepository.delete(id);
    }
    
    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "ADMIN" || identity.role === "PROLO" ) {
            return true;
        }
        return false;
    }

}