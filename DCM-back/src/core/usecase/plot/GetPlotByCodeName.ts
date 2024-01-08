import { Plot } from "@src/core/domain/entities/plot/Plot";
import { Usecase } from "../Usecase";
import { Identity } from "@src/core/domain/valueObjects/Identitty";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { PlotRepository } from "@src/core/domain/repositories/PlotRepository";

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