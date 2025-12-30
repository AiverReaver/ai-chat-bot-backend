import { Conversation } from './conversation.entity';
import { Message } from './message.entity';

export * from './conversation.entity';
export * from './message.entity';

export const entities = [Conversation, Message];
