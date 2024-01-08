import { Button } from "@mui/material";
import { Header } from "../../components/Header";
import { PlotCaract } from "../components/PlotCaract";
import { PlotEvent } from "../components/PlotEvent";
import { PlotList } from "../components/PlotList";
import { useContext, useEffect, useState } from "react";
import { CreatePlot } from "../components/CreatePlot";
import { AddSeries } from "../components/AddSeries";
import { AddEventCulture } from "../components/AddEventCulture";
import { PlotsContext, UpdatePlotContext, UserContext } from "../../../config/Context";
import { getAllPlotViewModel } from "../viewModels/GetAllPlotViewModel";

export interface PlotsDisplayProps {}

export const PlotsDisplay: React.FC<PlotsDisplayProps> = () => {
  const { user } = useContext(UserContext);
  const { setPlots } = useContext(PlotsContext);
  const { updatePlot, setUpdatePlot } = useContext(UpdatePlotContext);
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalSeriesOpen, setIsModalSeriesOpen] = useState(false);
  const [isModalEventOpen, setIsModalEventOpen] = useState(false);

  
  const handleAllPlot = async () => {
    const apiResult = await getAllPlotViewModel.execute(user?.token as string);
    setPlots(apiResult);
    setUpdatePlot(false);
  };
  const openModalCreatePlot = () => {
    setModalOpen(true);
  };
  const closeModalCreatePlot = () => {
    setModalOpen(false);
  };
  const openModalAddSeries = () => {
    setIsModalSeriesOpen(true)
  }

  const closeModalAddSeries = () => {
    setIsModalSeriesOpen(false)
  }
  const openModalAddEvent = () => {
    setIsModalEventOpen(true)
  }
  const closeModalAddEvent = () => {
    setIsModalEventOpen(false)
  }
  useEffect(() => {
    handleAllPlot();
  }, [updatePlot]);
  return (
    <>
      <div className="flex-collumns text-center">
        <Header />
        <div className="m-[8px] flex items-center justify-center">
          <div className="m-[8px]">
            <Button variant="contained" onClick={openModalCreatePlot}>
              Créé une parcelle
            </Button>
          </div>
          <div className="m-[8px]">
            <Button variant="contained" onClick={openModalAddSeries}>
              Ajouté une Series
            </Button>
          </div>
          <div className="m-[8px]">
            <Button variant="contained" onClick={openModalAddEvent}>
              Ajouté un Evenement
            </Button>
          </div>
        </div>

        {isModalOpen && (
          <CreatePlot onClose={closeModalCreatePlot} open={isModalOpen} />
        )}
        {isModalSeriesOpen && (
          <AddSeries onClose={closeModalAddSeries} open={isModalSeriesOpen} />
        )}
        {isModalEventOpen && (
          <AddEventCulture onClose={closeModalAddEvent} open={isModalEventOpen} />
        )

        }
        <div className="flex">
          <div className="border-2 w-[75%] h-[50%]">
            <PlotList />
          </div>
          <div className="border-2 w-[25%] h-[50%]">
            <PlotCaract />
          </div>
        </div>
        <div className="border-2  w-[100%] h-[50%]">
          <PlotEvent />
        </div>
      </div>
    </>
  );
};
