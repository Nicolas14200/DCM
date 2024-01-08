import React from "react";
import { User } from "../core/domains/types/User";
import { PlotModel } from "../core/domains/types/PlotModel";
import { EventCultureModel } from "../core/domains/types/EventCulture";

export interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export interface PlotContextType {
  plots: PlotModel[] | null;
  setPlots: React.Dispatch<React.SetStateAction<PlotModel[] | null>>;
}

export const PlotsContext = React.createContext<PlotContextType>({
  plots: null,
  setPlots: () => {},
});

export interface PlotCaracContextType {
  plotCaract: PlotModel | null;
  setPlotCaract: React.Dispatch<React.SetStateAction<PlotModel | null>>;
}

export const PlotsCaracContext = React.createContext<PlotCaracContextType>({
  plotCaract: null,
  setPlotCaract: () => {},
});

export interface EventCultureContextType {
  eventCulture: EventCultureModel | null;
  setEventCulture: React.Dispatch<React.SetStateAction<EventCultureModel | null>>;
}

export const EventCultureContext = React.createContext<EventCultureContextType>({
  eventCulture: null,
  setEventCulture: () => {},
});

export interface UpdatePlotContextType {
  updatePlot: boolean;
  setUpdatePlot: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UpdatePlotContext = React.createContext<UpdatePlotContextType>({
  updatePlot: false,
  setUpdatePlot: () => {},
});