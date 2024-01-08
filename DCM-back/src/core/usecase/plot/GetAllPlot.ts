import { Plot } from "../../../core/domain/entities/plot/Plot";
import { inject, injectable } from "inversify";
import { Usecase } from "../Usecase";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { PlotRepository } from "../../../core/domain/repositories/PlotRepository";
import { Identity } from "../../../core/domain/valueObjects/Identitty";

@injectable()
export class GetAllPlot implements Usecase<void, Plot[]>{

    constructor(
        @inject(DCMIdentifiers.plotRepository)
        private readonly _plotRepository : PlotRepository
        ){}
        
    execute(): Promise<Plot[]> {
        return this._plotRepository.getAll();
    }
    
    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "ADMIN" || identity.role === "PROLO" ) {
            return true;
        }
        return false;
    }

}