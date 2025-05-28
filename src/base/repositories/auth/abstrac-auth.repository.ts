import { AuthCreateModel } from "@common/models/auth-create.mode";
import { User } from "@prisma/client";

export abstract class AbstractAuthrepository {
    abstract authUser(authData: AuthCreateModel, device: string): Promise<AuthCreateModel>;
    abstract FindByToken(token: string): Promise<User | null>
}