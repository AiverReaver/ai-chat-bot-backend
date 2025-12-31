import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { SCHEMA_NAME } from '../datastore/constant';
import { v4 } from 'uuid';
import { Conversation } from './conversation.entity';

@Entity({ schema: SCHEMA_NAME, tableName: 'messages' })
export class Message {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id: string = v4();

  @ManyToOne(() => Conversation, { fieldName: 'conversation_id' })
  conversation!: Conversation;

  @Property({ type: 'text', name: 'sender' })
  sender!: 'user' | 'assistant';

  @Property({ type: 'text', name: 'text' })
  text!: string;

  @Property({
    type: 'datetime',
    onCreate: () => new Date(),
    defaultRaw: 'now()',
  })
  createdAt?: Date = new Date();
}
