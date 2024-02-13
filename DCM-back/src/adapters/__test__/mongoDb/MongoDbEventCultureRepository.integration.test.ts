import mongoose from "mongoose";
import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { MongoDbEventCultureRepository } from "../../repositories/mongoDb/MongoDbEventCultureRepository";
import { v4 } from "uuid";

describe("Integration - MongoDbEventCultureRepository", () => {
    let eventCultureRepo : MongoDbEventCultureRepository;
    let eventCulture : EventCulture;
    let eventCulture1 : EventCulture;
    let eventCulture2 : EventCulture;
    let eventCulture3 : EventCulture;

    beforeAll(async () => {
        eventCultureRepo = new MongoDbEventCultureRepository()
        await mongoose.connect(`mongodb://127.0.0.1:27017/DCM`);
        eventCulture = EventCulture.create({
            note:"Note",
            plotId: v4()
        });

        eventCulture1 = EventCulture.create({
            note:"Note1",
            plotId: eventCulture.props.plotId
        });

        eventCulture2 = EventCulture.create({
            note:"Note2",
            plotId: eventCulture.props.plotId
        });
   
        eventCulture3 = EventCulture.create({
            note:"Note3",
            plotId: eventCulture.props.plotId
        });
    })

    it("Should SAVE a plot ", async () => {
        const eventCultureExist =  await eventCultureRepo.save(eventCulture);
        expect(eventCultureExist.props.note).toEqual("Note");
    })

    it("Should update a plot ", async () => {
        const eventCultureExist =  await eventCultureRepo.update(eventCulture);
        expect(eventCultureExist.props.note).toEqual("Note");
    })

    it("Should return an array of event culture", async () => {
        await eventCultureRepo.save(eventCulture1);
        await eventCultureRepo.save(eventCulture2);
        await eventCultureRepo.save(eventCulture3);
        const eventsCultures = await eventCultureRepo.getEventCultureByPlotId(eventCulture.props.plotId);
        expect(eventsCultures[1].props.note).toEqual("Note1");
        expect(eventsCultures[2].props.note).toEqual("Note2");
        expect(eventsCultures[3].props.note).toEqual("Note3");
    })

    it("Should delete a eventCulture", async () => {
       const result = await eventCultureRepo.delete(eventCulture1.props.id);
        expect(result).toEqual(true);
    })

    it("Should get by id plot ", async () => {
        const result =  await eventCultureRepo.getById(eventCulture.props.id);
        expect(result.props.note).toEqual("Note");
    })

})