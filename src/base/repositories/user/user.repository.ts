import { AuthCreateModel } from "@common/models/auth-create.mode";
import { AuthResponseModel } from "@common/models/auth-response.model";
import { Utils } from "@common/utils/utils";
import { PrismaService } from "@database/prisma.service";
import { CreateUserDto } from "@dtos/create-user.dto";
import { LoginDto } from "@dtos/login-dto";
import { UpdateUserDto } from "@dtos/update-user.dto";
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { User } from "@prisma/client";
import { AbstractAuthrepository } from "@repositories/auth/abstrac-auth.repository";
import { AbstractUserRepository } from "@repositories/user/abstract-user.repository";
import { AuthService } from "@services/auth.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository implements AbstractUserRepository {
    constructor(private readonly prisma: PrismaService, private readonly auth: AbstractAuthrepository, private readonly authService: AuthService,) { }
    async create(dataCreateUser: CreateUserDto): Promise<User> {
        try {
            const createUser = await this.prisma.user.create({
                data: {
                    ...dataCreateUser,
                    createdAt: Utils.getCurrentDateTime(),
                    updatedAt: Utils.getCurrentDateTime(),
                },
            })
            return createUser;
        } catch (err) {
            throw new InternalServerErrorException('Ocorreu um Erro ao criar usuário.');
        }
    }

    async login(login: LoginDto, device: string): Promise<AuthResponseModel> {

        const user = await this.findByEmail(login.email);
        const token = await this.authService.generateToken(user);

        const isPasswordMatching = await bcrypt.compare(login.password, user.password);

        if (!user || !isPasswordMatching) {
            throw new NotFoundException('usuario e/ou senha incorreto Invalido(OS)');
        }

        const authData: AuthCreateModel = {
            token: token.token,
            userId: user.id,
            expiresAt: token.expiresAt,
        }

        await this.auth.authUser(authData, device);

        const response: AuthResponseModel = {
            token: token.token,
            expiresAt: token.expiresAt,
            userId: user.id,
            username: user.name,
        }

        return response;


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

    async findByEmail(email: string): Promise<User> {

        const findUser = await this.prisma.user.findUnique({
            where: {
                email
            }
        })
        return findUser;

    }

    async findAll(limit: number = 10): Promise<User[]> {
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