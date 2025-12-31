import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './services/chat.service';
import { Message } from '@app/database';
import { CreateConversationResponseDto, GetConversationResponseDto, HandleMessageInputDto, HandleMessageResponseDto } from './dto/chat.dto';

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post('message')
    async handleMessage(@Body() body: HandleMessageInputDto): Promise<HandleMessageResponseDto> {
        return this.chatService.processMessage(body);
    }

    @Post('create-conversation')
    async createConversation(): Promise<CreateConversationResponseDto> {
        return await this.chatService.createConversation();
    }

    @Get('/conversations/:id')
    async getConversation(@Param('id') id: string): Promise<GetConversationResponseDto> {
        return this.chatService.getConversationById(id);
    }
}
