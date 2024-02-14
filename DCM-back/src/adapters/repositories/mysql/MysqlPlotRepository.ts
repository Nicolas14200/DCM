import { Plot } from "../../../core/domain/entities/plot/Plot";
import { PlotRepository } from "../../../core/domain/repositories/PlotRepository";
import { injectable } from "inversify";
import mysql, { RowDataPacket } from "mysql2";
import { Series } from "../../../core/domain/valueObjects/Series";

@injectable()
export class MysqlPlotRepository implements PlotRepository {
  constructor(private readonly connect: mysql.Connection) {
    this.connect = connect;
  }

  async save(plot: Plot): Promise<Plot> {
    await this.connect.promise().query<RowDataPacket[]>(
      `INSERT IGNORE INTO plot (id, name, code_name, width, height, area, ph, pebbles, plank)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        plot.props.id,
        plot.props.name,
        plot.props.codeName,
        plot.props.width,
        plot.props.heigth,
        plot.props.area,
        plot.props.ph,
        plot.props.pebbles,
        plot.props.plank,
      ]
    );

    await this.saveSeries(plot.props.series, plot.props.id);
    return plot;
  }

  async saveSeries(series: Series[], plotId: string) {
    if (series.length > 0) {
      await this.connect.promise().query(
        `DELETE FROM series
         WHERE plot_id = ?`,
        [plotId]
      );
      const seriesValues = series.map((serie: Series) => [
        plotId,
        serie.vegetableVariety,
        serie.nbPlank,
      ]);

      await this.connect.promise().query(
        `INSERT INTO series (plot_id, vegetable_variety, nb_plank)
         VALUES ?`,
        [seriesValues]
      );
    }
  }

  async update(plot: Plot): Promise<Plot> {
    await this.connect.promise().query<RowDataPacket[]>(
      `UPDATE plot SET name = ?,
                       code_name = ?,
                       width = ?,
                       height = ?,
                       area = ?,
                       ph = ?,
                       pebbles = ?,
                       plank = ?
        WHERE id = ?
            `,
      [
        plot.props.name,
        plot.props.codeName,
        plot.props.width,
        plot.props.heigth,
        plot.props.area,
        plot.props.ph,
        plot.props.pebbles,
        plot.props.plank,
        plot.props.id,
      ]
    );
    await this.saveSeries(plot.props.series, plot.props.id);
    return plot;
  }

  async getById(id: string): Promise<Plot> {
    const [results] = await this.connect
      .promise()
      .query<RowDataPacket[]>(`SELECT * FROM plot WHERE id = ?`, [id]);

    if (results && results.length > 0) {
      return new Plot({
        codeName: results[0].code_name,
        area: results[0].area,
        eventCulture: [],
        id: results[0].id,
        name: results[0].name,
        subPlot: results[0].sub_plot,
        heigth: results[0].height,
        pebbles: results[0].pebbles,
        ph: results[0].ph,
        plank: results[0].plank,
        width: results[0].width,
        series: [],
      });
    } else {
      return null;
    }
  }

  async getByCodeName(codeName: string): Promise<Plot> {
    const [results] = await this.connect.promise().query<RowDataPacket[]>(
      `
        SELECT
        p.code_name,
        p.area,
        GROUP_CONCAT(DISTINCT e.id) AS event_culture,
        p.id,
        p.name,
        p.sub_plot,
        p.height,
        p.pebbles,
        p.ph,
        p.plank,
        p.width,
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'vegetableVariety', s.vegetable_variety,
                    'nbPlank', s.nb_plank
                )
            )
            FROM (
                SELECT s.vegetable_variety, s.nb_plank
                FROM series AS s
                WHERE p.id = s.plot_id
                ORDER BY s.vegetable_variety
            ) AS s
        ) AS series
    FROM plot AS p
    LEFT JOIN event_culture AS e ON p.id = e.plot_id
    WHERE p.code_name = ?
    GROUP BY p.id
        `,
      [codeName]
    );
    if (results && results.length > 0) {
      return new Plot({
        codeName: results[0].code_name,
        area: results[0].area,
        eventCulture: results[0].event_culture
          ? results[0].event_culture.split(",")
          : [],
        id: results[0].id,
        name: results[0].name,
        subPlot: results[0].sub_plot,
        heigth: results[0].height,
        pebbles: results[0].pebbles,
        ph: results[0].ph,
        plank: results[0].plank,
        width: results[0].width,
        series: results[0].series
          ? results[0].series.map((obj: any) => {
              return {
                vegetableVariety: obj.vegetableVariety,
                nbPlank: obj.nbPlank,
              };
            })
          : [],
      });
    } else {
      return null;
    }
  }

  async getAll(): Promise<Plot[]> {
    const [results] = await this.connect.promise().query<RowDataPacket[]>(
      `
            SELECT p.*, s.vegetable_variety, s.nb_plank, e.id AS ev_id
            FROM plot AS p 
            LEFT JOIN series AS s ON p.id = s.plot_id
            LEFT JOIN event_culture AS e ON p.id = e.plot_id
        `,
      []
    );

    const plotsMap = new Map<string, Plot>();

    if (results && results.length > 0) {
      results.forEach((plot) => {
        const plotId = plot.id;

        let currentPlot = plotsMap.get(plotId);
        if (!currentPlot) {
          currentPlot = new Plot({
            codeName: plot.code_name,
            area: plot.area,
            id: plot.id,
            name: plot.name,
            subPlot: plot.sub_plot,
            heigth: plot.height,
            pebbles: plot.pebbles,
            ph: plot.ph,
            plank: plot.plank,
            width: plot.width,
            series: [],
            eventCulture: [],
          });
          plotsMap.set(plotId, currentPlot);
        }

        const existingSeries = currentPlot.props.series.find(
          (series) =>
            series.vegetableVariety === plot.vegetable_variety &&
            series.nbPlank === plot.nb_plank
        );

        if (!existingSeries && plot.vegetable_variety && plot.nb_plank) {
          currentPlot.props.series.push({
            vegetableVariety: plot.vegetable_variety,
            nbPlank: plot.nb_plank,
          });
        }

        if (plot.ev_id) {
          currentPlot.props.eventCulture.push(plot.ev_id);
        }
      });
    }

    const plots: Plot[] = Array.from(plotsMap.values());
    return plots;
  }

  async delete(id: string): Promise<boolean> {
    await this.connect
      .promise()
      .query<RowDataPacket[]>("DELETE FROM plot WHERE id = ?", [id]);
    return true;
  }
}
