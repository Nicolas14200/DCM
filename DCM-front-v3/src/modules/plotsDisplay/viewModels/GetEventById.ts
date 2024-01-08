import { eventCultureApi } from "../../../adapters/api/eventCulture/EventCultureApi";

class GetEventById {
    async execute (id: string, token:string){
        return eventCultureApi.getEventById(id, token)
    }
}
export const getEventById = new GetEventById()