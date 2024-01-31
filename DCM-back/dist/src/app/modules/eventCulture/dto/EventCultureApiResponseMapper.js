"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCultureApiResponseMapper = void 0;
class EventCultureApiResponseMapper {
    fromDomain(eventCulture) {
        return {
            date: eventCulture.props.date,
            note: eventCulture.props.note,
            plotId: eventCulture.props.plotId,
            typeEventCulture: eventCulture.props.typeEventCulture,
            machine: eventCulture.props.machine,
            bringType: eventCulture.props.bringType,
            quantity: eventCulture.props.quantity,
            vegetable: eventCulture.props.vegetable,
            method: eventCulture.props.method,
            nbHuman: eventCulture.props.nbHuman,
            nbHours: eventCulture.props.nbHours,
            succes: eventCulture.props.succes,
            disease: eventCulture.props.disease,
            bug: eventCulture.props.bug,
        };
    }
}
exports.EventCultureApiResponseMapper = EventCultureApiResponseMapper;
