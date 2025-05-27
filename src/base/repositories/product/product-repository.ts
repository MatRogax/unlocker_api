import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { AbstractProductRepository } from "./abstract-product.repository";
import { Product } from "@prisma/client";
import { PrismaService } from "@database/prisma.service";
import { CreateProductDto } from "@dtos/create-product.dto";
import { UpdateProductDto } from "@dtos/update-product.dto";

@Injectable()
export class ProductRepository implements AbstractProductRepository {

    constructor(private readonly prisma: PrismaService) { }
    async create(productData: CreateProductDto, urls: Array<string>): Promise<Product> {
        try {
            const product = await this.prisma.product.create({
                data: {
                    ...productData,
                    images: {
                        create: urls.map(url => ({ url }))
                    }
                }
            })
            return product
        } catch (error) {
            throw new BadRequestException();
        }
    }
    async findOne(id: number): Promise<Product> {
        try {
            const product = await this.prisma.product.findUnique({
                where: {
                    id
                },
            })
            return product;
        } catch (error) {
            throw new NotFoundException();
        }
    }
    findAll(limit?: number): Promise<Product[]> {
        try {
            const products = this.prisma.product.findMany({
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return products;
        } catch (error) {
            throw new NotFoundException();
        }
    }

    async update(id: number, productData: UpdateProductDto, urls: Array<string>): Promise<Product> {
        try {
            const product = await this.prisma.product.update({
                where: {
                    id
                },
                data: {
                    ...productData,
                    images: {
                        create: urls?.map(url => ({ url }))
                    }
                }
            })
            return product;
        } catch (error) {
            throw new NotFoundException();
        }
    }
    delete(id: number): Promise<Product> {
        try {
            const product = this.prisma.product.delete({
                where: {
                    id
                }
            })
            return product;
        } catch (error) {
            throw new NotFoundException();
        }
    }

}