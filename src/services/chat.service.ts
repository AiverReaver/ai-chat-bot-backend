import { Injectable } from "@nestjs/common";
import { OpenAiService } from "./openai.service";
import { ConversationRepository, MessageRepository } from "@app/database";

@Injectable()
export class ChatService {

    constructor(private readonly openaiService: OpenAiService, 
        private readonly messageRepo: MessageRepository, 
        private readonly conversationRepo: ConversationRepository) {
    }

    async processMessage(message: string): Promise<{reply: string, conversationId: string}> {
        const conversation =  await this.conversationRepo.create({})

        const msg = await this.messageRepo.create({
            conversation: conversation,
            sender: 'user',
            text: message
        });
        const response = await this.openaiService.ask(message);
        const botMsg = await this.messageRepo.create({
            conversation: conversation,
            sender: 'bot',
            text: response
        });

        this.conversationRepo.persist(conversation);
        this.messageRepo.persist([msg, botMsg]);
        await this.messageRepo.flush();

        return {
            reply: response,
            conversationId: conversation.id
        }
    }
}