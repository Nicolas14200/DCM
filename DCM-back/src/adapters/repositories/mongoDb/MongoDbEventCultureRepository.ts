import 'reflect-metadata';
import { EventCultureRepository } from "../../../core/domain/repositories/EventCultureRepository";
import { MongoDbEventCultureMapper, MongoDbEventCultureMapperProps } from "./mappers/MongoDbEventCultureMapper";
import { eventCultureModel } from "./models/EventCultureModel";
import { EventCulture } from "../../../core/domain/entities/eventCulture/EventCulture";
import { injectable } from "inversify";

@injectable()
export class MongoDbEventCultureRepository implements EventCultureRepository {

    private mongoDbEventCultureMapper: MongoDbEventCultureMapper = new MongoDbEventCultureMapper()
    
    async delete(id: string): Promise<boolean> {
        await eventCultureModel.findOneAndDelete({id});
        return true;
    }

    async getEventCultureByPlotId(plotId: string): Promise<EventCulture[]> {
        const results: MongoDbEventCultureMapperProps[] = await eventCultureModel.find({
            plotId: plotId
        });
        const eventCultureArray: EventCulture[] = results.map((result) =>
            this.mongoDbEventCultureMapper.toDomain(result)
        );
        return eventCultureArray;
    }

    async save(eventCulture: EventCulture): Promise<EventCulture> {
        await eventCultureModel.findOneAndUpdate(
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
    
    async getById(id: string): Promise<EventCulture> {
        const result: MongoDbEventCultureMapperProps = await eventCultureModel.findOne({
            id: id
        });
        if (result){
            return this.mongoDbEventCultureMapper.toDomain(result);
        }
        return null
    }

    update(eventCulture: EventCulture): Promise<EventCulture> {
        return null
    }
}