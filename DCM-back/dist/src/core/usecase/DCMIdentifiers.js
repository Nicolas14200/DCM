"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DCMIdentifiers = void 0;
class DCMIdentifiers {
    static userRepository = Symbol.for("userRepository");
    static passwordGateway = Symbol.for("passwordGateway");
    static plotRepository = Symbol.for("plotRepository");
    static eventCultureRepository = Symbol.for("eventCultureRepository");
    static identityGateway = Symbol.for("identityGateway");
    static emailGateway = Symbol.for('emailGateway');
    static mailjet = Symbol.for("mailjet");
    static seriesRepository = Symbol.for("seriesRepository");
}
exports.DCMIdentifiers = DCMIdentifiers;
