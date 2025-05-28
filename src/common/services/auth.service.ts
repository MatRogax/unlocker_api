import { AuthCreateModel } from "@common/models/auth-create.mode";
import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor() { }

    async generateToken(user: User): Promise<AuthCreateModel> {
        if (!user) {
            throw new Error('User is required');
        }

        const token = uuidv4();
        const expiresInHours = 24 * 7;
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + expiresInHours);

        const authToken: AuthCreateModel = {
            token,
            userId: user.id,
            expiresAt: expiresAt,
        };

        return authToken;
    }
}