import { InjectRepository } from '@mikro-orm/nestjs';
import { BaseEntityRepository } from './base.repository';
import { Conversation } from '../entities';

export class ConversationRepository extends BaseEntityRepository<Conversation> {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepo: BaseEntityRepository<Conversation>,
  ) {
    super(
      conversationRepo.getEntityManager(),
      conversationRepo.getEntityName(),
    );
  }
}
