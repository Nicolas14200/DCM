import { Identity } from "../../../core/domain/valueObjects/Identitty";
import { Usecase } from "../Usecase";
import { inject, injectable } from "inversify";
import { DCMIdentifiers } from "../DCMIdentifiers";
import { PlotRepository } from "../../../core/domain/repositories/PlotRepository";

@injectable()
export class DeletePlot implements Usecase<string, void> {

    constructor(
        @inject(DCMIdentifiers.plotRepository)
        private readonly _plotRepository : PlotRepository
        ){}

    async execute(id: string): Promise<void> {
        await this._plotRepository.delete(id);
        return;
    }

    async canExecute(identity: Identity): Promise<boolean> {
        if (identity.role === "ADMIN" || identity.role === "PROLO" ) {
            return true;
        }
        return false;
    }

}