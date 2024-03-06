import { BringType } from "../../core/domains/valuesObject/BringType";
import { Machine } from "../../core/domains/valuesObject/Machine";
import { TypeEventCulture } from "../../core/domains/valuesObject/TypeEventCulture";
import { Vegetable } from "../../core/domains/valuesObject/Vegetable";
import { httpClient } from "../httpClient";

export interface CreateEventCultureProps {
  plotId: string;
  note?: string;
  typeEventCulture?: TypeEventCulture;
  machine?: Machine;
  bringType?: BringType;
  quantity?: number;
  vegetable?: Vegetable;
  method?: string;
  nbHuman?: number;
  nbHours?: number;
  succes?: number;
  disease?: string;
  bug?: string;
  token: string;
}

export interface UpdateEventCultureProps{
  id: string;
  note?:string;
  typeEventCulture?: TypeEventCulture;
  machine?: Machine;
  bringType?: BringType;
  quantity?: number;
  vegetable?: Vegetable;
  method?: string;
  nbHuman?: number;
  nbHours?: number;
  succes?: number;
  disease?: string;
  bug?: string;
  token: string;
}

export class EventCultureApi {
  async getEventById(id: string, token: string) {
    try {
      const result = await httpClient.post(
        "event/getbyid",
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async createEventCulture(payload: CreateEventCultureProps) {
    try {
      const result = await httpClient.post(
        "event/create",
        {
          note: payload.note,
          plotId: payload.plotId,
          typeEventCulture: payload.typeEventCulture,
          machine: payload.machine,
          bringType: payload.bringType,
          quantity: payload.quantity,
          vegetable: payload.vegetable,
          method: payload.method,
          nbHuman: payload.nbHuman,
          nbHours: payload.nbHours,
          succes: payload.succes,
          disease: payload.disease,
          bug: payload.bug,
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteEvenCulture(id: string, plotId: string, token: string) {
    try {
      const result = await httpClient.post(
        "event/delete",
        {
          id,
          plotId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return result;
    } catch (e) {
      console.log(e);
    }
  }

  async updateEventCulture(payload: UpdateEventCultureProps){

    try {
      const result = await httpClient.put(
        "event/update",
        {
          ...payload
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      return result;
    } catch (e) {
      console.log(e);
    }
  }
}
export const eventCultureApi = new EventCultureApi();
