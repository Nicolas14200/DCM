import { BringType } from "../valuesObject/BringType";
import { Machine } from "../valuesObject/Machine";
import { TypeEventCulture } from "../valuesObject/TypeEventCulture";
import { Vegetable } from "../valuesObject/Vegetable";

export interface EventCultureModel {
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