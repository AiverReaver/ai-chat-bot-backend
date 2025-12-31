import { Message } from "@app/database";

export class HandleMessageInputDto {
    message: string;
    conversationId: string;
}

export class HandleMessageResponseDto {
    id: string;
    reply: string;
    conversationId: string;
}

export class CreateConversationResponseDto {
    id: string;
}

export class GetConversationResponseDto {
    messages: Message[];
}

