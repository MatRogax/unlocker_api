import { CreateUserDto } from "@dtos/create-user.dto";
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { User } from "@prisma/client";
import { AbstractUserRepository } from "@repositories/user/abstract-user.repository";

@Controller('user')
export class UserController {
    constructor(private readonly repository: AbstractUserRepository) { }
    @Post('create')
    async create(@Body() data: CreateUserDto): Promise<User> {
        const response = await this.repository.findOne(data.email);
        return response
    }
    @Get(':id')
    async findUser(@Param('id') id: string): Promise<User> {
        const response = await this.repository.findOne(id);
        return response
    }

    @Put('update/:id')
    async updateUser(@Param('id') id: string, @Body() data: CreateUserDto): Promise<User> {
        const response = await this.repository.update(id, data);
        return response
    }

    @Get('path')
    async findAll(@Param('limit') limit?: number): Promise<User[]> {
        const response = await this.repository.findAll(limit);
        return response
    }

    @Delete('delete/:id')
    async deleteUser(@Param('id') id: string): Promise<User> {
        const response = await this.repository.findOne(id);
        return response
    }
}