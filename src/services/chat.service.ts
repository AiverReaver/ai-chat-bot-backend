import { Injectable } from "@nestjs/common";

@Injectable()
export class ChatService {
    constructor() {}

    async processMessage(message: string): Promise<string> {
        return `Echo: ${message}`;
    }
}