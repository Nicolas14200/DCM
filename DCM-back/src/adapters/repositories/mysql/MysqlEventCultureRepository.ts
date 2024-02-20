import { injectable } from "inversify";
import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { EventCultureRepository } from "../../../core/domain/repositories/EventCultureRepository";
import mysql, { RowDataPacket } from "mysql2";
import { EventCultureError } from "../../../core/domain/models/errors/EventCultureError";

@injectable()
export class MysqlEventCultureRepository implements EventCultureRepository {
  constructor(private readonly connect: mysql.Connection) {
    this.connect = connect;
  }

  async save(eventCulture: EventCulture): Promise<EventCulture> {
    const [results] = await this.connect.promise().query(
      `
            INSERT IGNORE INTO event_culture (id, 
                                              plot_id, 
                                              type_event_culture, 
                                              date, 
                                              note, 
                                              machine, 
                                              bring_type, 
                                              quantity, 
                                              vegetable, 
                                              method, 
                                              nb_human, 
                                              nb_hours, 
                                              succes, 
                                              disease, 
                                              bug)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        eventCulture.props.id,
        eventCulture.props.plotId,
        eventCulture.props.typeEventCulture,
        eventCulture.props.date,
        eventCulture.props.note,
        eventCulture.props.machine,
        eventCulture.props.bringType,
        eventCulture.props.quantity,
        JSON.stringify(eventCulture.props.vegetable),
        eventCulture.props.method,
        eventCulture.props.nbHuman,
        eventCulture.props.nbHours,
        eventCulture.props.succes,
        eventCulture.props.disease,
        eventCulture.props.bug,
      ]
    );
    return eventCulture;
  }

  update(eventCulture: EventCulture): Promise<EventCulture> {
    throw new Error("Method not implemented.");
  }

  async getById(id: string): Promise<EventCulture> {
    const [results] = await this.connect.promise().query(
      `
            SELECT * 
            FROM event_culture AS e
            WHERE e.id = ?
        `,
      [id]
    );
    if (results) {
      return new EventCulture({
        id: results[0].id,
        date: results[0].date,
        note: results[0].note,
        plotId: results[0].plotId,
        bringType: results[0].bringType,
        bug: results[0].bug,
        disease: results[0].disease,
        machine: results[0].machine,
        method: results[0].method,
        nbHours: results[0].nbHours,
        nbHuman: results[0].nbHuman,
        quantity: results[0].quantity,
        succes: results[0].succes,
        typeEventCulture: results[0].typeEventCulture,
        vegetable: {
          vegetableName: results[0].vegetableName,
          familly: results[0].familly,
          variety: results[0].variety,
        },
      });
    } else {
      throw new EventCultureError.GetByIdFailed("EVENT_CULTURE_NOT_FOUND");
    }
  }

  async delete(id: string): Promise<boolean> {
    await this.connect
      .promise()
      .query<RowDataPacket[]>("DELETE FROM event_culture WHERE id = ?", [id]);
    return true;
  }

  async getEventCultureByPlotId(plotId: string): Promise<EventCulture[]> {
    const results = await this.connect.promise().query<RowDataPacket[]>(
      `
        SELECT * 
        FROM event_culture AS e
        WHERE e.plot_id = ?
        `,
      [plotId]
    );


    return results[0].map((eventCulture) => {
      return new EventCulture({
        id: eventCulture.id,
        date: eventCulture.date,
        note: eventCulture.note,
        plotId: eventCulture.plotId,
        bringType: eventCulture.bringType,
        bug: eventCulture.bug,
        disease: eventCulture.disease,
        machine: eventCulture.machine,
        method: eventCulture.method,
        nbHours: eventCulture.nbHours,
        nbHuman: eventCulture.nbHuman,
        quantity: eventCulture.quantity,
        succes: eventCulture.succes,
        typeEventCulture: eventCulture.typeEventCulture,
        vegetable: {
          vegetableName: eventCulture.vegetable.vegetableName,
          familly: eventCulture.vegetable.familly,
          variety: eventCulture.vegetable.variety,
        },
      });
    });
  }
}
