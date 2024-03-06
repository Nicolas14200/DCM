import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";
import { EventCultureModel } from "../../../core/domains/types/EventCulture";
import { FormEvent, useContext, useState } from "react";
import { TypeEventCulture } from "../../../core/domains/valuesObject/TypeEventCulture";
import { Machine } from "../../../core/domains/valuesObject/Machine";
import { BringType } from "../../../core/domains/valuesObject/BringType";
import { eventCultureApi } from "../../../api/eventCulture/EventCultureApi";
import { UserContext, plotActifContext } from "../../../config/Context";
import { PlotModel } from "../../../core/domains/types/PlotModel";
import { plotsApi } from "../../../api/plots/PlotsApi";

export interface UpdateEventCultureProps {
  onClose: () => void;
  open: boolean;
  eventsToUpdate: EventCultureModel;
}

export const UpdateEventCulture = ({
  open,
  onClose,
  eventsToUpdate,
}: UpdateEventCultureProps) => {
  const { user } = useContext(UserContext);
  const { plotActif, setplotActif } = useContext(plotActifContext);

  const [typeEventCulture, setTypeEventCulture] = useState<string>(
    eventsToUpdate.typeEventCulture as string
  );
  const [machine, setMachine] = useState<string>(
    eventsToUpdate.machine as string
  );
  const [nbHuman, setNbHuman] = useState<number>(
    eventsToUpdate.nbHuman as number
  );
  const [nbHours, setNbHours] = useState<number>(
    eventsToUpdate.nbHours as number
  );
  const [bringType, setBringType] = useState<string>(
    eventsToUpdate.bringType as string
  );
  const [note, setNote] = useState<string>(eventsToUpdate.note as string);
  const [quantity, setQuantity] = useState<number>(
    eventsToUpdate.quantity as number
  );
  const [method, setMethod] = useState<string>(eventsToUpdate.method as string);
  const [succes, setSucces] = useState<number>(eventsToUpdate.succes as number);
  const [disease, setDisease] = useState<string>(
    eventsToUpdate.disease as string
  );
  const [bug, setBug] = useState<string>(eventsToUpdate.bug as string);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (plotActif) {
      await eventCultureApi.updateEventCulture({
        id: eventsToUpdate.id,
        note: note,
        typeEventCulture: typeEventCulture as TypeEventCulture,
        machine: machine as Machine,
        bringType: bringType as BringType,
        quantity: quantity,
        method: method,
        nbHuman: nbHuman,
        nbHours: nbHours,
        succes: succes,
        disease: disease,
        bug: bug,
        token: user?.token as string,
      });
      await setCaractPlot(plotActif.codeName);
    }
    onClose();
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
  const handleChangeNbHuman = (event: any) => {
    setNbHuman(+event.target.value);
  };

  const handleChangeNbHours = (event: any) => {
    setNbHours(+event.target.value);
  };

  const handleChangeQuantity = (event: any) => {
    setQuantity(+event.target.value);
  };

  const handleChangeMethod = (event: any) => {
    setMethod(event.target.value);
  };

  const handleChangeSucces = (event: any) => {
    setSucces(+event.target.value);
  };

  const handleChangeDisease = (event: any) => {
    setDisease(event.target.value);
  };

  const handleChangeBug = (event: any) => {
    setBug(event.target.value);
  };
  return (
    <>
      <Modal open={open} onClose={onClose}>
        <>
          <Box
            sx={{
              marginLeft: "25%",
              width: "50%",
              bgcolor: "background.paper",
            }}
          >
            <div>
              <h1 className="text-center pt-[8px] pb-[8px]">Update a Plot :</h1>
              <form
                onSubmit={handleSubmit}
                className="p-[8px] flex-collumns text-center"
              >
                <p>Type d'événement culturel</p>
                <FormControl sx={{ marginBottom: "16px" }}>
                  <InputLabel id="typeEventCultureLabel">
                    Type d'événement culturel
                  </InputLabel>
                  <Select
                    labelId="typeEventCultureLabel"
                    id="typeEventCulture"
                    name="typeEventCulture"
                    value={typeEventCulture}
                    onChange={(e) =>
                      setTypeEventCulture(e.target.value as string)
                    }
                    sx={{ width: "150px", marginBottom: "16px" }}
                  >
                    {Object.values(TypeEventCulture).map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <p>Machine</p>
                <FormControl sx={{ marginBottom: "16px" }}>
                  <InputLabel id="TypeMachineLabel">Machine</InputLabel>
                  <Select
                    labelId="TypeMachineLabel"
                    id="TypeMachine"
                    name="TypeMachine"
                    value={machine}
                    onChange={(e) => setMachine(e.target.value as string)}
                    sx={{ width: "150px", marginBottom: "16px" }}
                  >
                    {Object.values(Machine).map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <p>Nombre d'humain</p>
                <div>
                  <input
                    type="number"
                    name="nbHuman"
                    value={nbHuman}
                    onChange={handleChangeNbHuman}
                    className="text-center border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <p>Nombre d'heure</p>
                <div>
                  <input
                    type="number"
                    name="nbHuman"
                    value={nbHours}
                    onChange={handleChangeNbHours}
                    className="text-center border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <p>Quantity</p>
                <div>
                  <input
                    type="number"
                    name="quantity"
                    value={quantity}
                    onChange={handleChangeQuantity}
                    className="text-center border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <p>Method</p>
                <div>
                  <input
                    type="text"
                    name="method"
                    value={method}
                    onChange={handleChangeMethod}
                    className="text-center border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <p>Succes</p>
                <div>
                  <input
                    type="number"
                    name="succes"
                    value={succes}
                    onChange={handleChangeSucces}
                    className="text-center border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <p>Disease</p>
                <div>
                  <input
                    type="text"
                    name="disease"
                    value={disease}
                    onChange={handleChangeDisease}
                    className="text-center border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <p>Bug</p>
                <div>
                  <input
                    type="text"
                    name="succes"
                    value={bug}
                    onChange={handleChangeBug}
                    className="text-center border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <p>Apport d'engrais</p>
                <FormControl sx={{ marginBottom: "16px" }}>
                  <InputLabel id="BringType">Apport</InputLabel>
                  <Select
                    labelId="BringType"
                    id="BringType"
                    name="BringType"
                    value={bringType}
                    onChange={(e) => setBringType(e.target.value as string)}
                    sx={{ width: "150px", marginBottom: "16px" }}
                  >
                    {Object.values(BringType).map((type, index) => (
                      <MenuItem key={index} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <p>Note</p>
                <div>
                  <textarea
                    className="border"
                    value={note}
                    onChange={(e) => setNote(e.target.value as string)}
                  />
                </div>
                <div>
                  <Button type="submit" variant="contained">
                    Update un evenement
                  </Button>
                </div>
              </form>
            </div>
          </Box>
        </>
      </Modal>
    </>
  );
};
