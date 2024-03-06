import { useContext, useEffect, useState } from "react";
import {
  plotActifContext,
  PlotsContext,
  UserContext,
} from "../../../config/Context";
import { EventCultureProps } from "../../../core/domains/valuesObject/EventCultureProps";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@mui/material";
import { eventCultureApi } from "../../../api/eventCulture/EventCultureApi";
import { PlotModel } from "../../../core/domains/types/PlotModel";
import { UpdateEventCulture } from "./UpdateEventCulture";
import { plotsApi } from "../../../api/plots/PlotsApi";
import { EventCultureModel } from "../../../core/domains/types/EventCulture";

export interface PlotEventProps {}

export const PlotEvent: React.FC<PlotEventProps> = () => {
  const { plotActif, setplotActif } = useContext(plotActifContext);
  const { user } = useContext(UserContext);
  const { setPlots } = useContext(PlotsContext);

  const [events, setEvents] = useState<EventCultureProps[]>([]);
  const [isModalUpdateEventOpen, setModalUpdateEventOpen] = useState(false);
  const [eventsToUpdate, setEventsToUpdate] = useState<EventCultureModel>();

  const getEvent = async (eventId: string) => {
    const result = await eventCultureApi.getEventById(
      eventId,
      user?.token as string
    );

    const event = {
      id: eventId,
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
      bringType: result?.data.bringType,
    };
    return event;
  };

  const deleteEvent = async (id: string) => {
    try {
      if (plotActif) {
        await eventCultureApi.deleteEvenCulture(
          id,
          plotActif.id,
          user?.token as string
        );
        await setCaractPlot(plotActif.codeName);
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const setCaractPlot = async (codeName: string) => {
    const plotByCodeName = await plotsApi.getPlotByCodeName({
      codeName: codeName,
      token: user?.token as string,
    });
    const PlotForContext: PlotModel = {
      id: plotByCodeName.props.id,
      name: plotByCodeName.props.name,
      codeName: plotByCodeName.props.codeName,
      width: plotByCodeName.props.width,
      heigth: plotByCodeName.props.heigth,
      area: plotByCodeName.props.area,
      ph: plotByCodeName.props.ph,
      pebbles: plotByCodeName.props.pebbles,
      plank: plotByCodeName.props.plank,
      series: plotByCodeName.props.series,
      subPlot: plotByCodeName.props.subPlot,
      eventCulture: plotByCodeName.props.eventCulture,
    };
    setplotActif(PlotForContext);
  };

  const updateEvent = async (id: string) => {
    const event = await getEvent(id);
    setEventsToUpdate(event);
    setModalUpdateEventOpen(true);
  };

  const closeModalUpdateEvent = async () => {
    await handleAllPlot();
    setModalUpdateEventOpen(false);
  };

  const handleAllPlot = async () => {
    const allPlots = await plotsApi.getAllPlot(user?.token as string);
    setPlots(allPlots);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (plotActif?.eventCulture) {
        const eventsData = await Promise.all(
          plotActif?.eventCulture.map((eventId) => getEvent(eventId))
        );

        setEvents(eventsData);
      }
    };
    fetchData();
  }, [plotActif]);

  return (
    <>
      <h1>EVENT</h1>
      <div>
        {events.map((event, index) => (
          <div key={index} className="border-2 hover:bg-slate-200">
            <div>
              <Button
                variant="contained"
                size="small"
                onClick={() => updateEvent(event.id)}
              >
                Update
              </Button>
            </div>
            {event.typeEventCulture !== "None" && (
              <p>{event.typeEventCulture}</p>
            )}
            <p>
              {new Date(event.date).toLocaleDateString()}{" "}
              {new Date(event.date).toLocaleTimeString()}
            </p>
            {event.machine !== "None" && <p>Machine: {event.machine}</p>}
            {event.quantity !== 0 && <p>quantity: {event.quantity}</p>}
            {event.vegetable?.vegetableName && <p>vegetable: {event.vegetable.vegetableName}</p>}
            {event.method && <p>method: {event.method}</p>}
            {event.nbHuman !== 0 && <p>nbHuman: {event.nbHuman}</p>}
            {event.nbHours !== 0 && <p>nbHours: {event.nbHours}</p>}
            {event.bringType !== "None" && <p>apport angrais: {event.bringType}</p>}
            {event.succes !== 0 && <p>succes: {event.succes}</p>}
            {event.disease && <p>disease: {event.disease}</p>}
            {event.note && <p>note: {event.note}</p>}
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => deleteEvent(event.id)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </div>
        ))}
      </div>
      {isModalUpdateEventOpen && eventsToUpdate && (
        <UpdateEventCulture
          onClose={closeModalUpdateEvent}
          open={isModalUpdateEventOpen}
          eventsToUpdate={eventsToUpdate}
        />
      )}
    </>
  );
};
