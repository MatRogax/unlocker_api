import { ProductImage } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import {
    IsString,
    IsNotEmpty,
    IsPositive,
    IsOptional,
    Min,
    IsArray,
    IsUrl,
    MaxLength,
    MinLength,
    IsDecimal,
} from 'class-validator';

export class CreateProductDto {
    @IsString({ message: 'O nome deve ser uma string.' })
    @IsNotEmpty({ message: 'O nome não pode estar vazio.' })
    name: string;

    @IsString({ message: 'A categoria deve ser uma string.' })
    @IsOptional()
    category?: string;

    @IsString({ message: 'A descrição deve ser uma string.' })
    @IsNotEmpty({ message: 'A descrição não pode estar vazia.' })
    description: string;

    @IsDecimal()
    @IsPositive({ message: 'O preço deve ser um número positivo.' })
    price: number;

    @IsOptional()
    @IsDecimal()
    @Min(0, { message: 'O desconto não pode ser negativo.' })
    discount?: number;

    @IsOptional()
    @IsArray({ message: 'O campo de imagens deve ser um array.' })
    @IsString({ each: true, message: 'Cada imagem deve ser uma string (URL).' })
    @IsUrl({}, { each: true, message: 'Cada imagem deve ser uma URL válida.' })
    images: ProductImage[];
}