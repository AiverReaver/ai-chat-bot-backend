import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { Message } from '@app/database';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post('message')
    async handleMessage(@Body() body: { message: string, conversationId: string }): Promise<{ id: string, reply: string; conversationId: string }> {
        return this.chatService.processMessage(body);
    }

    @Post('create-conversation')
    async createConversation(): Promise<{ conversationId: string }> {
        const conversation = await this.chatService.createConversation();
        return { conversationId: conversation.id };
    }

    @Get('/conversations/:id')
    async getConversation(@Param('id') id: string): Promise<{ messages: Message[] }> {
        return this.chatService.getConversationById(id);
    }
}
