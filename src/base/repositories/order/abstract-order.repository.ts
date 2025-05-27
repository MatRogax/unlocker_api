import { CreateOrderDto } from "@dtos/create-order.dto";
import { UpdateOrderDto } from "@dtos/update-order.dto";
import { Order } from "@prisma/client";

export abstract class AbstractOrderRepository {
    abstract create(data: CreateOrderDto, userId: string): Promise<Order>;
    abstract findOne(id: string): Promise<Order>;
    abstract findAll(limit?: number): Promise<Order[]>;
    abstract update(id: string, orderData: UpdateOrderDto): Promise<Order>;
    abstract delete(id: string): Promise<Order>;
}   