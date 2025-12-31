import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { chatContext } from 'src/constant';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async ask(prompt: { role: string, content: string }[]): Promise<string> {
    const response = await this.openai.responses.create({
      model: process.env.AI_MODEL || 'gpt-4-turbo',
      input: [
        chatContext,
        ...prompt
      ],
    });

    return response.output_text;
  }
}
