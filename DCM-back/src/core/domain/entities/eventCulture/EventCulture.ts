import { TypeEventCulture } from "../../../../core/domain/valueObjects/TypeEventCulture";
import { Machine } from "../../valueObjects/Machine";
import { v4 } from "uuid";
import { BringType } from "../../../../core/domain/valueObjects/BringType";
import { Vegetable } from "../../../../core/domain/valueObjects/Vegetable";

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

export class EventCulture {
    constructor( readonly props: EventCultureProps){}

    static create(props: {
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
    }){
        return new EventCulture({
            ...props,
            id: v4(),
            date: new Date(),  
        })
    }

    update(props:{
        note?:string,
        typeEventCulture?: TypeEventCulture;
        machine?: Machine;
        bringType?: BringType;
        quantity?: number;
        vegetable?: Vegetable;
        method?: string;
        nbHuman?: number;
        nbHours?: number;
        succes?: number;
        disease?: String;
        bug?: string;
    }){
        const { ...otherProps } = props;
        Object.assign(this.props, otherProps);
    }
}