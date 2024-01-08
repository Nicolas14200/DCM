import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { Usecase } from "../Usecase";
import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { EventCultureRepository } from "../../../core/domain/repositories/EventCultureRepository";

export class UpdateEventCultureProps {
    id: string;
    note: string;
}

@injectable()
export class UpdateEventCulture implements Usecase<UpdateEventCultureProps, EventCulture> {
    constructor(
        @inject(DCMIdentifiers.eventCultureRepository)
        private readonly _eventCultureRepository : EventCultureRepository
        ){}
    async execute(payload: UpdateEventCultureProps): Promise<EventCulture> {
        const eventCulture = await this._eventCultureRepository.getById(payload.id)
        eventCulture.update({
            note: payload.note
        })
        await this._eventCultureRepository.save(eventCulture);
        return eventCulture;
    }
    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "ADMIN" || identity.role === "PROLO" ) {
            return true;
        }
        return false;
    }

}