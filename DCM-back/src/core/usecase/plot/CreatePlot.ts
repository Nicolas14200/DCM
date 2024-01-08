import { StarsLevel } from "../../../core/domain/valueObjects/StarsLevel";
import { Usecase } from "../Usecase";
import { Plot } from "../../../core/domain/entities/plot/Plot";
import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { PlotRepository } from "../../../core/domain/repositories/PlotRepository";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { PlotError } from "../../../core/domain/models/errors/PlotError";

export interface CreatePlotProps {
    name: string;
    codeName: string;
    width: number;
    heigth: number;
    ph: number;
    pebbles: StarsLevel;
    plank: number;
}
@injectable()
export class CreatePlot implements Usecase<CreatePlotProps, Plot> {

    constructor(
        @inject(DCMIdentifiers.plotRepository)
        private readonly _plotRepository : PlotRepository
        ){}

    async execute(payload: CreatePlotProps): Promise<Plot> {
        try {
            const plotExist = await this._plotRepository.getByCodeName(payload.codeName)
            if (plotExist){
                throw new PlotError.PlotExist("PLOT_EXIST");
            }
        } catch(e){
            if(e.message === "PLOT_NOT_FOUND"){
                const plot =  Plot.create({
                    name: payload.name,
                    codeName: payload.codeName,
                    width: payload.width,
                    heigth: payload.heigth,
                    ph: payload.ph,
                    pebbles: payload.pebbles,
                    plank: payload.plank,
                })
                await this._plotRepository.save(plot)
                return plot;
            }
            throw e;
        }
    }

    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "ADMIN" || identity.role === "PROLO" ) {
            return true;
        }
        return false;
    }

}