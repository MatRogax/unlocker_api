import { CreateProductDto } from "@dtos/create-product.dto";
import { UpdateProductDto } from "@dtos/update-product.dto";
import { Product } from "@prisma/client";

export abstract class AbstractProductRepository {
    abstract create(data: CreateProductDto, urls: string[]): Promise<Product>;
    abstract findOne(id: number): Promise<Product>;
    abstract findAll(limit?: number): Promise<Product[]>;
    abstract update(id: number, productData: UpdateProductDto, urls: Array<string>): Promise<Product>;
    abstract delete(id: number): Promise<Product>;
}