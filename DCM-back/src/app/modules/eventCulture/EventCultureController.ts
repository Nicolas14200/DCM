import { injectable } from "inversify";
import {
  Body,
  Delete,
  JsonController,
  Post,
  Put,
  Res,
} from "routing-controllers";
import { EventCultureApiResponseMapper } from "./dto/EventCultureApiResponseMapper";
import {
  CreateEventCultureCommand,
  EventCultureCommandResponse,
} from "./commands/CreateEventCultureCommand";
import { CreateEventCulture } from "../../../core/usecase/eventCulture/CreateEventCulture";
import { Response } from "express";
import { GetEventsCulturesByPlotIdCommand } from "./commands/GetEventsCulturesByPlotIdCommand";
import { GetEventsCulturesByPlotId } from "../../../core/usecase/eventCulture/GetEventsCulturesByPlotId";
import { GetEventsCulturesByIdCommand } from "./commands/GetEventsCulturesByIdCommand";
import { GetEventCultureById } from "../../../core/usecase/eventCulture/GetEventCultureById";
import { DeleteEventCulture } from "../../../core/usecase/eventCulture/DeleteEventCulture";
import { DeleteEventsCulturesByIdCommand } from "./commands/DeleteEventsCulturesByIdCommand";
import { UpdateEventCulture } from "../../../core/usecase/eventCulture/UpdateEventCulture";
import { UpdateEventCultureCommand } from "./commands/UpdateEventCultureCommand";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";

@JsonController("/event")
@injectable()
export class EventCultureController {
  private eventCultureApiResponseMapper: EventCultureApiResponseMapper =
    new EventCultureApiResponseMapper();

  constructor(
    private readonly _createEventCulture: CreateEventCulture,
    private readonly _getEventCultureById: GetEventCultureById,
    private readonly _getEventsCulturesByPlotId: GetEventsCulturesByPlotId,
    private readonly _deleteEventCulture: DeleteEventCulture,
    private readonly _updateEventCulture: UpdateEventCulture
  ) {}

  @Post("/create")
  @ResponseSchema(EventCultureCommandResponse)
  async createEventCulture(
    @Res() response: Response,
    @Body() cmd: CreateEventCultureCommand
  ) {
    try {
      const eventCulture = await this._createEventCulture.execute({
        note: cmd.note,
        plotId: cmd.plotId,
        typeEventCulture: cmd.typeEventCulture,
        machine: cmd.machine,
        bringType: cmd.bringType,
        quantity: cmd.quantity,
        vegetable: cmd.vegetable,
        method: cmd.method,
        nbHuman: cmd.nbHuman,
        nbHours: cmd.nbHours,
        succes: cmd.succes,
        disease: cmd.disease,
        bug: cmd.bug,
      });
      return response.status(201).send({
        ...this.eventCultureApiResponseMapper.fromDomain(eventCulture),
      });
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }

  @Post("/getbyid")
  @ResponseSchema(EventCultureCommandResponse)
  async getEventsCulturesById(
    @Res() response: Response,
    @Body() cmd: GetEventsCulturesByIdCommand
  ) {
    try {
      const eventCulture = await this._getEventCultureById.execute(cmd.id);
      return response.status(200).send({
        ...this.eventCultureApiResponseMapper.fromDomain(eventCulture),
      });
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }

  @Post("/getbyplotid")
  @ResponseSchema(EventCultureCommandResponse)
  async getEventsCulturesByPlotId(
    @Res() response: Response,
    @Body() cmd: GetEventsCulturesByPlotIdCommand
  ) {
    try {
      const eventCultureArray = await this._getEventsCulturesByPlotId.execute(
        cmd.plotId
      );
      const eventCultureResponse = eventCultureArray.map((eventCulture) =>
        this.eventCultureApiResponseMapper.fromDomain(eventCulture)
      );
      return response.status(200).send({
        eventCultureResponse,
      });
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }

  @Post("/delete")
  async deleteEventCultureById(
    @Res() response: Response,
    @Body() cmd: DeleteEventsCulturesByIdCommand
  ) {
    try {
      await this._deleteEventCulture.execute({
        id: cmd.id,
        plotId: cmd.plotId,
      });
      return response.sendStatus(200);
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }

  @Put("/update")
  @ResponseSchema(EventCultureCommandResponse)
  async updateEventCulture(
    @Res() response: Response,
    @Body() cmd: UpdateEventCultureCommand
  ) {
    try {
      const newEventCulture = await this._updateEventCulture.execute({
        id: cmd.id,
        note: cmd.note,
        typeEventCulture: cmd.typeEventCulture,
        machine: cmd.machine,
        bringType: cmd.bringType,
        quantity: cmd.quantity,
        vegetable: cmd.vegetable,
        method: cmd.method,
        nbHuman: cmd.nbHuman,
        nbHours: cmd.nbHours,
        succes: cmd.succes,
        disease: cmd.disease,
        bug: cmd.bug,
      });
      return response.status(200).send({
        ...this.eventCultureApiResponseMapper.fromDomain(newEventCulture),
      });
    } catch (e) {
      return response.status(400).send({
        message: e.message,
      });
    }
  }
}
