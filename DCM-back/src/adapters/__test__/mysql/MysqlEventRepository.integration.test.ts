import "reflect-metadata";
import { MysqlEventCultureRepository } from "../../repositories/mysql/MysqlEventCultureRepository";
import { connect } from "./connectDb";
import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { v4 } from "uuid";
import { Connection } from "mysql2";

describe("Integration - MysqlEventRepository", () => {
  let eventCultureReo: MysqlEventCultureRepository;
  let eventCulture: EventCulture;
  let connection: Connection;
  
  beforeAll(async () => {
    connection = await connect;
    eventCultureReo = new MysqlEventCultureRepository(connection);
    eventCulture = EventCulture.create({
      note: "Note",
      plotId: v4(),
    });
  });

  afterAll(async () => {
    connection.end();
  });
  
  it("Should save an event culture", async () => {
    const result = await eventCultureReo.save(eventCulture);
    expect(result.props.note).toEqual("Note");
  });
});
