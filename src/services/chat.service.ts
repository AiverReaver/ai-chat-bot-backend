import { Injectable } from "@nestjs/common";
import { OpenAiService } from "./openai.service";
import { Conversation, ConversationRepository, Message, MessageRepository } from "@app/database";
import { CreateConversationResponseDto, GetConversationResponseDto, HandleMessageInputDto, HandleMessageResponseDto } from "src/dto/chat.dto";

@Injectable()
export class ChatService {

    constructor(private readonly openaiService: OpenAiService,
        private readonly messageRepo: MessageRepository,
        private readonly conversationRepo: ConversationRepository) {
    }

    async processMessage(input: HandleMessageInputDto): Promise<HandleMessageResponseDto> {
        const { message, conversationId } = input;

        let conversation: Conversation;
        if(!conversationId) {
            conversation = await this.conversationRepo.create({});
            this.conversationRepo.persist(conversation);
            await this.conversationRepo.flush();
        } else {
            conversation = await this.conversationRepo.findOne({ id: conversationId } );
        }
        const messages = await this.messageRepo.findAll({ where: { conversation: { id: conversation.id } }, limit: 20, orderBy: { createdAt: 'ASC' } });

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

    async createConversation(): Promise<CreateConversationResponseDto> {
        const conversation = await this.conversationRepo.create({});
        this.conversationRepo.persist(conversation);
        await this.conversationRepo.flush();
        return conversation;
    }

    async getConversationById(id: string): Promise<GetConversationResponseDto> {
        const messages = await this.messageRepo.findAll({ where: { conversation: { id } } });
        return { messages };
    }
}