import { Role } from '@prisma/client';
import { Transform } from "class-transformer";
import { IsEnum, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";


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
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
        minLowercase: 0,
    })
    password: string;

    @Transform(({ value }) => value?.toUpperCase())
    @IsEnum(Role)
    role: Role;
}