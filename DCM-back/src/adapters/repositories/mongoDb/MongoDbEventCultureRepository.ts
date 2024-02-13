import 'reflect-metadata';
import { EventCultureRepository } from "../../../core/domain/repositories/EventCultureRepository";
import { MongoDbEventCultureMapper, MongoDbEventCultureMapperProps } from "./mappers/MongoDbEventCultureMapper";
import { EventCultureModel } from "./models/EventCultureModel";
import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { injectable } from "inversify";
import { Machine } from '../../../core/domain/valueObjects/Machine';
import { TypeEventCulture } from '../../../core/domain/valueObjects/TypeEventCulture';
import { BringType } from '../../../core/domain/valueObjects/BringType';
import { Vegetable } from '../../../core/domain/valueObjects/Vegetable';

@injectable()
export class MongoDbEventCultureRepository implements EventCultureRepository {

    private mongoDbEventCultureMapper: MongoDbEventCultureMapper = new MongoDbEventCultureMapper()
    
    async delete(id: string): Promise<boolean> {
        await EventCultureModel.findOneAndDelete({id});
        return true;
    }

    async getEventCultureByPlotId(plotId: string): Promise<EventCulture[]> {
        const results: MongoDbEventCultureMapperProps[] = await EventCultureModel.find({
            plotId: plotId
        });
        const eventCultureArray: EventCulture[] = results.map((result) =>
            this.mongoDbEventCultureMapper.toDomain(result)
        );
        return eventCultureArray;
    }

    async save(eventCulture: EventCulture): Promise<EventCulture> {
        const eventCultureModel = new EventCultureModel({
            id: eventCulture.props.id,
            date: eventCulture.props.date,
            note: eventCulture.props.note,
            plotId: eventCulture.props.plotId,
            machine: eventCulture.props.machine,
            typeEventCulture: eventCulture.props.typeEventCulture,
            bringType: eventCulture.props.bringType,
            quantity: eventCulture.props.quantity,
            vegetable: eventCulture.props.vegetable,
            method: eventCulture.props.method,
            nbHuman: eventCulture.props.nbHuman,
            nbHours: eventCulture.props.nbHours,
            succes: eventCulture.props.succes,
            disease: eventCulture.props.disease,
            bug: eventCulture.props.bug,
        });
        await eventCultureModel.save();
        return new EventCulture({
            id: eventCultureModel.id,
            date: eventCultureModel.date,
            note: eventCultureModel.note,
            plotId: eventCultureModel.plotId,
            machine: eventCultureModel.machine as Machine,
            typeEventCulture: eventCultureModel.typeEventCulture as TypeEventCulture,
            bringType: eventCultureModel.bringType as BringType,
            quantity: eventCultureModel.quantity,
            vegetable: eventCultureModel.vegetable as Vegetable,
            method: eventCultureModel.method,
            nbHuman: eventCultureModel.nbHuman,
            nbHours: eventCultureModel.nbHours,
            succes: eventCultureModel.succes,
            disease: eventCultureModel.disease,
            bug: eventCultureModel.bug,
        })
    }
    
    async getById(id: string): Promise<EventCulture> {
        const result: MongoDbEventCultureMapperProps = await EventCultureModel.findOne({
            id: id
        });
        if (result){
            return this.mongoDbEventCultureMapper.toDomain(result);
        }
        return null
    }

    async update(eventCulture: EventCulture): Promise<EventCulture> {
        await EventCultureModel.findOneAndUpdate(
            {
                id: eventCulture.props.id
            },
            {
                $set: {
                    id: eventCulture.props.id,
                    date: eventCulture.props.date,
                    note: eventCulture.props.note,
                    plotId: eventCulture.props.plotId,
                    machine: eventCulture.props.machine,
                    typeEventCulture: eventCulture.props.typeEventCulture,
                    bringType: eventCulture.props.bringType,
                    quantity: eventCulture.props.quantity,
                    vegetable: eventCulture.props.vegetable,
                    method: eventCulture.props.method,
                    nbHuman: eventCulture.props.nbHuman,
                    nbHours: eventCulture.props.nbHours,
                    succes: eventCulture.props.succes,
                    disease: eventCulture.props.disease,
                    bug: eventCulture.props.bug,
                }
            },
            {
                upsert: true,
            }
        )
        return eventCulture;
    }
}