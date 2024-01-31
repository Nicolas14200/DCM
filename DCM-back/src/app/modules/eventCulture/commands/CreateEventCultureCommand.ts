import { IsString, IsNumber, ValidateNested, IsOptional } from "class-validator";
import { BringType } from "../../../../core/domain/valueObjects/BringType";
import { Machine } from "../../../../core/domain/valueObjects/Machine";
import { TypeEventCulture } from "../../../../core/domain/valueObjects/TypeEventCulture";
import { Vegetable } from "../../../../core/domain/valueObjects/Vegetable";

export class CreateEventCultureCommand {

    @IsString()
    note: string

    @IsString()
    plotId: string

    @IsString()
    @IsOptional()
    typeEventCulture: TypeEventCulture

    @IsString()
    @IsOptional()
    machine: Machine

    @IsString()
    @IsOptional()
    bringType: BringType

    @IsNumber()
    @IsOptional()
    quantity: number

    @ValidateNested()
    @IsOptional()
    vegetable: Vegetable

    @IsString()
    @IsOptional()
    method: string

    @IsNumber()
    @IsOptional()
    nbHuman: number

    @IsNumber()
    @IsOptional()
    nbHours: number

    @IsNumber()
    @IsOptional()
    succes: number

    @IsString()
    @IsOptional()
    disease: string

    @IsString()
    @IsOptional()
    bug:string
}