import { Module } from '@nestjs/common';
import configuration from '@config/configuration';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@modules/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
