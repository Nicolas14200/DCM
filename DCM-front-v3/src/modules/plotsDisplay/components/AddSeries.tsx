import { Box, Button, Modal } from "@mui/material";
import { TextFields } from "../../auth/components/TextField";
import { FormEvent, useContext, useState } from "react";
import { plotActifContext, UserContext } from "../../../config/Context";
import { plotsApi } from "../../../api/plots/PlotsApi";
import { PlotModel } from "../../../core/domains/types/PlotModel";

interface AddSeriesProps {
  onClose: () => void;
  open: boolean;
  setCaractPlot: (codeName: string) => Promise<void>;
}

export const AddSeries = ({ open, onClose }: AddSeriesProps) => {
  const { user } = useContext(UserContext);
  const { plotActif, setplotActif } = useContext(plotActifContext);

  const [formData, setFormData] = useState({
    plotId: "",
    series: {
      vegetableVariety: "",
      nbPlank: 0,
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      series: {
        ...prevFormData.series,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (plotActif && formData) {
      await plotsApi.addSeries({
        id: plotActif.id,
        token: user?.token as string,
        series: {
          vegetableVariety: formData.series.vegetableVariety,
          nbPlank: formData.series.nbPlank,
        },
      });
      if (setCaractPlot) {
        await setCaractPlot(plotActif.codeName);
      }
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
            <h1 className="text-center mt-[25%] pt-[8px] pb-[8px]">
              Series de Legume :
            </h1>
            <form
              onSubmit={handleSubmit}
              className="p-[8px] flex-collumns text-center"
            >
              <TextFields
                name="vegetableVariety"
                onChange={handleInputChange}
              />
              <TextFields name="nbPlank" onChange={handleInputChange} />
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
