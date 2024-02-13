"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlotError = void 0;
const DomainError_1 = require("./DomainError");
var PlotError;
(function (PlotError) {
    class GetByCodeNameFailed extends DomainError_1.DomainError {
    }
    PlotError.GetByCodeNameFailed = GetByCodeNameFailed;
    class GetByIdFailed extends DomainError_1.DomainError {
    }
    PlotError.GetByIdFailed = GetByIdFailed;
    class PlotExist extends DomainError_1.DomainError {
    }
    PlotError.PlotExist = PlotExist;
    class PlotDeleteFailed extends DomainError_1.DomainError {
    }
    PlotError.PlotDeleteFailed = PlotDeleteFailed;
})(PlotError || (exports.PlotError = PlotError = {}));
