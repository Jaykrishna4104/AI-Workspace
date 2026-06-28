import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConversationService } from '../conversation/conversation.service';

@Injectable()
export class AiService {
  constructor(
    private readonly conversationService: ConversationService,
  ) {}

  async chat(userId: number, message: string) {
    // Save user's message
    await this.conversationService.createMessage(
      userId,
      'user',
      message,
    );

    // Load previous conversation
    const history =
      await this.conversationService.getConversation(userId);

    const messages = history.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4.1-mini',
        messages,
        max_tokens: 200,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const aiReply =
      response.data.choices[0].message.content;

    // Save AI response
    await this.conversationService.createMessage(
      userId,
      'assistant',
      aiReply,
    );

    return {
      success: true,
      reply: aiReply,
    };
  }
}