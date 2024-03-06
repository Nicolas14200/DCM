import { useState, useContext, useEffect } from "react";
import {
  UserContext,
  PlotsContext,
  plotActifContext,
} from "../../../config/Context";
import { PlotModel } from "../../../core/domains/types/PlotModel";
import { plotsApi } from "../../../api/plots/PlotsApi";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
export interface PlotDisplayProps {}

export const PlotList: React.FC<PlotDisplayProps> = () => {
  const { user } = useContext(UserContext);
  const { plots, setPlots } = useContext(PlotsContext);
  const { setplotActif } = useContext(plotActifContext);

  const [selectedPlot, setSelectedPlot] = useState<PlotModel | null>(null);

  const setCaractPlot = async (codeName: string) => {

      const plotByCodeName = await plotsApi.getPlotByCodeName({
        codeName: codeName,
        token: user?.token as string,
      });
      if (plotByCodeName) {
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
      setSelectedPlot(PlotForContext);
      setplotActif(PlotForContext);
    }
  };

  const deletePlot = async (id: string) => {
    await plotsApi.deletePlot({ id: id, token: user?.token as string });
    const allPlots = await plotsApi.getAllPlot(user?.token as string);
    setPlots(allPlots);
    setplotActif(null);
  };

  useEffect(() => {
    if (selectedPlot) {
      setCaractPlot(selectedPlot?.codeName as string);
    }
  }, []);

  return (
    <>
      <h1>PARCELLE</h1>
      {plots != null &&
        plots.length > 0 &&
        plots.map((plot: PlotModel, index) => {
          return (
            <ul
              key={index}
              className={`border-2 rounded hover:bg-slate-300 hover:cursor-pointer ${
                plot.codeName === selectedPlot?.codeName ? "bg-gray-300" : ""
              }`}
              onClick={() => setCaractPlot(plot.codeName)}
            >
              <li>
                Nom : <strong>{plot.name} </strong>
                <IconButton
                  aria-label="delete"
                  size="large"
                  onClick={() => deletePlot(plot.id)}
                >
                  <DeleteForeverIcon style={{ fontSize: 15 }} />
                </IconButton>
              </li>
              <li>CodeName : {plot.codeName}</li>
            </ul>
          );
        })}
    </>
  );
};
