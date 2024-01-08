import { Box, Button, Modal } from "@mui/material";
import { TextFields } from "../../auth/components/TextField";
import { FormEvent, useContext } from "react";
import { addSeriesViewModel } from "../viewModels/AddSeriesViewModel";
import {
  PlotsCaracContext,
  UpdatePlotContext,
  UserContext,
} from "../../../config/Context";

interface AddSeriesProps {
  onClose: () => void;
  open: boolean;
}

export const AddSeries = ({ open, onClose }: AddSeriesProps) => {
  const { user } = useContext(UserContext);
  const { plotCaract } = useContext(PlotsCaracContext);
  const { setUpdatePlot } = useContext(UpdatePlotContext);
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    if (plotCaract && formData) {
      addSeriesViewModel.execute({
        plotId: plotCaract.id,
        series: {
          nbPlank: formData.get("nbPlank") as string,
          vegetableVariety: formData.get("vegetableVariety") as string,
        },
        token: user?.token as string,
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
              Series de Legume :
            </h1>
            <form
              onSubmit={handleSubmit}
              className="p-[8px] flex-collumns text-center"
            >
              <TextFields name="vegetableVariety" />
              <TextFields name="nbPlank" />
              <Button type="submit" variant="contained">
                Ajouter une Series
              </Button>
            </form>
          </Box>
        </>
      </Modal>
    </div>
  );
};
