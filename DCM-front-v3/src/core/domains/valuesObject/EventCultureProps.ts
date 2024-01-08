import { BringType } from "./BringType";
import { Machine } from "./Machine";
import { TypeEventCulture } from "./TypeEventCulture";
import { Vegetable } from "./Vegetable";

export interface EventCultureProps {
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