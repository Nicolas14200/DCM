import { useContext, useEffect, useState } from "react";
import { PlotsCaracContext, UserContext } from "../../../config/Context";
import { getEventById } from "../viewModels/GetEventById";
import { EventCultureProps } from "../../../core/domains/valuesObject/EventCultureProps";

export interface PlotEventProps {}

export const PlotEvent: React.FC<PlotEventProps> = () => {
  const { plotCaract } = useContext(PlotsCaracContext);
  const { user } = useContext(UserContext);
  const [events, setEvents] = useState<EventCultureProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (plotCaract?.eventCulture) {
        const eventsData = await Promise.all(
          plotCaract?.eventCulture.map((eventId) => callApi(eventId))
        );
        setEvents(eventsData);
      }
    };
    fetchData();
  }, [plotCaract, user]);

  const callApi = async (eventId: string) => {
    const result = await getEventById.execute(eventId, user?.token as string);
    const event = {
      id: result?.data.id,
      date: result?.data.date,
      note: result?.data.note,
      plotId: result?.data.plotId,
      typeEventCulture: result?.data.typeEventCulture,
      machine: result?.data.machine,
      quantity: result?.data.quantity,
      vegetable: result?.data.vegetable,
      method: result?.data.method,
      nbHuman: result?.data.nbHuman,
      nbHours: result?.data.nbHours,
      succes: result?.data.succes,
      disease: result?.data.disease,
      bug: result?.data.bug,
    };
    return event;
  };

  return (
    <>
      <h1>EVENT</h1>
      <div>
        {events.map((event, index) => (
          <div key={index} className="border-2 hover:bg-slate-200">
            <p>typeEventCulture: {event.typeEventCulture}</p>
            <p>Date: {event.date}</p>
            <p>Machine: {event.machine}</p>
            {/* Afficher d'autres propriétés ici */}
          </div>
        ))}
      </div>
    </>
  );
};
