import { Vegetable } from "../../../../core/domain/valueObjects/Vegetable";

export interface EventCultureResponse {
    date: Date,
    note: string,
    typeEventCulture?: string,
    machine?: string,
    bringType?: string,
    quantity?: number,
    vegetable?: Vegetable,
    method?: string,
    nbHuman?: number,
    nbHours?:number,
    succes?: number,
    disease?: string,
    bug?: string,
}