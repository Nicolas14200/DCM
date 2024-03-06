import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { TypeEventCulture } from "../../../../core/domain/valueObjects/TypeEventCulture";
import { Machine } from "../../../../core/domain/valueObjects/Machine";
import { BringType } from "../../../../core/domain/valueObjects/BringType";

class Vegetable {
  @IsString()
  vegetableName: string;

  @IsString()
  variety: string;

  @IsString()
  familly: string;
}

export class UpdateEventCultureCommand {
  @IsString()
  id: string;

  @IsString()
  note: string;

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
