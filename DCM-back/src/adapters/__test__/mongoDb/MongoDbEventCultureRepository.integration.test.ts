import mongoose from "mongoose";
import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { MongoDbEventCultureRepository } from "../../repositories/mongoDb/MongoDbEventCultureRepository";
import { v4 } from "uuid";
import { Machine } from "../../../core/domain/valueObjects/Machine";
import { TypeEventCulture } from "../../../core/domain/valueObjects/TypeEventCulture";
import { BringType } from "../../../core/domain/valueObjects/BringType";

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
        })

        eventCulture1 = EventCulture.create({
            note:"Note1",
            plotId: eventCulture.props.plotId
        })

        eventCulture2 = EventCulture.create({
            note:"Note2",
            plotId: eventCulture.props.plotId
        })
   
        eventCulture3 = EventCulture.create({
            note:"Note3",
            plotId: eventCulture.props.plotId
        })
        await eventCultureRepo.save(eventCulture);
    })
    it("Should SAVE AND GETBYID a plot in mongodb repository", async () => {
        const eventCultureExist: EventCulture = await eventCultureRepo.getById(eventCulture.props.id)
        expect(eventCultureExist.props.note).toEqual("Note")
    })

    it("Should return an array of event culture", async () => {
        await eventCultureRepo.save(eventCulture1);
        await eventCultureRepo.save(eventCulture2);
        await eventCultureRepo.save(eventCulture3);
        const eventsCultures = await eventCultureRepo.getEventCultureByPlotId(eventCulture.props.plotId);
        expect(eventsCultures[0].props.note).toEqual("Note")
    })

    it("Should create a event culture of Ground work", async () => {
        const eventCulturGroundWork = EventCulture.create({
            note: "Ground work",
            plotId: eventCulture.props.plotId,
            machine: Machine.TRACTEUR,
            typeEventCulture: TypeEventCulture.groundWork,
        })
        await eventCultureRepo.save(eventCulturGroundWork);
        expect(eventCulturGroundWork.props.typeEventCulture).toEqual("groundWork");
    })

    it("Should create a event culture of Bring", async () => {
        const eventCulturBring = EventCulture.create({
            note: "bring",
            plotId: eventCulture.props.plotId,
            machine: Machine.TRACTEUR,
            typeEventCulture: TypeEventCulture.bring,
            bringType: BringType.compost,
        })
        await eventCultureRepo.save(eventCulturBring);
        expect(eventCulturBring.props.typeEventCulture).toEqual("bring");
        expect(eventCulturBring.props.bringType).toEqual("compost");
    })
    it("Should create a event culture of Implataion", async () => {
        const eventCulturImplataion = EventCulture.create({
            note: "Implantation",
            plotId: eventCulture.props.plotId,
            machine: Machine.TRACTEUR,
            typeEventCulture: TypeEventCulture.Implantation,
            vegetable: {
                vegetableName: "carrotte",
                variety: "potagères",
                familly: "Apiacées"
            }
        })
        await eventCultureRepo.save(eventCulturImplataion);
        expect(eventCulturImplataion.props.typeEventCulture).toEqual("Implantation");
    })

    it("Should delete a eventCulture", async () => {
        await eventCultureRepo.delete(eventCulture1.props.id);
        const eventCulture1Exist = eventCultureRepo.getById(eventCulture1.props.id);
        expect(eventCulture1Exist).rejects.toThrow("EVENT_CULTURE_NOT_FOUND");
    })

})