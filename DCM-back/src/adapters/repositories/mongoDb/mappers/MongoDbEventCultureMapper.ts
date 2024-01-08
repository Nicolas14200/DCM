import { TypeEventCulture } from "../../../../core/domain/valueObjects/TypeEventCulture";
import { Mapper } from "../../../../core/domain/Mapper";
import { EventCulture } from "../../../../core/domain/entities/eventCulture/EventCulture";
import { Machine } from "../../../../core/domain/valueObjects/Machine";
import { BringType } from "../../../../core/domain/valueObjects/BringType";
import { Vegetable } from "../../../../core/domain/valueObjects/Vegetable";

export interface MongoDbEventCultureMapperProps {
    id: string;
    date: Date;
    note: string;
    plotId: string;
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

export class MongoDbEventCultureMapper implements Mapper< EventCulture, MongoDbEventCultureMapperProps >{
    toDomain(raw: MongoDbEventCultureMapperProps): EventCulture {
        return new EventCulture({
            id: raw.id,
            date: raw.date,
            note: raw.note,
            plotId: raw.plotId,
            typeEventCulture:  raw.typeEventCulture,
            machine:  raw.machine,
            bringType:  raw.bringType,
            quantity:  raw.quantity,
            vegetable: raw.vegetable,
            method: raw.method,
            nbHuman: raw.nbHuman,
            nbHours: raw.nbHours,
            succes: raw.succes,
            disease: raw.disease,
            bug: raw.bug,
        })
    }
}