import { StarsLevel } from "../../../../core/domain/valueObjects/StarsLevel";
import { v4 } from "uuid";
import { Series } from "../../valueObjects/Series";

export interface PlotProps {
    id: string;
    name: string;
    codeName: string;
    width: number;
    heigth: number;
    area: number;
    ph: number;
    pebbles: StarsLevel;
    plank: number;
    series: Series[];
    subPlot: string[];
    eventCulture: string[];
}

export class Plot {

    constructor( readonly props : PlotProps){}
    
    static create (props: {
        name: string;
        codeName: string;
        width: number;
        heigth: number;
        ph: number;
        pebbles: StarsLevel;
        plank: number;
    }){
        return new Plot({
            ...props,
            id: v4(),
            area: props.width * props.heigth,
            series: [],
            subPlot: [],
            eventCulture: [],
        })
    }

    update(props: {
        name: string;
        codeName: string;
        ph: number;
        pebbles: StarsLevel;
        plank: number;
        width: number;
        heigth: number;
    }){
        this.props.name = props.name,
        this.props.codeName = props.codeName,
        this.props.ph = props.ph,
        this.props.pebbles = props.pebbles,
        this.props.plank = props.plank,
        this.props.width = props.width,
        this.props.heigth = props.heigth
    }

    addEventCulture(newEventCultureId: string){
        this.props.eventCulture.push(newEventCultureId);
    }

    addSeries(series: Series){
        this.props.series.push(series);
    }

    addSubPlot(plotId: string){
        this.props.subPlot.push(plotId);
    }

    deleteEventCulture(id: string){
        const index = this.props.eventCulture.indexOf(id); 
        if (index !== -1) { 
            this.props.eventCulture.splice(index, 1);
        }
    }
    
}