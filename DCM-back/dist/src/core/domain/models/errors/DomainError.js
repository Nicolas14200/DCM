"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainError = void 0;
class DomainError extends Error {
    cause;
    constructor(message, cause) {
        super(message);
        this.name = this.constructor.name;
        this.cause = cause;
    }
}
exports.DomainError = DomainError;
