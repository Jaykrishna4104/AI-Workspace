import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AiService {
  async chat(message: string) {
    try {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-4.1-mini',

          messages: [
            {
              role: 'user',
              content: message,
            },
          ],

          max_tokens: 200,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return response.data;
    } catch (error: any) {
      console.log('\n========== OPENROUTER ERROR ==========');

      if (error.response) {
        console.log('Status:', error.response.status);
        console.log('Data:', error.response.data);
      } else {
        console.log('Message:', error.message);
      }

      throw error;
    }
  }
}