import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core';
import { SCHEMA_NAME } from '../datastore/constant';
import { v4 } from 'uuid';
import { Message } from './message.entity';

@Entity({ schema: SCHEMA_NAME, tableName: 'conversations' })
export class Conversation {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string = v4();

  @Property({
    type: 'datetime',
    onCreate: () => new Date(),
    defaultRaw: 'now()',
  })
  createdAt?: Date = new Date();

  @OneToMany(() => Message, (message) => message.conversation)
  messages = new Collection<Message>(this);
}
