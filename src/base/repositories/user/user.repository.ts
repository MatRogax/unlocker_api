import { ResponseAuthModel } from "@common/models/response-auth.model";
import { PrismaService } from "@database/prisma.service";
import { CreateUserDto } from "@dtos/create-user.dto";
import { UpdateUserDto } from "@dtos/update-user.dto";
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";
import { AbstractUserRepository } from "@repositories/user/abstract-user.repository";

@Injectable()
export class UserRepository implements AbstractUserRepository {
    constructor(private readonly prisma: PrismaService) { }
    async create(dataCreateUser: CreateUserDto): Promise<User> {
        try {
            const createUser = this.prisma.user.create({
                data: dataCreateUser
            })
            return createUser;
        } catch (err) {
            throw new InternalServerErrorException('Ocorreu um Erro ao criar usuário.');
        }
    }
    //TODO -> utilizar o passport para authenticação de usuários 
    async login(email: string, password: string): Promise<ResponseAuthModel> {
        throw new Error("Method not implemented.");
    }
    async findOne(id: string): Promise<User> {
        try {
            const findUser = await this.prisma.user.findUnique({
                where: {
                    id
                }
            })
            return findUser;
        } catch (error) {
            throw new NotFoundException('Usuário nao encontrado.');
        }
    }

    async findAll(limit = 10): Promise<User[]> {
        try {
            const users = await this.prisma.user.findMany({
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            })
            return users;
        } catch (error) {
            throw new InternalServerErrorException('Ocorreu uma falha ao buscar os usuários.');
        }
    }
    async update(id: string, data: UpdateUserDto): Promise<any> {
        try {
            const updateUser = await this.prisma.user.update({
                where: {
                    id
                },
                data
            })
            return updateUser;
        } catch (error) {
            throw new BadRequestException('Nao foi possivel atualizar o usuário: ' + error);
        }
    }
    async delete(id: string): Promise<User> {
        try {
            const deleteUser = await this.prisma.user.delete({
                where: {
                    id
                }
            })
            return deleteUser;
        } catch (error) {
            throw new BadRequestException('Nao foi possivel deletar o usuário: ' + error);
        }
    }

}