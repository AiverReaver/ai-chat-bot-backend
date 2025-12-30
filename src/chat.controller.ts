import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './services/chat.service';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post('message')
    async handleMessage(@Body() body: { message: string }): Promise<string> {
        return this.chatService.processMessage(body.message);
    }
}
