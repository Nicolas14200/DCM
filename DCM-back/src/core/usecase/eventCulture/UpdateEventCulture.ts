import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { Usecase } from "../Usecase";
import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { EventCultureRepository } from "../../../core/domain/repositories/EventCultureRepository";
import { EventCultureError } from "../../domain/models/errors/EventCultureError";
import { TypeEventCulture } from "../../domain/valueObjects/TypeEventCulture";
import { Machine } from "../../domain/valueObjects/Machine";
import { BringType } from "../../domain/valueObjects/BringType";
import { Vegetable } from "../../domain/valueObjects/Vegetable";

export class UpdateEventCultureProps {
    id: string;
    note?:string;
    typeEventCulture?: TypeEventCulture;
    machine?: Machine;
    bringType?: BringType;
    quantity?: number;
    vegetable?: Vegetable;
    method?: string;
    nbHuman?: number;
    nbHours?: number;
    succes?: number;
    disease?: string;
    bug?: string;
}

@injectable()
export class UpdateEventCulture implements Usecase<UpdateEventCultureProps, EventCulture> {
    constructor(
        @inject(DCMIdentifiers.eventCultureRepository)
        private readonly _eventCultureRepository : EventCultureRepository
        ){}
    async execute(payload: UpdateEventCultureProps): Promise<EventCulture> {
        const eventCulture = await this._eventCultureRepository.getById(payload.id);
        if(!eventCulture){
            throw new EventCultureError.GetByIdFailed('Get By Id Failed')
        }
        eventCulture.update({
            ...payload
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