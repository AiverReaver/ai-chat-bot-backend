import { ConversationRepository } from './conversation.repository';
import { MessageRepository } from './message.repository';

export * from './conversation.repository';
export * from './message.repository';

export const repositories = [ConversationRepository, MessageRepository];
