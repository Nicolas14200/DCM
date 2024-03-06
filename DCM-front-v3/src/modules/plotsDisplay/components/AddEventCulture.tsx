import { useState, FormEvent, useContext } from "react";
import {
  Box,
  Button,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { TypeEventCulture } from "../../../core/domains/valuesObject/TypeEventCulture";
import { Machine } from "../../../core/domains/valuesObject/Machine";
import { eventCultureApi } from "../../../api/eventCulture/EventCultureApi";
import { plotActifContext, UserContext } from "../../../config/Context";
import { BringType } from "../../../core/domains/valuesObject/BringType";
import { Vegetable } from "../../../core/domains/valuesObject/Vegetable";
import { PlotModel } from "../../../core/domains/types/PlotModel";
import { plotsApi } from "../../../api/plots/PlotsApi";

interface AddEventCultureProps {
  onClose: () => void;
  open: boolean;
}

export const AddEventCulture = ({ open, onClose }: AddEventCultureProps) => {
  const { user } = useContext(UserContext);
  const { plotActif, setplotActif } = useContext(plotActifContext);

  const [typeEventCulture, setTypeEventCulture] = useState<string>("None");
  const [machine, setMachine] = useState<string>("None");
  const [nbHuman, setNbHuman] = useState<number>(0);
  const [nbHours, setNbHours] = useState<number>(0);
  const [bringType, setBringType] = useState<string>("None");
  const [note, setNote] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [method, setMethod] = useState<string>("");
  const [succes, setSucces] = useState<number>(0);
  const [disease, setDisease] = useState<string>("");
  const [bug, setBug] = useState<string>("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (plotActif && formData) {
      await eventCultureApi.createEventCulture({
        plotId: plotActif.id,
        token: user?.token as string,
        typeEventCulture: typeEventCulture as TypeEventCulture,
        nbHuman: nbHuman,
        nbHours: nbHours,
        bringType: bringType as BringType,
        machine: machine as Machine,
        note: note,
        quantity: quantity,
        method: method,
        succes: succes,
        disease: disease,
        bug: bug,
        vegetable: formData.get("vegetable") as unknown as Vegetable,
      });
    }
    if (plotActif) {
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
    <div>
      <Modal open={open} onClose={onClose}>
        <>
          <Box
            sx={{
              marginLeft: "25%",
              width: "50%",
              bgcolor: "background.paper",
            }}
          >
            <h1 className="text-center pt-[8px] pb-[8px]">
              EVENEMENT DE CULTURE :
            </h1>
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
                  onChange={(e) => setNote(e.target.value as string)}
                />
              </div>
              <div>
                <Button type="submit" variant="contained">
                  Ajouter un evenement
                </Button>
              </div>
            </form>
          </Box>
        </>
      </Modal>
    </div>
  );
};
