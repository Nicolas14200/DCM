import { Box, Button, Modal } from "@mui/material";
import { TextFields } from "../../auth/components/TextField";
import { FormEvent, useContext } from "react";
import { UpdatePlotContext, UserContext } from "../../../config/Context";
import { plotsApi } from "../../../adapters/api/plots/PlotsApi";

interface CreatePlotProps {
  onClose: () => void;
  open: boolean;
}
export const CreatePlot = ({ open, onClose }: CreatePlotProps) => {

  const { user } = useContext(UserContext);
  const { setUpdatePlot } = useContext(UpdatePlotContext);
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    plotsApi.createPlot({
      name: formData.get("name") as string,
      codeName: formData.get("codeName") as string,
      width: parseInt(formData.get("width") as string, 10),
      heigth: parseInt(formData.get("heigth") as string, 10),
      ph: parseInt(formData.get("ph") as string, 10),
      pebbles: parseInt(formData.get("pebbles") as string, 10),
      plank: parseInt(formData.get("plank") as string, 10),
      token: user?.token as string,
    });
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
            <div className="mt-[25%]">
              <h1 className="text-center pt-[8px] pb-[8px]">Create a Plot :</h1>
              <form
                onSubmit={handleSubmit}
                className="p-[8px] flex-collumns text-center"
              >
                <TextFields name="name" />
                <TextFields name="codeName" />
                <TextFields name="width" />
                <TextFields name="heigth" />
                <TextFields name="ph" />
                <TextFields name="pebbles" />
                <TextFields name="plank" />
                <Button type="submit" variant="contained">
                  Ajouter Parcelle
                </Button>
              </form>
            </div>
          </Box>
        </>
      </Modal>
    </div>
  );
};
