import { CreateUserDto } from "@dtos/create-user.dto";
import { LoginDto } from "@dtos/login-dto";
import { Body, Controller, Delete, Get, Headers, Param, ParseIntPipe, Post, Put, UsePipes } from "@nestjs/common";
import { PasswordHasherPipe } from "@pipes/password.pipe";
import { User } from "@prisma/client";
import { AbstractUserRepository } from "@repositories/user/abstract-user.repository";

@Controller('user')
export class UserController {
    constructor(private readonly repository: AbstractUserRepository) { }
    @Post('create')
    @UsePipes(new PasswordHasherPipe<User>())
    async create(@Body() data: CreateUserDto): Promise<User> {
        const response = await this.repository.create(data);
        return response;
    }
    @Get(':id')
    @UsePipes(new PasswordHasherPipe<User>())
    async findUser(@Param('id') id: string): Promise<User> {
        const response = await this.repository.findOne(id);
        return response
    }

    @Put('update/:id')
    @UsePipes(new PasswordHasherPipe<User>())
    async updateUser(@Param('id') id: string, @Body() data: CreateUserDto): Promise<User> {
        const response = await this.repository.update(id, data);
        return response
    }

    @Get('registered-users/:limit')
    @UsePipes(new PasswordHasherPipe<User>())
    async findAllWithRouteParam(
        @Param('limit', ParseIntPipe) limit: number,
    ): Promise<User[]> {
        const response = await this.repository.findAll(limit);
        return response;
    }

    @Delete('delete/:id')
    @UsePipes(new PasswordHasherPipe<User>())
    async deleteUser(@Param('id') id: string): Promise<User> {
        const response = await this.repository.delete(id);
        return response
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Headers('ip') device?: string) {
        const logIn = await this.repository.login(
            loginDto,
            device
        );

        return logIn;
    }
}