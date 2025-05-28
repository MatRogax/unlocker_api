import { DatabaseModule } from "@modules/database.module";
import { Module } from "@nestjs/common";
import { AbstractAuthrepository } from "@repositories/auth/abstrac-auth.repository";
import { AuthRepository } from "@repositories/auth/auth.repository";
import { AuthService } from "@services/auth.service";

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [AuthService, { provide: AbstractAuthrepository, useClass: AuthRepository }],
    exports: [AuthService, AbstractAuthrepository]
})
export class AuthModule { }