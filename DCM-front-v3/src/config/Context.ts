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
  plotActif: PlotModel | null;
  setplotActif: React.Dispatch<React.SetStateAction<PlotModel | null>>;
}

export const plotActifContext = React.createContext<PlotCaracContextType>({
  plotActif: null,
  setplotActif: () => {},
});

export interface EventCultureContextType {
  eventCulture: EventCultureModel | null;
  setEventCulture: React.Dispatch<React.SetStateAction<EventCultureModel | null>>;
}

export const EventCultureContext = React.createContext<EventCultureContextType>({
  eventCulture: null,
  setEventCulture: () => {},
});