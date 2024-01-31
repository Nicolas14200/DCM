"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCultureError = void 0;
const DomainError_1 = require("./DomainError");
var EventCultureError;
(function (EventCultureError) {
    class GetByIdFailed extends DomainError_1.DomainError {
    }
    EventCultureError.GetByIdFailed = GetByIdFailed;
    class CreateeventCultureFailed extends DomainError_1.DomainError {
    }
    EventCultureError.CreateeventCultureFailed = CreateeventCultureFailed;
})(EventCultureError = exports.EventCultureError || (exports.EventCultureError = {}));