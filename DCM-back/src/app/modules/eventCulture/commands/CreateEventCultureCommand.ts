import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  ValidateNested,
} from "class-validator";
import { BringType } from "../../../../core/domain/valueObjects/BringType";
import { Machine } from "../../../../core/domain/valueObjects/Machine";
import { TypeEventCulture } from "../../../../core/domain/valueObjects/TypeEventCulture";


class Vegetable {

  @IsString()
  vegetableName: string;

  @IsString()
  variety: string;

  @IsString()
  familly: string;
}

export class CreateEventCultureCommand {
  @IsString()
  note: string;

  @IsString()
  plotId: string;

  @IsEnum(TypeEventCulture)
  @IsOptional()
  typeEventCulture: TypeEventCulture;

  @IsEnum(Machine)
  @IsOptional()
  machine: Machine;

  @IsEnum(BringType)
  @IsOptional()
  bringType: BringType;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @ValidateNested()
  @IsOptional()
  vegetable: Vegetable;

  @IsString()
  @IsOptional()
  method: string;

  @IsNumber()
  @IsOptional()
  nbHuman: number;

  @IsNumber()
  @IsOptional()
  nbHours: number;

  @IsNumber()
  @IsOptional()
  succes: number;

  @IsString()
  @IsOptional()
  disease: string;

  @IsString()
  @IsOptional()
  bug: string;
}

export class EventCultureCommandResponse extends CreateEventCultureCommand{
  @IsString()
  id: string;
}