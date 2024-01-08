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
import { eventCultureApi } from "../../../adapters/api/eventCulture/EventCultureApi";
import {
  PlotsCaracContext,
  UpdatePlotContext,
  UserContext,
} from "../../../config/Context";
import { TextFields } from "../../auth/components/TextField";
import { BringType } from "../../../core/domains/valuesObject/BringType";
import { Vegetable } from "../../../core/domains/valuesObject/Vegetable";

interface AddEventCultureProps {
  onClose: () => void;
  open: boolean;
}

export const AddEventCulture = ({ open, onClose }: AddEventCultureProps) => {
  const { user } = useContext(UserContext);
  const [typeEventCulture, setTypeEventCulture] = useState<string>("");
  const [machine, setMachine] = useState<string>("");
  const { plotCaract } = useContext(PlotsCaracContext);
  const { setUpdatePlot } = useContext(UpdatePlotContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (plotCaract) {
      await eventCultureApi.createEventCulture({
        plotId: plotCaract.id as string,
        token: user?.token as string,
        typeEventCulture: formData.get("typeEventCulture") as TypeEventCulture,
        note: formData.get("note") as string,
        machine:formData.get("machine") as Machine,
        nbHuman: formData.get("nbHuman") as unknown as number,
        nbHours: formData.get("nbHours") as unknown as number,
        bringType:formData.get("bringType") as BringType,
        quantity: formData.get("quantity") as unknown as number,
        vegetable: formData.get("vegetable") as unknown as Vegetable,
        method: formData.get("method") as string,
        succes: formData.get("succes") as unknown as number,
        disease: formData.get("disease") as string,
        bug: formData.get("bug") as string,
      });
    }
    setUpdatePlot(true);
    onClose();
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
              <div className="w-[150px] m-[auto]">
                <TextFields name="nbHuman" />
              </div>
              <p>Nombre d'heure</p>
              <div className="w-[150px] m-[auto]">
                <TextFields name="nbHeure" />
              </div>
              <p>Note</p>
              <div >
              <textarea className="border" />
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
