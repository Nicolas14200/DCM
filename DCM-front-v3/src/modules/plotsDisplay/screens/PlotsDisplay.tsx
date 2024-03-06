import { Button } from "@mui/material";
import { Header } from "../../components/Header";
import { PlotCaract } from "../components/PlotCaract";
import { PlotEvent } from "../components/PlotEvent";
import { PlotList } from "../components/PlotList";
import { useContext, useEffect, useState } from "react";
import { CreatePlot } from "../components/CreatePlot";
import { AddSeries } from "../components/AddSeries";
import { AddEventCulture } from "../components/AddEventCulture";
import {
  PlotsContext,
  UserContext,
} from "../../../config/Context";
import { plotsApi } from "../../../api/plots/PlotsApi";

export interface PlotsDisplayProps {}

export const PlotsDisplay: React.FC<PlotsDisplayProps> = () => {
  const { user } = useContext(UserContext);
  const { setPlots } = useContext(PlotsContext);

  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalSeriesOpen, setIsModalSeriesOpen] = useState(false);
  const [isModalEventOpen, setIsModalEventOpen] = useState(false);

  const handleAllPlot = async () => {
    const allPlots = await plotsApi.getAllPlot(user?.token as string);
    setPlots(allPlots);
  };

  const openModalCreatePlot = () => {
    setModalOpen(true);
  };

  const closeModalCreatePlot = async () => {
    await handleAllPlot();
    setModalOpen(false);
  };

  const openModalAddSeries = () => {
    setIsModalSeriesOpen(true);
  };

  const closeModalAddSeries = async () => {
    await handleAllPlot();
    setIsModalSeriesOpen(false);
  };

  const openModalAddEvent = () => {
    setIsModalEventOpen(true);
  };

  const closeModalAddEvent = async () => {
    await handleAllPlot();
    setIsModalEventOpen(false);
  };

  useEffect(() => {
    handleAllPlot();
  }, []);

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
          <AddSeries onClose={closeModalAddSeries} open={isModalSeriesOpen} setCaractPlot={handleAllPlot}/>
        )}

        {isModalEventOpen && (
          <AddEventCulture
            onClose={closeModalAddEvent}
            open={isModalEventOpen}
          />
        )}

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
