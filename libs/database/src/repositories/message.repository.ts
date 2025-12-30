import { InjectRepository } from '@mikro-orm/nestjs';
import { BaseEntityRepository } from './base.repository';
import { Message } from '../entities';

export class MessageRepository extends BaseEntityRepository<Message> {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepo: BaseEntityRepository<Message>,
  ) {
    super(messageRepo.getEntityManager(), messageRepo.getEntityName());
  }
}
