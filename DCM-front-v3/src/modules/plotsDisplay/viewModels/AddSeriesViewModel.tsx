
import { plotsApi } from "../../../adapters/api/plots/PlotsApi";
export interface AddSeriesProps {
    plotId:string; 
    series: {
        vegetableVariety: string;
        nbPlank: string
    };
    token:string
}

class AddSeriesViewModel {
    async execute (payload: AddSeriesProps){
        plotsApi.addSeries({id:payload.plotId,series:{
            nbPlank:+payload.series.nbPlank,
            vegetableVariety:payload.series.vegetableVariety,
            
        },token:payload.token,})
    }
}
export const addSeriesViewModel = new AddSeriesViewModel();