import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      imports: [],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: +configService.get<number>("JWT_EXPIRATION_TIME"),
          algorithm: "HS512"
        },
      }
      ),
      inject: [ConfigService]
    }), UsersModule,],
  providers: [AuthService, PrismaService],
  controllers: [AuthController,]
})
export class AuthModule { }
