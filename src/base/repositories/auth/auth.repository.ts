import { AuthCreateModel } from "@common/models/auth-create.mode";
import { PrismaService } from "@database/prisma.service";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { AbstractAuthrepository } from "@repositories/auth/abstrac-auth.repository";

@Injectable()
export class AuthRepository implements AbstractAuthrepository {
    constructor(private prisma: PrismaService) { }
    async authUser(authData: AuthCreateModel, device: string): Promise<AuthCreateModel> {
        console.log(device);
        const authenticate = await this.prisma.auth.create({
            data: {
                ...authData,
                device: device
            }
        })
        const responseAuth: AuthCreateModel = {
            userId: authenticate.userId,
            expiresAt: authenticate.expiresAt,
            token: authenticate.token,
        }
        return responseAuth;
    }
    async FindByToken(token: string): Promise<User> {
        const userAutenticated = await this.prisma.auth.findUnique({
            where: {
                token: token,
                expiresAt: {
                    gte: new Date()
                }
            },
        });

        const user = await this.prisma.user.findUnique({
            where: {
                id: userAutenticated.userId
            }
        })

        if (!userAutenticated) {
            throw new Error("User not authenticated or token has expired");
        }
        return user;
    }
}