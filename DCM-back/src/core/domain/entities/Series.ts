import { v4 } from "uuid";

export interface SeriesProps{
    id: string;
    plotId: string;
    vegetableVariety: string;
    nbPlank: number
}

export class Series {
    constructor( readonly props : SeriesProps){}

    static create (props: {
        plotId: string;
        vegetableVariety: string;
        nbPlank: number
    }){
        return new Series({
            ...props,
            id: v4(),
        })
    }

    update(props: {
        vegetableVariety: string;
        nbPlank: number
    }){
        this.props.vegetableVariety = props.vegetableVariety,
        this.props.nbPlank = props.nbPlank
    }
}