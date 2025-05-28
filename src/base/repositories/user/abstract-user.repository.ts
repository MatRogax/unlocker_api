import { AuthResponseModel } from "@common/models/auth-response.model";
import { CreateUserDto } from "@dtos/create-user.dto";
import { LoginDto } from "@dtos/login-dto";
import { UpdateUserDto } from "@dtos/update-user.dto";
import { User } from "@prisma/client";

export abstract class AbstractUserRepository {
    abstract create(data: CreateUserDto): Promise<User>;
    abstract login(login:LoginDto,device:string): Promise<AuthResponseModel>;
    abstract findOne(id:string): Promise<User>;
    abstract findAll(limit?: number): Promise<User[]>;
    abstract update(id: string, data: UpdateUserDto): Promise<any>;
    abstract delete(id: string): Promise<User>;
}