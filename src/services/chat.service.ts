import { Injectable } from "@nestjs/common";
import OpenAI from "openai";

@Injectable()
export class ChatService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async processMessage(message: string): Promise<string> {
        const response = await this.openai.responses.create({
            model: "gpt-3.5-turbo",
            input: "hello from nestjs"
        })

        return response.output_text;
    }
}