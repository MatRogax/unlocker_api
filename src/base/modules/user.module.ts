import { UserController } from '@controllers/user.controller';
import { Module } from '@nestjs/common';
import { AbstractUserRepository } from '@repositories/user/abstract-user.repository';
import { UserRepository } from '@repositories/user/user.repository';
import { DatabaseModule } from '@modules/database.module';

@Module({
    imports: [DatabaseModule],
    controllers: [UserController],
    providers: [{ provide: AbstractUserRepository, useClass: UserRepository }],
})
export class UserModule { }