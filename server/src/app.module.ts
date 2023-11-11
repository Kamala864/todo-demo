import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaClient } from '@prisma/client';
import { PrismaModule } from './prisma/prisma.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [PrismaModule,TodoModule
  ],
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
