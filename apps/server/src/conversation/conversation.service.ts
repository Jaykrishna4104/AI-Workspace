import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}

  async createMessage(
    userId: number,
    role: string,
    content: string,
  ) {
    return this.prisma.conversation.create({
      data: {
        userId,
        role,
        content,
      },
    });
  }

  async getConversation(userId: number) {
    return this.prisma.conversation.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}