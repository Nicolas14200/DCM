
import { Usecase } from "../Usecase";

import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { Plot } from "../../domain/entities/plot/Plot";
import { PlotRepository } from "../../domain/repositories/PlotRepository";
import { Identity } from "../../domain/valueObjects/Identitty";


@injectable()
export class GetPlotByCodeName implements Usecase<string, Plot>{
    
    constructor(
        @inject(DCMIdentifiers.plotRepository)
        private readonly _plotRepository : PlotRepository
        ){}

    async execute(payload: string): Promise<Plot> {
        return this._plotRepository.getByCodeName(payload)
    }

    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "ADMIN" || identity.role === "PROLO" ) {
            return true;
        }
        return false;
    }

}