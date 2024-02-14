import "reflect-metadata";
import { MysqlEventCultureRepository } from "../../repositories/mysql/MysqlEventCultureRepository";
import { connect } from "./connectDb";
import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { v4 } from "uuid";

describe('Integration - MysqlEventRepository', () => {
    let eventCultureReo: MysqlEventCultureRepository;
    let eventCulture : EventCulture;

    beforeAll(async ()=> {
        eventCultureReo = new MysqlEventCultureRepository(await connect);
        eventCulture = EventCulture.create({
            note:"Note",
            plotId: v4()
        });
    });

    it("Should save an event culture", async () => {
        const result = await  eventCultureReo.save(eventCulture);
        expect(result.props.note).toEqual("Note");
    });
})