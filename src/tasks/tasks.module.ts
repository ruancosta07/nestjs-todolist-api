import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
// import { PrismaService } from 'src/prisma/prisma.service';
// import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [ConfigModule.forRoot({isGlobal:true})],
  providers: [TasksService, PrismaService,],
  controllers: [TasksController],
  exports: [TasksService]
  // imports: [PrismaService]
})
export class TasksModule {}
