import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { Usecase } from "../Usecase";
import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { EventCultureRepository } from "../../../core/domain/repositories/EventCultureRepository";

@injectable()
export class GetEventCultureById implements Usecase<string, EventCulture> {
    constructor(        
        @inject(DCMIdentifiers.eventCultureRepository)
        private readonly _eventCultureRepository: EventCultureRepository){}
        
    execute(id: string): EventCulture | Promise<EventCulture> {
        return this._eventCultureRepository.getById(id)
    }

    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "ADMIN" || identity.role === "PROLO" ) {
            return true;
        }
        return false;
    }

}