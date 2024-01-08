import { plotsApi } from "../../../adapters/api/plots/PlotsApi";
import { PlotModel } from "../../../core/domains/types/PlotModel";

class GetAllPlotViewModel {
    async execute (token : string): Promise<PlotModel[]> {
        return await plotsApi.getAllPlot(token)
    }
}
export const getAllPlotViewModel = new GetAllPlotViewModel()