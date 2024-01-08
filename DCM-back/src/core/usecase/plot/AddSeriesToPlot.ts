import { Series } from "../../domain/valueObjects/Series";
import { Usecase } from "../Usecase";
import { Identity } from "../../domain/valueObjects/Identitty";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { PlotRepository } from "../../domain/repositories/PlotRepository";

export interface AddSeriesProps {
    series: Series,
    plotId: string
}

@injectable()
export class AddSeriesToPlot implements Usecase<AddSeriesProps, void>{

    constructor(
        @inject(DCMIdentifiers.plotRepository)
        private readonly _plotRepository : PlotRepository
        ){}

    async execute(addSeriesProps: AddSeriesProps): Promise<void> {
        const plot = await this._plotRepository.getById(addSeriesProps.plotId)
        plot.addSeries(addSeriesProps.series);
        await this._plotRepository.save(plot);
    }

    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "ADMIN" || identity.role === "PROLO" ) {
            return true;
        }
        return false;
    }

}