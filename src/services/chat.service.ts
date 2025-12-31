import { Injectable } from "@nestjs/common";
import { OpenAiService } from "./openai.service";
import { Conversation, ConversationRepository, Message, MessageRepository } from "@app/database";
import { } from '@mikro-orm/core';

@Injectable()
export class ChatService {

    constructor(private readonly openaiService: OpenAiService,
        private readonly messageRepo: MessageRepository,
        private readonly conversationRepo: ConversationRepository) {
    }

    async processMessage(input: { message: string, conversationId: string }): Promise<{ id: string, reply: string, conversationId: string }> {
        const { message, conversationId } = input;

        let conversation: Conversation;
        if(!conversationId) {
            conversation = await this.conversationRepo.create({});
            this.conversationRepo.persist(conversation);
            await this.conversationRepo.flush();
        } else {
            conversation = await this.conversationRepo.findOne({ id: conversationId } );
        }
        const messages = await this.messageRepo.findAll({ where: { conversation: { id: conversation.id } }, limit: 100, orderBy: { createdAt: 'ASC' } });

        const conversationContext = messages.map(msg => ({ role: msg.sender, content: msg.text }));

        const msg = await this.messageRepo.create({
            conversation: conversation,
            sender: 'user',
            text: message
        });

        conversationContext.push({ role: 'user', content: message });
        const response = await this.openaiService.ask(conversationContext);
        const botMsg = await this.messageRepo.create({
            conversation: conversation,
            sender: 'assistant',
            text: response
        });

        this.conversationRepo.persist(conversation);
        this.messageRepo.persist([msg, botMsg]);
        await this.messageRepo.flush();

        return {
            id: botMsg.id,
            reply: response,
            conversationId: conversation.id
        }

    }

    async createConversation(): Promise<{ id: string }> {
        const conversation = await this.conversationRepo.create({});
        this.conversationRepo.persist(conversation);
        await this.conversationRepo.flush();
        return conversation;
    }

    async getConversationById(id: string): Promise<{ messages: Message[] }> {
        const messages = await this.messageRepo.findAll({ where: { conversation: { id } } });
        return { messages };
    }
}