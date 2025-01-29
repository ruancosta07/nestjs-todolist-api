import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true})],
  providers: [UsersService, PrismaService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
