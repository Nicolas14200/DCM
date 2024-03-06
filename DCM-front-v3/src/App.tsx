import { useState } from "react";
import "./App.css";
import {
  PlotCaracContextType,
  PlotContextType,
  plotActifContext,
  PlotsContext,
  UserContext,
  UserContextType,
} from "./config/Context";
import { Router } from "./modules/navigate/Router";
import { User } from "./core/domains/types/User";
import { PlotModel } from "./core/domains/types/PlotModel";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [plots, setPlots] = useState<PlotModel[] | null>(null);
  const [plotActif, setplotActif] = useState<PlotModel | null>(null);


  const valueProviderUer: UserContextType = { user, setUser };
  const valueProviderPlot: PlotContextType = { plots, setPlots };
  const valueProviderplotActif: PlotCaracContextType = {
    plotActif,
    setplotActif,
  };


  return (
    <>
      <UserContext.Provider value={valueProviderUer}>
        <PlotsContext.Provider value={valueProviderPlot}>
          <plotActifContext.Provider value={valueProviderplotActif}>
              <Router />
          </plotActifContext.Provider>
        </PlotsContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
