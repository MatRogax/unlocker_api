import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderDto } from "@dtos/create-order.dto";

export class UpdateOrderDto extends PartialType(CreateOrderDto) { }