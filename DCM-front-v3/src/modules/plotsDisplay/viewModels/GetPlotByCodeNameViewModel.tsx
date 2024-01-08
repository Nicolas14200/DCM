import { plotsApi } from "../../../adapters/api/plots/PlotsApi";
import { Plot } from "../../../core/domains/entities/Plot";

export interface GetPlotByCodeNameViewModelsProps {
    codeName: string; 
    token: string
}
class GetPlotByCodeNameViewModels {
    async execute (payload: GetPlotByCodeNameViewModelsProps): Promise<Plot>{
        return plotsApi.getPlotByCodeName(payload);
    }
}
export const getPlotByCodeNameViewModel = new GetPlotByCodeNameViewModels();