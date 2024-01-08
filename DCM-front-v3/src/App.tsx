import { useState } from "react";
import "./App.css";
import {
  EventCultureContext,
  EventCultureContextType,
  PlotCaracContextType,
  PlotContextType,
  PlotsCaracContext,
  PlotsContext,
  UpdatePlotContext,
  UpdatePlotContextType,
  UserContext,
  UserContextType,
} from "./config/Context";
import { Router } from "./modules/navigate/Router";
import { User } from "./core/domains/types/User";
import { PlotModel } from "./core/domains/types/PlotModel";
import { EventCultureModel } from "./core/domains/types/EventCulture";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [plots, setPlots] = useState<PlotModel[] | null>(null);
  const [plotCaract, setPlotCaract] = useState<PlotModel | null>(null);
  const [eventCulture, setEventCulture] = useState<EventCultureModel | null>(
    null
  );
  const [updatePlot, setUpdatePlot] = useState<boolean>(false);
  const valueProviderUer: UserContextType = { user, setUser };
  const valueProviderPlot: PlotContextType = { plots, setPlots };
  const valueProviderPlotCaract: PlotCaracContextType = {
    plotCaract,
    setPlotCaract,
  };
  const valueProviderEventCulture: EventCultureContextType = {
    eventCulture,
    setEventCulture,
  };
  const valueProviderUpdatePlot: UpdatePlotContextType = {
    updatePlot,
    setUpdatePlot,
  };
  return (
    <>
      <UserContext.Provider value={valueProviderUer}>
        <PlotsContext.Provider value={valueProviderPlot}>
          <PlotsCaracContext.Provider value={valueProviderPlotCaract}>
            <EventCultureContext.Provider value={valueProviderEventCulture}>
              <UpdatePlotContext.Provider value={valueProviderUpdatePlot}>
                <Router />
              </UpdatePlotContext.Provider>
            </EventCultureContext.Provider>
          </PlotsCaracContext.Provider>
        </PlotsContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
