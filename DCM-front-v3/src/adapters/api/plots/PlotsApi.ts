import { PlotModel } from "../../../core/domains/types/PlotModel";
import { Series } from "../../../core/domains/valuesObject/Series";
import { httpClient } from "../httpClient";
export interface CreatePlotProps {
  name: string;
  codeName: string;
  width: number;
  heigth: number;
  ph: number;
  pebbles: number;
  plank: number;
  token: string;
}
class PlotsApi {
  async getAllPlot(token: string) {

    const result = await httpClient.post("/plot/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  }
  async createPlot(payload: CreatePlotProps) {
    try {
      const result = await httpClient.post(
        "/plot/create",
        {
          name: payload.name,
          codeName: payload.codeName,
          width: +payload.width,
          heigth: +payload.heigth,
          ph: +payload.ph,
          pebbles: +payload.pebbles,
          plank: +payload.plank,
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }
  async deletePlot(payload: { id: string; token: string }) {
    await httpClient.delete(`/plot/${payload.id}`, {
      headers: {
        Authorization: `Bearer ${payload.token}`,
      },
    });
  }
  async updatePlot(payload: { plot: PlotModel; id: string; token: string }) {
    console.log("payload", payload, payload.id);
    await httpClient.put(
      `/plot/`,
      {
        id: payload.id,
        codeName: payload.plot.codeName,
        name: payload.plot.name,
        pebbles: +payload.plot.pebbles,
        ph: +payload.plot.ph,
        plank: +payload.plot.plank,
        heigth: +payload.plot.heigth,
        width: +payload.plot.width,
      },
      {
        headers: {
          Authorization: `Bearer ${payload.token}`,
        },
      }
    );
  }
  async getPlotByCodeName(payload: { codeName: string; token: string }) {
    try {
      const result = await httpClient.post(
        "/plot/getplotbycodename",
        {
          codeName: payload.codeName,
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      return result.data;
    } catch (e) {
      console.log(e);
    }
  }
  async addSeries(payload:{id:string, series: Series, token:string}){
    try {
      const result = await httpClient.post(
        "/plot/addseries",
        {
          plotId: payload.id,
          series:{
            nbPlank: payload.series.nbPlank,
            vegetableVariety: payload.series.vegetableVariety,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${payload.token}`,
          },
        }
      );
      return result.data;
    }catch(e){
      console.log(e);
    }
  }
}

export const plotsApi = new PlotsApi();
