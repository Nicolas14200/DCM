import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { Plot } from "../../../core/domain/entities/plot/Plot";
import { Usecase } from "../Usecase";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { PlotRepository } from "../../../core/domain/repositories/PlotRepository";

@injectable()
export class GetPlotById implements Usecase<string, Plot>{

    constructor(
        @inject(DCMIdentifiers.plotRepository)
        private readonly _plotRepository : PlotRepository
        ){}
        
    execute(id: string): Plot | Promise<Plot> {
        return this._plotRepository.getById(id);
    }
    
    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "ADMIN" || identity.role === "PROLO" ) {
            return true;
        }
        return false;
    }

}