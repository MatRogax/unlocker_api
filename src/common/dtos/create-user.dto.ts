import { Transform } from "class-transformer";
import { IsDateString, IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";
import { Role } from '@prisma/client'; 


export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    googleId?: string;

    @IsString()
    steamId?: string;

   @IsNotEmpty()
   @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
   })
    password: string;

    @Transform(({ value }) => value?.toUpperCase())
    @IsEnum(Role)
    role: Role;

    @IsDateString()
    createdAt: Date

    @IsDateString()
    updatedAt: Date
}