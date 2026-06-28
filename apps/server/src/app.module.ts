import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AiModule } from './ai/ai.module';
import { ConversationModule } from './conversation/conversation.module';

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, AiModule, ConversationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
