import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class OpenAiService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async ask(prompt: string): Promise<string> {
    const response = await this.openai.responses.create({
      model: 'gpt-3.5-turbo',
      input: prompt,
    });

    return response.output_text;
  }
}
