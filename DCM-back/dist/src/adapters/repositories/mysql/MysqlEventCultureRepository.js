"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlEventCultureRepository = void 0;
const inversify_1 = require("inversify");
const EventCulture_1 = require("../../../core/domain/entities/eventCulture/EventCulture");
const mysql2_1 = __importDefault(require("mysql2"));
const EventCultureError_1 = require("../../../core/domain/models/errors/EventCultureError");
let MysqlEventCultureRepository = class MysqlEventCultureRepository {
    connect;
    constructor(connect) {
        this.connect = connect;
        this.connect = connect;
    }
    async save(eventCulture) {
        console.log("eventCulture", eventCulture);
        try {
            const [results] = await this.connect.promise().query(`
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
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [eventCulture.props.id,
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
                eventCulture.props.bug]);
            return eventCulture;
        }
        catch (e) {
            console.log("e", e);
            throw new EventCultureError_1.EventCultureError.CreateeventCultureFailed("CREATE_EVENT_FAILED");
        }
    }
    async getById(id) {
        const [results] = await this.connect.promise().query(`
            SELECT * 
            FROM event_culture AS e
            WHERE e.id = ?
        `, [id]);
        if (results) {
            return new EventCulture_1.EventCulture({
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
                }
            });
        }
        else {
            throw new EventCultureError_1.EventCultureError.GetByIdFailed("EVENT_CULTURE_NOT_FOUND");
        }
    }
    async delete(id) {
        await this.connect.promise().query('DELETE FROM event_culture WHERE id = ?', [id]);
    }
    async getEventCultureByPlotId(plotId) {
        const results = await this.connect.promise().query(`
        SELECT * 
        FROM event_culture AS e
        WHERE e.plot_id = ?
        `, [plotId]);
        console.log("results", results);
        return results[0].map((eventCulture) => {
            return new EventCulture_1.EventCulture({
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
                }
            });
        });
    }
};
MysqlEventCultureRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [Object])
], MysqlEventCultureRepository);
exports.MysqlEventCultureRepository = MysqlEventCultureRepository;
