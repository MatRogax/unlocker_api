import { ResponseAuthModel } from "@common/models/response-auth.model";
import { CreateUserDto } from "@dtos/create-user.dto";
import { UpdateUserDto } from "@dtos/update-user.dto";
import { User } from "@prisma/client";

export abstract class AbstractUserRepository {
    abstract create(data: CreateUserDto): Promise<User>;
    abstract login(email: string, password: string): Promise<ResponseAuthModel>;
    abstract findOne(id:string): Promise<User>;
    abstract findAll(limit?: number): Promise<User[]>;
    abstract update(id: string, data: UpdateUserDto): Promise<any>;
    abstract delete(id: string): Promise<User>;
}