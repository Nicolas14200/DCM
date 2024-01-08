import { Mapper } from "../../../../core/domain/Mapper";
import { PlotResponse } from "../../../../core/domain/entities/apiResponse/PlotResponse";
import { Plot } from "../../../../core/domain/entities/plot/Plot";

export class PlotApiResponseMapper implements Mapper<Plot, PlotResponse>{
    
    fromDomain(plot: Plot): PlotResponse {
        return {
            id: plot.props.id,
            name: plot.props.name,
            codeName: plot.props.codeName,
            width: plot.props.width,
            heigth: plot.props.heigth,
            area: plot.props.area,
            ph: plot.props.ph,
            pebbles: plot.props.pebbles,
            plank: plot.props.plank,
            series: plot.props.series,
            subPlot: plot.props.subPlot,
            eventCulture: plot.props.eventCulture.map((event)=>{
                return event
            })
        }
    }
}