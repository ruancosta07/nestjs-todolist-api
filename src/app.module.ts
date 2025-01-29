import { Module } from '@nestjs/common';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { TasksService } from './tasks/tasks.service';
import { PrismaService } from './prisma/prisma.service';
// import { PrismaService } from './services/prisma.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TasksModule, UsersModule, AuthModule],
  controllers: [TasksController,],
  providers: [TasksService, PrismaService],
  // exports: [PrismaService]
})
export class AppModule {}
