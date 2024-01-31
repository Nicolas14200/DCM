import { EventCulture } from "../../../../core/domain/entities/eventCulture/EventCulture";
import { Mapper } from "../../../../core/domain/Mapper";
import { EventCultureResponse } from "../../../../core/domain/entities/apiResponse/EventCultureResponse";

export class EventCultureApiResponseMapper implements Mapper<EventCulture, EventCultureResponse>{
    fromDomain(eventCulture: EventCulture): EventCultureResponse {
        return {
            date:eventCulture.props.date,
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
            
        }
    }
}