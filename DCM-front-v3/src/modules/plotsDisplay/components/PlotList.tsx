import { useState, useContext, useEffect } from "react";
import {
  UserContext,
  PlotsContext,
  PlotsCaracContext,
  UpdatePlotContext,
} from "../../../config/Context";
import { PlotModel } from "../../../core/domains/types/PlotModel";
import { getPlotByCodeNameViewModel } from "../viewModels/GetPlotByCodeNameViewModel";

export interface PlotDisplayProps {}

export const PlotList: React.FC<PlotDisplayProps> = () => {
  const { user } = useContext(UserContext);
  const { plots } = useContext(PlotsContext);
  const [selectedPlot, setSelectedPlot] = useState<PlotModel | null>(null);
  const { setPlotCaract } = useContext(PlotsCaracContext);
  const { updatePlot, setUpdatePlot } = useContext(UpdatePlotContext);

  const setCaractPlot = async (codeName: string) => {
    const plotByCodeName = await getPlotByCodeNameViewModel.execute({
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
    setUpdatePlot(true);
    setSelectedPlot(PlotForContext);
    setPlotCaract(PlotForContext);
  };

  useEffect(() => {
    if (selectedPlot) {
      setCaractPlot(selectedPlot?.codeName as string);
    }
  }, [updatePlot]);

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
              <li>name : {plot.name}</li>
              <li>CodeName : {plot.codeName}</li>
            </ul>
          );
        })}
    </>
  );
};
